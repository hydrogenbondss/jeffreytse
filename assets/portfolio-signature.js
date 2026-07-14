(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const sections = ["work", "motion", "writing", "campaigns", "editorial", "research", "about"];
  let activeCanvas = null;

  function installProgress() {
    if (document.querySelector(".folio-progress")) return;
    const progress = document.createElement("div");
    progress.className = "folio-progress";
    progress.setAttribute("aria-hidden", "true");
    document.body.append(progress);

    let queued = false;
    const update = () => {
      queued = false;
      const limit = document.documentElement.scrollHeight - window.innerHeight;
      const value = limit > 0 ? Math.min(1, Math.max(0, window.scrollY / limit)) : 0;
      progress.style.transform = `scaleX(${value})`;
    };
    window.addEventListener("scroll", () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    }, { passive: true });
    update();
  }

  function installNavigationState() {
    const navigation = document.querySelector('nav[code-path^="src/components/Navigation"]');
    if (!navigation || navigation.dataset.folioPrepared === "true") return;
    const targets = sections.map((id) => document.getElementById(id)).filter(Boolean);
    if (!targets.length) return;
    navigation.dataset.folioPrepared = "true";

    const links = new Map();
    document.querySelectorAll('nav a[href^="#"]').forEach((link) => {
      links.set(link.getAttribute("href").slice(1), link);
    });

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      links.forEach((link, id) => {
        if (id === visible.target.id) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-24% 0px -58%", threshold: [0, 0.08, 0.2] });

    targets.forEach((section) => observer.observe(section));
  }

  function installWorkStage() {
    const work = document.getElementById("work");
    if (!work || work.dataset.folioPrepared === "true") return;
    const cards = [...work.querySelectorAll(".project-card")];
    if (!cards.length) return;

    work.dataset.folioPrepared = "true";
    work.dataset.activeTitle = "Selected work";
    work.dataset.activeIndex = `01 / ${String(cards.length).padStart(2, "0")}`;

    cards.forEach((card, index) => {
      const activate = () => {
        cards.forEach((item) => item.removeAttribute("data-active"));
        card.setAttribute("data-active", "true");
        work.dataset.activeTitle = card.querySelector("h3")?.textContent?.trim() || "Selected work";
        work.dataset.activeIndex = `${String(index + 1).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`;
      };
      card.addEventListener("pointerenter", activate);
      card.addEventListener("focus", activate);
    });
  }

  function createSpherePoints(count) {
    const points = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let index = 0; index < count; index += 1) {
      const y = 1 - (index / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const angle = golden * index;
      points.push({
        x: Math.cos(angle) * radius,
        y,
        z: Math.sin(angle) * radius,
        size: index % 17 === 0 ? 2.9 : index % 7 === 0 ? 2 : 1.25,
      });
    }
    return points;
  }

  function createEdges(points) {
    const edges = new Set();
    points.forEach((point, index) => {
      points
        .map((candidate, candidateIndex) => ({
          candidateIndex,
          distance: candidateIndex === index
            ? Infinity
            : (point.x - candidate.x) ** 2 + (point.y - candidate.y) ** 2 + (point.z - candidate.z) ** 2,
        }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3)
        .forEach(({ candidateIndex }) => {
          edges.add(index < candidateIndex ? `${index}:${candidateIndex}` : `${candidateIndex}:${index}`);
        });
    });
    return [...edges].map((edge) => edge.split(":").map(Number));
  }

  function installOrb() {
    const hero = document.querySelector('section[code-path^="src/sections/Hero"]');
    if (!hero || hero.querySelector(".folio-orb") || activeCanvas?.isConnected) return;

    if (activeCanvas && !activeCanvas.isConnected) activeCanvas = null;

    const canvas = document.createElement("canvas");
    canvas.className = "folio-orb";
    canvas.setAttribute("aria-hidden", "true");
    hero.prepend(canvas);
    activeCanvas = canvas;

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    const points = createSpherePoints(window.innerWidth < 700 ? 86 : 132);
    const edges = createEdges(points);
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let width = 0;
    let height = 0;
    let ratio = 1;
    let scrollProgress = 0;
    let visible = true;
    let frame = 0;
    let lastFrame = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const updateScroll = () => {
      const rect = hero.getBoundingClientRect();
      const travel = Math.max(1, hero.offsetHeight * 0.92);
      scrollProgress = Math.min(1, Math.max(0, -rect.top / travel));
      if (reduceMotion.matches) draw(performance.now());
    };

    const updatePointer = (event) => {
      if (!finePointer.matches) return;
      pointer.targetX = (event.clientX / window.innerWidth - 0.5) * 0.62;
      pointer.targetY = (event.clientY / window.innerHeight - 0.5) * 0.42;
    };

    function draw(time) {
      context.clearRect(0, 0, width, height);
      pointer.x += (pointer.targetX - pointer.x) * 0.055;
      pointer.y += (pointer.targetY - pointer.y) * 0.055;

      const compact = width < 700;
      const radius = Math.min(width * (compact ? 0.58 : 0.34), height * 0.31);
      const centerX = width / 2;
      const centerY = Math.min(height * 0.39, window.innerHeight * 0.5);
      const rotation = reduceMotion.matches ? 0.28 : time * 0.000065;
      const cosineY = Math.cos(rotation + pointer.x);
      const sineY = Math.sin(rotation + pointer.x);
      const cosineX = Math.cos(-0.13 + pointer.y);
      const sineX = Math.sin(-0.13 + pointer.y);
      const burst = Math.pow(scrollProgress, 1.55);
      const projected = points.map((point, index) => {
        const rotatedX = point.x * cosineY - point.z * sineY;
        const rotatedZ = point.x * sineY + point.z * cosineY;
        const rotatedY = point.y * cosineX - rotatedZ * sineX;
        const depth = point.y * sineX + rotatedZ * cosineX;
        const perspective = 1 / (1.2 - depth * 0.23);
        const seed = index * 12.9898;
        const driftX = Math.sin(seed) * width * 0.34 * burst;
        const driftY = (Math.cos(seed * 0.73) * height * 0.18 + height * 0.24) * burst;
        return {
          x: centerX + rotatedX * radius * perspective + driftX,
          y: centerY + rotatedY * radius * perspective + driftY,
          depth,
          alpha: Math.max(0.16, 0.68 + depth * 0.26) * (1 - burst * 0.28),
          size: point.size * (0.86 + perspective * 0.26),
        };
      });

      context.lineWidth = 0.65;
      edges.forEach(([from, to]) => {
        const a = projected[from];
        const b = projected[to];
        context.strokeStyle = `rgba(200, 164, 111, ${Math.min(a.alpha, b.alpha) * 0.2})`;
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
      });

      projected
        .sort((a, b) => a.depth - b.depth)
        .forEach((point) => {
          context.fillStyle = `rgba(244, 240, 232, ${point.alpha})`;
          context.beginPath();
          context.arc(point.x, point.y, point.size, 0, Math.PI * 2);
          context.fill();
        });
    }

    function animate(time) {
      if (!canvas.isConnected) {
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        visibilityObserver.disconnect();
        window.removeEventListener("pointermove", updatePointer);
        window.removeEventListener("scroll", updateScroll);
        if (activeCanvas === canvas) activeCanvas = null;
        return;
      }
      if (!visible || reduceMotion.matches) return;
      frame = requestAnimationFrame(animate);
      if (time - lastFrame < 32) return;
      lastFrame = time;
      draw(time);
    }

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible) {
        if (reduceMotion.matches) draw(performance.now());
        else frame = requestAnimationFrame(animate);
      }
    }, { rootMargin: "30% 0px" });

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });

    resizeObserver.observe(canvas);
    visibilityObserver.observe(hero);
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("scroll", updateScroll, { passive: true });
    reduceMotion.addEventListener?.("change", () => {
      cancelAnimationFrame(frame);
      if (reduceMotion.matches) draw(performance.now());
      else frame = requestAnimationFrame(animate);
    });
    resize();
    updateScroll();
    draw(performance.now());
    if (!reduceMotion.matches) frame = requestAnimationFrame(animate);
  }

  function start() {
    installProgress();
    const prepare = () => {
      installOrb();
      installNavigationState();
      installWorkStage();
    };
    prepare();
    const observer = new MutationObserver(() => prepare());
    observer.observe(document.getElementById("root") || document.body, { childList: true, subtree: true });
    window.setTimeout(() => observer.disconnect(), 8000);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();
