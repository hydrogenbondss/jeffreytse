// Garden of Returning — an endless walk through a world after people.
// Chunk-streamed procedural city reclaimed by vegetation. Three.js, no build step.
import * as THREE from "../assets/vendor/three.module.min.js";

/* ---------------------------------- tuning ---------------------------------- */
const CHUNK = 48;            // metres per chunk
const RADIUS = 5;            // chunks kept loaded around the player
const EYE = 1.7;
const WALK_SPEED = 3.1;      // m/s
const FOG_DENSITY = 0.0088;
const SKY_HORIZON = 0xb9bfb1;
const SKY_ZENITH = 0x8a958a;
const SUN_COLOR = 0xd8ceb4;
const ROAD_EVERY = 3;        // every Nth chunk row/col is a road corridor
const RAIL_BAND = 13;        // east-west rail corridor every N chunk-rows

/* --------------------------------- utilities -------------------------------- */
function hash2i(x, z, seed = 0) {
  let h = (x | 0) * 374761393 + (z | 0) * 668265263 + seed * 2246822519;
  h = (h ^ (h >>> 13)) >>> 0;
  h = Math.imul(h, 1274126177) >>> 0;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* --------------------------- procedural fallback art ------------------------- */
// Every texture loads from ./tex/<name>.jpg first; if missing, a procedural
// canvas stands in so the world always renders.
function canvasTex(size, painter) {
  const c = document.createElement("canvas");
  c.width = c.height = size;
  painter(c.getContext("2d"), size);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
function noisePatch(g, s, base, jitter, n) {
  for (let i = 0; i < n; i++) {
    const v = (Math.random() - 0.5) * jitter;
    g.fillStyle = `rgb(${base[0] + v | 0},${base[1] + v | 0},${base[2] + v | 0})`;
    g.fillRect(Math.random() * s, Math.random() * s, 2 + Math.random() * 5, 2 + Math.random() * 5);
  }
}
const FALLBACK = {
  ground: () => canvasTex(512, (g, s) => {
    g.fillStyle = "#5c5844"; g.fillRect(0, 0, s, s);
    noisePatch(g, s, [92, 94, 64], 38, 5200);
    noisePatch(g, s, [96, 104, 60], 30, 1600);
  }),
  asphalt: () => canvasTex(512, (g, s) => {
    g.fillStyle = "#3a3a38"; g.fillRect(0, 0, s, s);
    noisePatch(g, s, [58, 58, 55], 22, 4000);
    g.strokeStyle = "rgba(20,22,18,0.7)"; g.lineWidth = 2;
    for (let i = 0; i < 14; i++) {
      g.beginPath();
      let x = Math.random() * s, y = Math.random() * s;
      g.moveTo(x, y);
      for (let k = 0; k < 5; k++) { x += (Math.random() - 0.5) * 90; y += (Math.random() - 0.5) * 90; g.lineTo(x, y); }
      g.stroke();
    }
    noisePatch(g, s, [82, 96, 48], 26, 700); // weeds in cracks
  }),
  facade: () => canvasTex(512, (g, s) => {
    g.fillStyle = "#6a675e"; g.fillRect(0, 0, s, s);
    noisePatch(g, s, [104, 100, 90], 26, 2500);
    const cols = 4, rows = 4;
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
      const x = (i + 0.22) * s / cols, y = (j + 0.18) * s / rows;
      g.fillStyle = Math.random() < 0.4 ? "#151a17" : "#242c26";
      g.fillRect(x, y, s / cols * 0.56, s / rows * 0.62);
      if (Math.random() < 0.5) { g.fillStyle = "rgba(90,110,66,0.5)"; g.fillRect(x, y + s / rows * 0.4, s / cols * 0.56, s / rows * 0.22); }
    }
  }),
  concrete: () => canvasTex(512, (g, s) => {
    g.fillStyle = "#75726a"; g.fillRect(0, 0, s, s);
    noisePatch(g, s, [117, 114, 106], 24, 3600);
    noisePatch(g, s, [90, 96, 70], 18, 700);
  }),
  foliage: () => canvasTex(256, (g, s) => {
    g.clearRect(0, 0, s, s);
    for (let i = 0; i < 900; i++) {
      const x = s / 2 + (Math.random() - 0.5) * s * 0.9;
      const y = s / 2 + (Math.random() - 0.5) * s * 0.9;
      const d = Math.hypot(x - s / 2, y - s / 2) / (s / 2);
      if (Math.random() > 1 - d * 0.9) continue;
      const gr = 70 + Math.random() * 70;
      g.fillStyle = `rgba(${gr * 0.45 | 0},${gr | 0},${gr * 0.4 | 0},0.95)`;
      g.beginPath(); g.arc(x, y, 3 + Math.random() * 7, 0, 7); g.fill();
    }
  }),
  grassBlade: () => canvasTex(128, (g, s) => {
    g.clearRect(0, 0, s, s);
    for (let i = 0; i < 26; i++) {
      const x = Math.random() * s;
      const h = s * (0.45 + Math.random() * 0.5);
      const gr = 78 + Math.random() * 60;
      g.strokeStyle = `rgba(${gr * 0.5 | 0},${gr | 0},${gr * 0.36 | 0},0.95)`;
      g.lineWidth = 2 + Math.random() * 2;
      g.beginPath(); g.moveTo(x, s);
      g.quadraticCurveTo(x + (Math.random() - 0.5) * 22, s - h * 0.6, x + (Math.random() - 0.5) * 34, s - h);
      g.stroke();
    }
  }),
  ivy: () => canvasTex(256, (g, s) => {
    g.clearRect(0, 0, s, s);
    for (let i = 0; i < 1400; i++) {
      const x = Math.random() * s, y = Math.random() * s;
      if (Math.random() < y / s * 0.55) continue; // denser at top
      const gr = 60 + Math.random() * 62;
      g.fillStyle = `rgba(${gr * 0.42 | 0},${gr | 0},${gr * 0.38 | 0},0.9)`;
      g.beginPath(); g.arc(x, y, 2 + Math.random() * 4, 0, 7); g.fill();
    }
  }),
  bark: () => canvasTex(256, (g, s) => {
    g.fillStyle = "#4c4238"; g.fillRect(0, 0, s, s);
    for (let i = 0; i < 60; i++) {
      g.strokeStyle = `rgba(${30 + Math.random() * 30 | 0},${26 + Math.random() * 24 | 0},${20 + Math.random() * 18 | 0},0.7)`;
      g.lineWidth = 1 + Math.random() * 3;
      const x = Math.random() * s;
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x + (Math.random() - 0.5) * 30, s); g.stroke();
    }
  }),
  train: () => canvasTex(512, (g, s) => {
    g.fillStyle = "#5a6168"; g.fillRect(0, 0, s, s);
    noisePatch(g, s, [96, 90, 78], 30, 1800);
    g.fillStyle = "#1c2124";
    for (let i = 0; i < 5; i++) g.fillRect(20 + i * 100, 90, 74, 110);
    g.fillStyle = "rgba(140,80,40,0.35)";
    for (let i = 0; i < 260; i++) g.fillRect(Math.random() * s, Math.random() * s, 3 + Math.random() * 20, 2 + Math.random() * 5);
  }),
  glass: () => canvasTex(512, (g, s) => {
    g.fillStyle = "#12181c"; g.fillRect(0, 0, s, s);
    noisePatch(g, s, [30, 40, 44], 22, 1200);
    g.strokeStyle = "#2a3438"; g.lineWidth = 4;
    for (let i = 0; i <= 4; i++) { g.beginPath(); g.moveTo(i * s / 4, 0); g.lineTo(i * s / 4, s); g.stroke(); }
    g.strokeStyle = "rgba(200,220,225,0.28)";
    for (let i = 0; i < 12; i++) {
      g.lineWidth = 1;
      const x = Math.random() * s, y = Math.random() * s;
      for (let k = 0; k < 6; k++) {
        g.beginPath(); g.moveTo(x, y);
        g.lineTo(x + (Math.random() - 0.5) * 130, y + (Math.random() - 0.5) * 130); g.stroke();
      }
    }
  }),
};

const texLoader = new THREE.TextureLoader();
function loadTex(name, { repeat = [1, 1], fallback } = {}) {
  const apply = (t) => {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(repeat[0], repeat[1]);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 16;
    return t;
  };
  const fb = apply(fallback());
  const tex = texLoader.load(`./tex/${name}.jpg`, (t) => { apply(t); mat.map = t; mat.needsUpdate = true; }, undefined, () => {});
  // We return the fallback immediately; real file swaps in on load via closure below.
  let mat = null;
  return { texture: fb, bind: (m) => { mat = m; } };
}
// Simpler binding: material factory that self-upgrades when the AI texture exists.
function smartMaterial(name, opts = {}, matOpts = {}) {
  const fb = opts.fallback();
  fb.wrapS = fb.wrapT = THREE.RepeatWrapping;
  fb.repeat.set(...(opts.repeat || [1, 1]));
  fb.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.MeshStandardMaterial({ map: fb, roughness: 0.95, metalness: 0.0, ...matOpts });
  texLoader.load(`./tex/${name}.jpg`, (t) => {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(...(opts.repeat || [1, 1]));
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 16;
    mat.map = t; mat.needsUpdate = true;
  }, undefined, () => {});
  return mat;
}

/* --------------------------------- materials --------------------------------- */
const M = {
  ground: smartMaterial("ground", { fallback: FALLBACK.ground, repeat: [4, 4] }),
  asphalt: smartMaterial("asphalt", { fallback: FALLBACK.asphalt, repeat: [1.4, 5] }),
  facadeA: smartMaterial("facade-a", { fallback: FALLBACK.facade }),
  facadeB: smartMaterial("facade-b", { fallback: FALLBACK.facade }),
  facadeMall: smartMaterial("facade-mall", { fallback: FALLBACK.facade }),
  facadeSchool: smartMaterial("facade-school", { fallback: FALLBACK.facade }),
  concrete: smartMaterial("concrete", { fallback: FALLBACK.concrete, repeat: [2, 2] }),
  train: smartMaterial("train", { fallback: FALLBACK.train }),
  glass: smartMaterial("glass", { fallback: FALLBACK.glass, repeat: [3, 1] }, { roughness: 0.35, metalness: 0.4 }),
  bark: smartMaterial("bark", { fallback: FALLBACK.bark, repeat: [1, 2] }, { color: 0xb5a893 }),
  rust: new THREE.MeshStandardMaterial({ color: 0x5d5148, roughness: 0.9, metalness: 0.35 }),
  dark: new THREE.MeshStandardMaterial({ color: 0x14171a, roughness: 0.9 }),
};
function alphaMaterial(name, fallback, opts = {}) {
  const fb = fallback();
  fb.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.MeshBasicMaterial({
    map: fb, transparent: false, alphaTest: 0.45, side: THREE.DoubleSide,
    color: 0xb8bdb0, ...opts,
  });
  texLoader.load(`./tex/${name}.png`, (t) => {
    t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 16;
    mat.map = t; mat.needsUpdate = true;
  }, undefined, () => {});
  return mat;
}
M.foliage = alphaMaterial("foliage", FALLBACK.foliage);
M.foliage.color.set(0x8f9a86);
M.grass = alphaMaterial("grass", FALLBACK.grassBlade);
M.ivy = alphaMaterial("ivy", FALLBACK.ivy);

/* ---------------------------------- renderer --------------------------------- */
const canvas = document.getElementById("scene");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.22;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(SKY_HORIZON, FOG_DENSITY);

const camera = new THREE.PerspectiveCamera(66, innerWidth / innerHeight, 0.1, 900);
camera.position.set(CHUNK / 2, EYE, CHUNK / 2);

/* ------------------------------------ sky ------------------------------------ */
function makeSky() {
  const c = document.createElement("canvas");
  c.width = 1024; c.height = 512;
  const g = c.getContext("2d");
  const grad = g.createLinearGradient(0, 0, 0, 512);
  const zen = new THREE.Color(SKY_ZENITH), hor = new THREE.Color(SKY_HORIZON);
  grad.addColorStop(0, `#${zen.getHexString()}`);
  grad.addColorStop(0.62, `#${hor.getHexString()}`);
  grad.addColorStop(1, "#a8a794");
  g.fillStyle = grad; g.fillRect(0, 0, 1024, 512);
  for (let i = 0; i < 260; i++) { // soft overcast streaks
    const y = Math.random() * 300;
    g.fillStyle = `rgba(${190 + Math.random() * 20 | 0},${195 + Math.random() * 18 | 0},${180 + Math.random() * 16 | 0},${0.02 + Math.random() * 0.05})`;
    g.beginPath();
    g.ellipse(Math.random() * 1024, y, 90 + Math.random() * 240, 8 + Math.random() * 26, 0, 0, 7);
    g.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.MeshBasicMaterial({ map: t, side: THREE.BackSide, fog: false, depthWrite: false });
  texLoader.load("./tex/sky.jpg", (real) => {
    real.colorSpace = THREE.SRGBColorSpace;
    mat.map = real; mat.needsUpdate = true;
  }, undefined, () => {});
  const sky = new THREE.Mesh(new THREE.SphereGeometry(760, 32, 20), mat);
  sky.rotation.y = 1.1;
  scene.add(sky);
  return sky;
}
const sky = makeSky();

/* ---------------------------------- lighting ---------------------------------- */
const hemi = new THREE.HemisphereLight(0xa8b5a2, 0x4c4d3a, 1.25);
scene.add(hemi);
const sun = new THREE.DirectionalLight(SUN_COLOR, 1.45);
sun.position.set(-46, 58, 22);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
sun.shadow.camera.near = 1; sun.shadow.camera.far = 240;
const S = 88;
sun.shadow.camera.left = -S; sun.shadow.camera.right = S;
sun.shadow.camera.top = S; sun.shadow.camera.bottom = -S;
sun.shadow.bias = -0.0006;
scene.add(sun); scene.add(sun.target);

/* ------------------------------ geometry helpers ------------------------------ */
function mergeGeoms(geoms) {
  let vc = 0, ic = 0;
  for (const g of geoms) { vc += g.attributes.position.count; ic += g.index.count; }
  const pos = new Float32Array(vc * 3), nor = new Float32Array(vc * 3), uv = new Float32Array(vc * 2);
  const idx = new Uint32Array(ic);
  let vo = 0, io = 0;
  for (const g of geoms) {
    pos.set(g.attributes.position.array, vo * 3);
    nor.set(g.attributes.normal.array, vo * 3);
    uv.set(g.attributes.uv.array, vo * 2);
    const gi = g.index.array;
    for (let i = 0; i < gi.length; i++) idx[io + i] = gi[i] + vo;
    vo += g.attributes.position.count; io += gi.length;
  }
  const out = new THREE.BufferGeometry();
  out.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  out.setAttribute("normal", new THREE.BufferAttribute(nor, 3));
  out.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
  out.setIndex(new THREE.BufferAttribute(idx, 1));
  return out;
}
const _m4 = new THREE.Matrix4(), _q = new THREE.Quaternion(), _s = new THREE.Vector3(), _p = new THREE.Vector3();
function boxGeom(w, h, d, x, y, z, ry = 0, uvScale = null) {
  const g = new THREE.BoxGeometry(w, h, d);
  if (uvScale) {
    const uvA = g.attributes.uv;
    // BoxGeometry face order: +x,-x,+y,-y,+z,-z (4 verts each)
    for (let f = 0; f < 6; f++) {
      let su = 1, sv = 1;
      if (f === 0 || f === 1) { su = d / uvScale[0]; sv = h / uvScale[1]; }
      else if (f === 4 || f === 5) { su = w / uvScale[0]; sv = h / uvScale[1]; }
      else { su = w / uvScale[0]; sv = d / uvScale[0]; }
      for (let v = 0; v < 4; v++) {
        const i = f * 4 + v;
        uvA.setXY(i, uvA.getX(i) * su, uvA.getY(i) * sv);
      }
    }
  }
  _p.set(x, y, z); _q.setFromEuler(new THREE.Euler(0, ry, 0)); _s.set(1, 1, 1);
  _m4.compose(_p, _q, _s);
  g.applyMatrix4(_m4);
  return g;
}
function planeGeom(w, h, x, y, z, rx, ry, uvRep = [1, 1]) {
  const g = new THREE.PlaneGeometry(w, h);
  const uvA = g.attributes.uv;
  for (let i = 0; i < uvA.count; i++) uvA.setXY(i, uvA.getX(i) * uvRep[0], uvA.getY(i) * uvRep[1]);
  _p.set(x, y, z); _q.setFromEuler(new THREE.Euler(rx, ry, 0)); _s.set(1, 1, 1);
  _m4.compose(_p, _q, _s);
  g.applyMatrix4(_m4);
  return g;
}

/* ------------------------------- chunk building ------------------------------- */
const chunks = new Map(); // key -> {group, colliders:[{x,z,hw,hd}]}
const chunkKey = (cx, cz) => `${cx},${cz}`;

const isRoadX = (cx) => ((cx % ROAD_EVERY) + ROAD_EVERY) % ROAD_EVERY === 0;
const isRoadZ = (cz) => ((cz % ROAD_EVERY) + ROAD_EVERY) % ROAD_EVERY === 0;
const isRail = (cz) => ((cz % RAIL_BAND) + RAIL_BAND) % RAIL_BAND === 6;

function landmarkFor(cx, cz) {
  // one landmark decision per block (block = ROAD_EVERY x ROAD_EVERY chunk cell)
  const bx = Math.floor(cx / ROAD_EVERY), bz = Math.floor(cz / ROAD_EVERY);
  const r = hash2i(bx, bz, 77);
  if (r < 0.10) return "mall";
  if (r < 0.22) return "school";
  if (r < 0.34) return "park";
  return "ruins";
}

function buildChunk(cx, cz) {
  const group = new THREE.Group();
  const ox = cx * CHUNK, oz = cz * CHUNK;
  group.position.set(ox, 0, oz);
  const rng = mulberry32((hash2i(cx, cz, 9) * 1e9) | 0);
  const colliders = [];
  const facades = [], roofs = [], concretes = [], glasses = [], trains = [], rusts = [], darks = [], ivies = [];

  // ---- ground
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(CHUNK, CHUNK), M.ground);
  ground.rotation.x = -Math.PI / 2;
  ground.position.set(CHUNK / 2, 0, CHUNK / 2);
  ground.receiveShadow = true;
  group.add(ground);

  const roadX = isRoadX(cx), roadZ = isRoadZ(cz), rail = isRail(cz);

  // ---- roads (slightly raised strips)
  if (roadZ && !rail) {
    const r = new THREE.Mesh(new THREE.PlaneGeometry(CHUNK, 13), M.asphalt);
    r.rotation.x = -Math.PI / 2; r.rotation.z = Math.PI / 2;
    r.position.set(CHUNK / 2, 0.02, CHUNK / 2);
    r.receiveShadow = true; group.add(r);
  }
  if (roadX) {
    const r = new THREE.Mesh(new THREE.PlaneGeometry(CHUNK, 13), M.asphalt);
    r.rotation.x = -Math.PI / 2;
    r.position.set(CHUNK / 2, 0.021, CHUNK / 2);
    r.receiveShadow = true; group.add(r);
  }

  // ---- rail corridor
  if (rail) {
    concretes.push(boxGeom(CHUNK, 0.5, 9, CHUNK / 2, 0.25, CHUNK / 2, 0, [2, 2]));
    // rails
    for (const dz of [-1.5, 1.5]) {
      rusts.push(boxGeom(CHUNK, 0.18, 0.16, CHUNK / 2, 0.6, CHUNK / 2 + dz));
    }
    // sleepers
    for (let x = 2; x < CHUNK; x += 2.4) {
      darks.push(boxGeom(1.2, 0.12, 4.4, x, 0.53, CHUNK / 2));
    }
    // catenary poles
    for (let x = 6; x < CHUNK; x += 22) {
      rusts.push(boxGeom(0.28, 7.5, 0.28, x, 3.75, CHUNK / 2 - 5.4));
      rusts.push(boxGeom(0.2, 0.2, 5.4, x, 7.2, CHUNK / 2 - 2.7));
    }
    // a station every few rail chunks
    if (hash2i(cx, cz, 31) < 0.3) {
      buildStation(rng, colliders, { facades, roofs, concretes, glasses, trains, rusts, darks, ivies });
    }
  }

  const landmark = landmarkFor(cx, cz);
  const isBlockInterior = !roadX && !roadZ && !rail;

  if (isBlockInterior) {
    if (landmark === "mall" && hash2i(cx, cz, 51) < 0.5) {
      buildMall(rng, colliders, { facades, roofs, concretes, glasses, rusts, darks, ivies });
    } else if (landmark === "school" && hash2i(cx, cz, 52) < 0.5) {
      buildSchool(rng, colliders, { facades, roofs, concretes, glasses, rusts, darks, ivies });
    } else if (landmark === "park") {
      buildPark(rng, group, colliders, { concretes, rusts, darks });
    } else {
      buildRuins(rng, colliders, { facades, roofs, concretes, rusts, darks, ivies });
    }
  } else if (!rail && (roadX || roadZ)) {
    // roadside details: leaning streetlights, bus stop husks
    if (rng() < 0.6) {
      const x = 6 + rng() * (CHUNK - 12), z = roadX ? CHUNK / 2 + 8 : 6 + rng() * (CHUNK - 12);
      const lean = (rng() - 0.5) * 0.5;
      const pole = boxGeom(0.22, 6.5, 0.22, x, 3.2, z, 0);
      pole.applyMatrix4(new THREE.Matrix4().makeRotationZ(lean));
      rusts.push(pole);
    }
    if (rng() < 0.25) {
      const x = 8 + rng() * (CHUNK - 16);
      concretes.push(boxGeom(4.4, 0.24, 1.8, x, 2.5, CHUNK / 2 + 8.4, 0, [2, 2]));
      rusts.push(boxGeom(0.16, 2.5, 0.16, x - 2, 1.25, CHUNK / 2 + 8.2));
      rusts.push(boxGeom(0.16, 2.5, 0.16, x + 2, 1.25, CHUNK / 2 + 8.2));
    }
  }

  // ---- merge static geometry per material
  const merged = [
    [facades, rng() < 0.5 ? M.facadeA : M.facadeB, true],
    [roofs, M.concrete, true],
    [concretes, M.concrete, true],
    [glasses, M.glass, false],
    [trains, M.train, true],
    [rusts, M.rust, true],
    [darks, M.dark, false],
    [ivies, M.ivy, false],
  ];
  for (const [list, mat, shadow] of merged) {
    if (!list.length) continue;
    const mesh = new THREE.Mesh(mergeGeoms(list), mat);
    mesh.castShadow = shadow; mesh.receiveShadow = true;
    group.add(mesh);
    list.length = 0;
  }

  // ---- vegetation (instanced)
  addVegetation(rng, group, cx, cz, { roadX, roadZ, rail, landmark });

  scene.add(group);
  chunks.set(chunkKey(cx, cz), { group, colliders });
}

function buildRuins(rng, colliders, B) {
  // 2–4 ruined mid-rise buildings around the block edges, overgrown court inside
  const n = 2 + (rng() * 3 | 0);
  const spots = [
    [12, 12], [CHUNK - 12, 12], [12, CHUNK - 12], [CHUNK - 12, CHUNK - 12], [CHUNK / 2, 10],
  ];
  for (let i = 0; i < n; i++) {
    const [bx, bz] = spots[(rng() * spots.length) | 0];
    const w = 10 + rng() * 8, d = 9 + rng() * 7;
    const floors = 2 + (rng() * 6 | 0);
    const h = floors * 3;
    const x = bx + (rng() - 0.5) * 6, z = bz + (rng() - 0.5) * 6;
    // four facade walls (planes, so window UVs repeat per bay/floor)
    B.facades.push(planeGeom(w, h, x, h / 2, z + d / 2, 0, 0, [w / 3.4, floors]));
    B.facades.push(planeGeom(w, h, x, h / 2, z - d / 2, 0, Math.PI, [w / 3.4, floors]));
    B.facades.push(planeGeom(d, h, x + w / 2, h / 2, z, 0, Math.PI / 2, [d / 3.4, floors]));
    B.facades.push(planeGeom(d, h, x - w / 2, h / 2, z, 0, -Math.PI / 2, [d / 3.4, floors]));
    B.roofs.push(boxGeom(w, 0.4, d, x, h + 0.2, z, 0, [4, 4]));
    // ivy climbing the walls
    const ivyN = 1 + (rng() * 3 | 0);
    for (let iv = 0; iv < ivyN; iv++) {
      const face = (rng() * 4) | 0;
      const iw = 2.5 + rng() * (w * 0.5), ih = h * (0.4 + rng() * 0.55);
      const off = (rng() - 0.5) * (w - iw);
      if (face === 0) B.ivies.push(planeGeom(iw, ih, x + off, ih / 2, z + d / 2 + 0.08, 0, 0, [iw / 3, ih / 3]));
      else if (face === 1) B.ivies.push(planeGeom(iw, ih, x + off, ih / 2, z - d / 2 - 0.08, 0, Math.PI, [iw / 3, ih / 3]));
      else if (face === 2) B.ivies.push(planeGeom(iw, ih, x + w / 2 + 0.08, ih / 2, z + off * d / w, 0, Math.PI / 2, [iw / 3, ih / 3]));
      else B.ivies.push(planeGeom(iw, ih, x - w / 2 - 0.08, ih / 2, z + off * d / w, 0, -Math.PI / 2, [iw / 3, ih / 3]));
    }
    // broken parapet
    if (rng() < 0.7) {
      for (let k = 0; k < 4; k++) {
        if (rng() < 0.5) continue;
        B.concretes.push(boxGeom(2 + rng() * 3, 0.8 + rng() * 1.6, 0.5,
          x - w / 2 + rng() * w, h + 0.7, z - d / 2 + rng() * d, rng(), [2, 2]));
      }
    }
    // rubble skirt
    for (let k = 0; k < 6; k++) {
      B.concretes.push(boxGeom(0.8 + rng() * 1.8, 0.4 + rng() * 0.9, 0.8 + rng() * 1.6,
        x - w / 2 - 1 + rng() * (w + 2), 0.3, z - d / 2 - 1 + rng() * (d + 2), rng() * 3, [2, 2]));
    }
    colliders.push({ x, z, hw: w / 2 + 0.4, hd: d / 2 + 0.4 });
  }
}

function buildMall(rng, colliders, B) {
  const x = CHUNK / 2, z = CHUNK / 2, w = 34, d = 22, h = 13;
  B.facades.push(planeGeom(d, h, x + w / 2, h / 2, z, 0, Math.PI / 2, [d / 3.4, h / 3]));
  B.facades.push(planeGeom(d, h, x - w / 2, h / 2, z, 0, -Math.PI / 2, [d / 3.4, h / 3]));
  B.facades.push(planeGeom(w, h, x, h / 2, z - d / 2, 0, Math.PI, [w / 3.4, h / 3]));
  // glass front, shattered
  B.glasses.push(planeGeom(w, h - 2.5, x, (h - 2.5) / 2, z + d / 2, 0, 0, [w / 6, 1]));
  B.concretes.push(boxGeom(w, 2.5, 0.6, x, h - 1.25, z + d / 2, 0, [4, 1]));
  B.roofs.push(boxGeom(w, 0.5, d, x, h + 0.25, z, 0, [6, 4]));
  // dead sign
  B.darks.push(boxGeom(10, 2.6, 0.7, x, h + 2.4, z + d / 2 - 1));
  // entry canopy
  B.concretes.push(boxGeom(12, 0.4, 5, x, 3.4, z + d / 2 + 2.5, 0, [3, 2]));
  B.ivies.push(planeGeom(10, 8, x - 8, 4, z - d / 2 - 0.08, 0, Math.PI, [3, 2.5]));
  B.ivies.push(planeGeom(7, 10, x + w / 2 + 0.08, 5, z - 3, 0, Math.PI / 2, [2, 3]));
  // toppled trolleys as rust lumps
  for (let i = 0; i < 4; i++) {
    B.rusts.push(boxGeom(1, 0.8, 0.6, x - 8 + rng() * 16, 0.4, z + d / 2 + 4 + rng() * 5, rng() * 3));
  }
  colliders.push({ x, z, hw: w / 2 + 0.4, hd: d / 2 + 0.4 });
}

function buildSchool(rng, colliders, B) {
  const x = CHUNK / 2 - 4, z = CHUNK / 2 - 6, w = 30, d = 10, h = 9;
  for (const [px, pz, pw, ry] of [
    [x, z + d / 2, w, 0], [x, z - d / 2, w, Math.PI],
  ]) B.facades.push(planeGeom(pw, h, px, h / 2, pz, 0, ry, [pw / 3.2, 3]));
  B.facades.push(planeGeom(d, h, x + w / 2, h / 2, z, 0, Math.PI / 2, [d / 3.2, 3]));
  B.facades.push(planeGeom(d, h, x - w / 2, h / 2, z, 0, -Math.PI / 2, [d / 3.2, 3]));
  B.roofs.push(boxGeom(w, 0.4, d, x, h + 0.2, z, 0, [6, 2]));
  colliders.push({ x, z, hw: w / 2 + 0.4, hd: d / 2 + 0.4 });
  // yard: rusted goal frames + flag pole
  const yz = z + d / 2 + 12;
  for (const gx of [x - 9, x + 9]) {
    B.rusts.push(boxGeom(0.14, 2.2, 0.14, gx - 2.6, 1.1, yz));
    B.rusts.push(boxGeom(0.14, 2.2, 0.14, gx + 2.6, 1.1, yz));
    B.rusts.push(boxGeom(5.2, 0.14, 0.14, gx, 2.2, yz));
  }
  B.rusts.push(boxGeom(0.12, 9, 0.12, x - w / 2 + 3, 4.5, yz + 2));
  B.ivies.push(planeGeom(9, 7, x + 6, 3.5, z + d / 2 + 0.08, 0, 0, [3, 2.2]));
}

function buildPark(rng, group, colliders, B) {
  // collapsed pavilion + benches; trees handled by vegetation pass
  const x = CHUNK / 2, z = CHUNK / 2;
  for (let i = 0; i < 4; i++) {
    const a = i * Math.PI / 2 + 0.4;
    B.concretes.push(boxGeom(0.5, 3.4, 0.5, x + Math.cos(a) * 4, 1.7, z + Math.sin(a) * 4, 0, [1, 2]));
  }
  const roof = boxGeom(10, 0.35, 10, x, 3.6, z, 0.2, [3, 3]);
  roof.applyMatrix4(new THREE.Matrix4().makeTranslation(-x, -3.6, -z)
    .premultiply(new THREE.Matrix4().makeRotationX(0.16))
    .premultiply(new THREE.Matrix4().makeTranslation(x, 3.3, z)));
  B.concretes.push(roof);
  for (let i = 0; i < 5; i++) {
    B.darks.push(boxGeom(2.4, 0.12, 0.5, 8 + rng() * (CHUNK - 16), 0.55, 8 + rng() * (CHUNK - 16), rng() * 3));
  }
}

function buildStation(rng, colliders, B) {
  // platform along the rail, canopy, husk of a stopped train
  const z = CHUNK / 2;
  B.concretes.push(boxGeom(CHUNK * 0.8, 1.1, 6, CHUNK / 2, 0.55, z - 8, 0, [6, 1]));
  colliders.push({ x: CHUNK / 2, z: z - 8, hw: CHUNK * 0.4, hd: 3 });
  for (let x = 8; x < CHUNK - 6; x += 9) {
    B.rusts.push(boxGeom(0.3, 4.4, 0.3, x, 3.3, z - 8));
  }
  const canopy = boxGeom(CHUNK * 0.72, 0.25, 7.5, CHUNK / 2, 5.45, z - 8, 0, [8, 2]);
  B.concretes.push(canopy);
  // train husk
  if (rng() < 0.75) {
    const tx = CHUNK / 2 + (rng() - 0.5) * 8;
    B.trains.push(boxGeom(26, 3.4, 3, tx, 2.3, z, 0, null));
    B.darks.push(boxGeom(26.2, 0.5, 3.2, tx, 0.45, z));
    colliders.push({ x: tx, z, hw: 13.2, hd: 1.8 });
  }
  // station sign
  B.darks.push(boxGeom(6, 1.2, 0.3, CHUNK / 2, 4.9, z - 11.9));
}

/* ------------------------------- vegetation pass ------------------------------ */
function normalsUp(geom) {
  // grass/foliage cards lit as if facing the sky, so they take ground lighting
  const n = geom.attributes.normal;
  for (let i = 0; i < n.count; i++) n.setXYZ(i, 0, 1, 0);
  return geom;
}
const grassGeom = (() => {
  const g1 = planeGeom(1.1, 1.0, 0, 0.5, 0, 0, 0);
  const g2 = planeGeom(1.1, 1.0, 0, 0.5, 0, 0, Math.PI / 2);
  return normalsUp(mergeGeoms([g1, g2]));
})();
const foliageGeom = (() => {
  const list = [];
  for (let i = 0; i < 3; i++) list.push(planeGeom(4.6, 4.6, 0, 0, 0, 0, i * Math.PI / 3));
  return normalsUp(mergeGeoms(list));
})();
const _dummy = new THREE.Object3D();

function addVegetation(rng, group, cx, cz, ctx) {
  const { roadX, roadZ, rail } = ctx;
  // grass
  const count = rail ? 200 : (roadX || roadZ) ? 330 : 560;
  const grass = new THREE.InstancedMesh(grassGeom, M.grass, count);
  grass.castShadow = false; grass.receiveShadow = false;
  let gi = 0;
  for (let i = 0; i < count; i++) {
    const x = rng() * CHUNK, z = rng() * CHUNK;
    if (rail && Math.abs(z - CHUNK / 2) < 5.5) continue;
    if (roadX && Math.abs(z - CHUNK / 2) < 5 && rng() < 0.8) continue;
    if (roadZ && Math.abs(x - CHUNK / 2) < 5 && rng() < 0.8) continue;
    const s = 1.0 + rng() * 1.9;
    _dummy.position.set(x, 0, z);
    _dummy.rotation.set(0, rng() * Math.PI, 0);
    _dummy.scale.set(s, s * (0.8 + rng() * 0.7), s);
    _dummy.updateMatrix();
    grass.setMatrixAt(gi++, _dummy.matrix);
  }
  grass.count = gi;
  group.add(grass);

  // trees: trunk + foliage cross
  const treeCount = ctx.landmark === "park" && !roadX && !roadZ && !rail ? 10 : 4;
  const trunks = [];
  const fol = new THREE.InstancedMesh(foliageGeom, M.foliage, treeCount * 2);
  let fi = 0;
  for (let i = 0; i < treeCount; i++) {
    const x = 5 + rng() * (CHUNK - 10), z = 5 + rng() * (CHUNK - 10);
    if (rail && Math.abs(z - CHUNK / 2) < 7) continue;
    if ((roadX && Math.abs(z - CHUNK / 2) < 7) || (roadZ && Math.abs(x - CHUNK / 2) < 7)) continue;
    const h = 3.5 + rng() * 4;
    trunks.push(boxGeom(0.5, h, 0.5, x, h / 2, z, rng()));
    for (let k = 0; k < 2; k++) {
      _dummy.position.set(x + (rng() - 0.5) * 1.4, h + k * 1.6 - 0.4, z + (rng() - 0.5) * 1.4);
      _dummy.rotation.set(0, rng() * Math.PI, 0);
      const s = 0.8 + rng() * 0.9;
      _dummy.scale.set(s, s, s);
      _dummy.updateMatrix();
      fol.setMatrixAt(fi++, _dummy.matrix);
    }
  }
  fol.count = fi;
  if (trunks.length) {
    const t = new THREE.Mesh(mergeGeoms(trunks), M.bark);
    t.castShadow = true; group.add(t);
  }
  group.add(fol);

}

/* --------------------------------- streaming --------------------------------- */
function ensureChunks() {
  const pcx = Math.floor(camera.position.x / CHUNK);
  const pcz = Math.floor(camera.position.z / CHUNK);
  for (let dx = -RADIUS; dx <= RADIUS; dx++) {
    for (let dz = -RADIUS; dz <= RADIUS; dz++) {
      const cx = pcx + dx, cz = pcz + dz;
      if (!chunks.has(chunkKey(cx, cz))) buildChunk(cx, cz);
    }
  }
  for (const [key, c] of chunks) {
    const [cx, cz] = key.split(",").map(Number);
    if (Math.abs(cx - pcx) > RADIUS + 1 || Math.abs(cz - pcz) > RADIUS + 1) {
      scene.remove(c.group);
      c.group.traverse((o) => { if (o.geometry && !o.isInstancedMesh) o.geometry.dispose?.(); });
      chunks.delete(key);
    }
  }
}

/* ---------------------------------- controls ---------------------------------- */
let yaw = 0.6, pitch = 0;
const keys = new Set();
let locked = false, autoWalk = false, started = false;

const gate = document.getElementById("gate");
const hud = document.getElementById("hud");
const back = document.getElementById("back");
const walkbtn = document.getElementById("walkbtn");
const coordsEl = document.getElementById("coords");
const isTouch = matchMedia("(pointer: coarse)").matches;
if (isTouch) {
  document.getElementById("gatehint").textContent = "Drag to look · hold WALK to move · the world does not end";
  document.getElementById("hint-left").textContent = "Drag to look";
}

document.getElementById("enter").addEventListener("click", () => {
  started = true;
  gate.classList.add("hidden");
  hud.classList.add("on"); back.classList.add("on");
  if (isTouch) { walkbtn.style.display = "block"; }
  else canvas.requestPointerLock?.();
  ambient.start();
});
document.addEventListener("pointerlockchange", () => { locked = document.pointerLockElement === canvas; });
canvas.addEventListener("click", () => { if (started && !isTouch && !locked) canvas.requestPointerLock?.(); });
document.addEventListener("mousemove", (e) => {
  if (!locked) return;
  yaw -= e.movementX * 0.0021;
  pitch = Math.max(-1.35, Math.min(1.35, pitch - e.movementY * 0.0021));
});
addEventListener("keydown", (e) => keys.add(e.code));
addEventListener("keyup", (e) => keys.delete(e.code));

// touch look
let lastT = null;
canvas.addEventListener("touchstart", (e) => { lastT = e.touches[0]; }, { passive: true });
canvas.addEventListener("touchmove", (e) => {
  const t = e.touches[0];
  if (lastT) {
    yaw -= (t.clientX - lastT.clientX) * 0.004;
    pitch = Math.max(-1.35, Math.min(1.35, pitch - (t.clientY - lastT.clientY) * 0.004));
  }
  lastT = t;
}, { passive: true });
canvas.addEventListener("touchend", () => { lastT = null; }, { passive: true });
walkbtn.addEventListener("touchstart", (e) => { e.preventDefault(); autoWalk = true; walkbtn.classList.add("walking"); });
walkbtn.addEventListener("touchend", () => { autoWalk = false; walkbtn.classList.remove("walking"); });

/* --------------------------------- collisions --------------------------------- */
function collide(nx, nz) {
  const pcx = Math.floor(nx / CHUNK), pcz = Math.floor(nz / CHUNK);
  for (let dx = -1; dx <= 1; dx++) for (let dz = -1; dz <= 1; dz++) {
    const c = chunks.get(chunkKey(pcx + dx, pcz + dz));
    if (!c) continue;
    const ox = (pcx + dx) * CHUNK, oz = (pcz + dz) * CHUNK;
    for (const b of c.colliders) {
      const lx = nx - ox - b.x, lz = nz - oz - b.z;
      if (Math.abs(lx) < b.hw + 0.5 && Math.abs(lz) < b.hd + 0.5) return true;
    }
  }
  return false;
}

/* ------------------------------ ambient audio -------------------------------- */
const ambient = (() => {
  let ctx = null;
  return {
    start() {
      if (ctx) return;
      try {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
        const bufferSize = 2 * ctx.sampleRate;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let last = 0;
        for (let i = 0; i < bufferSize; i++) { // brown noise ≈ wind
          const white = Math.random() * 2 - 1;
          last = (last + 0.02 * white) / 1.02;
          data[i] = last * 3.2;
        }
        const src = ctx.createBufferSource();
        src.buffer = buffer; src.loop = true;
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass"; filter.frequency.value = 420;
        const gain = ctx.createGain(); gain.gain.value = 0.05;
        const lfo = ctx.createOscillator(); lfo.frequency.value = 0.07;
        const lfoGain = ctx.createGain(); lfoGain.gain.value = 0.025;
        lfo.connect(lfoGain); lfoGain.connect(gain.gain); lfo.start();
        src.connect(filter); filter.connect(gain); gain.connect(ctx.destination);
        src.start();
      } catch { /* audio optional */ }
    },
  };
})();

/* ----------------------------------- motes ----------------------------------- */
const motes = (() => {
  const n = 320;
  const g = new THREE.BufferGeometry();
  const pos = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 60;
    pos[i * 3 + 1] = Math.random() * 8;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 60;
  }
  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const m = new THREE.PointsMaterial({ color: 0xd8dcc8, size: 0.045, transparent: true, opacity: 0.5, sizeAttenuation: true, depthWrite: false });
  const p = new THREE.Points(g, m);
  scene.add(p);
  return p;
})();

/* ------------------------------------ grain ----------------------------------- */
const grainC = document.getElementById("grain");
const gg = grainC.getContext("2d");
function paintGrain() {
  grainC.width = 220; grainC.height = 140;
  const img = gg.createImageData(220, 140);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = Math.random() * 255;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 26;
  }
  gg.putImageData(img, 0, 0);
}
setInterval(paintGrain, 90);
paintGrain();

/* ------------------------------------ loop ------------------------------------ */
const clock = new THREE.Clock();
let bob = 0, dist = 0;
const startPos = new THREE.Vector2(camera.position.x, camera.position.z);

function frame() {
  requestAnimationFrame(frame);
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;

  // movement
  let fwd = 0, str = 0;
  if (keys.has("KeyW") || keys.has("ArrowUp")) fwd += 1;
  if (keys.has("KeyS") || keys.has("ArrowDown")) fwd -= 1;
  if (keys.has("KeyA") || keys.has("ArrowLeft")) str -= 1;
  if (keys.has("KeyD") || keys.has("ArrowRight")) str += 1;
  if (autoWalk) fwd += 1;
  const moving = fwd !== 0 || str !== 0;
  if (moving && started) {
    const len = Math.hypot(fwd, str) || 1;
    const vx = (Math.sin(yaw) * -fwd + Math.cos(yaw) * str) / len * WALK_SPEED * dt;
    const vz = (Math.cos(yaw) * -fwd - Math.sin(yaw) * str) / len * WALK_SPEED * dt;
    const nx = camera.position.x + vx, nz = camera.position.z + vz;
    if (!collide(nx, camera.position.z)) camera.position.x = nx;
    if (!collide(camera.position.x, nz)) camera.position.z = nz;
    bob += dt * 7.2;
    dist += WALK_SPEED * dt;
  }
  camera.position.y = EYE + Math.sin(bob) * 0.045;
  camera.rotation.set(0, 0, 0);
  camera.rotateY(yaw);
  camera.rotateX(pitch);
  // idle sway
  if (!moving) camera.rotateZ(Math.sin(t * 0.4) * 0.0018);

  // follow systems
  sky.position.copy(camera.position);
  sun.position.set(camera.position.x - 46, 58, camera.position.z + 22);
  sun.target.position.set(camera.position.x, 0, camera.position.z);
  motes.position.set(camera.position.x, 0, camera.position.z);
  motes.rotation.y = t * 0.01;

  ensureChunks();

  if (coordsEl && (t | 0) % 2 === 0) {
    coordsEl.textContent = `${Math.round(dist)} m walked`;
  }

  renderer.render(scene, camera);
}
frame();

addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
