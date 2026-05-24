import{n as e,t}from"./gsap-B2JeSRMT.js";import{t as n}from"./lenis-DIx8pWKM.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var T=`https://raw.githubusercontent.com/hydrogenbondss/portfolio-assets/main/`;document.getElementById(`app`).innerHTML=`
  <div id="cur"></div>
  <div id="cur-r"></div>
  <div id="grain"></div>
  <div id="prog"></div>
  <div id="scroll-pct"><span id="scroll-pct-n">00</span><span>%</span></div>

  <div id="loader">
    <div class="ld-name">Jeffrey N. Tse</div>
    <div class="ld-track"><div class="ld-bar" id="ld-bar"></div></div>
    <div class="ld-pct" id="ld-pct">0%</div>
  </div>

  <div id="sky"></div>
  <div id="stars-layer"></div>

  <nav id="nav">
    <a href="#" class="n-logo">JNT</a>
    <ul class="n-links">
      <li><a href="#about">About</a></li>
      <li><a href="#tools">Tools</a></li>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#creative">Creative</a></li>
      <li><a href="#curatorial">Curatorial</a></li>
      <li><a href="#research">Research</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
    <div id="nav-clock"><div id="ck-t"></div><div id="ck-d"></div></div>
  </nav>

  <div id="gate">
    <canvas id="gate-c"></canvas>
    <div class="g-wrap">
      <div class="g-time" id="g-time"></div>
      <div class="g-name"><span class="g-name-i">Jeffrey N. Tse</span></div>
      <div class="g-role">Artist &nbsp;·&nbsp; Creative Technologist &nbsp;·&nbsp; Founder</div>
      <button class="g-btn" id="g-btn">Enter</button>
    </div>
  </div>

  <div id="world">
    <section id="hero">
      <h1 class="h-name">
        <span class="h-line">Jeffrey</span>
        <span class="h-line">N. Tse</span>
      </h1>
      <div class="h-bottom">
        <div class="h-eye">Hong Kong</div>
        <p class="h-stmt">Interactive narrative. Generative systems.<br>Product design. Always in motion.</p>
      </div>
      <div class="h-scroll"><div class="h-scroll-line"></div><div class="h-scroll-txt">Scroll</div></div>
    </section>

    <div id="vgrid"></div>
    <div class="mq"><div class="mq-inner" id="mqInner"></div></div>

    <section class="sec" id="about" style="padding-top:16vh">
      <div class="sec-accent"></div>
      <div class="si">
        <div class="sec-hd"><span class="sec-n">00</span><span class="sec-lbl">About</span><span class="sec-line"></span></div>
        <div class="ab-grid">
          <img src="${T}Jeffrey_Profile.jpg" alt="Jeffrey N. Tse" class="ab-img" loading="lazy">
          <div>
            <div class="ab-stats">
              <div><span class="ab-stat-n" data-count="5">0</span><span class="ab-stat-l">Exhibitions</span></div>
              <div><span class="ab-stat-n" data-count="3">0</span><span class="ab-stat-l">Ventures</span></div>
              <div><span class="ab-stat-n" data-count="7">0</span><span class="ab-stat-l">Years</span></div>
            </div>
            <div class="ab-h">Artist &middot; Creative Technologist &middot; Founder.</div>
            <p class="ab-p">Jeffrey N. Tse is a Hong Kong-based artist and creative technologist whose work sits at the intersection of interactive narrative, product design, generative systems, and editorial work. He is drawn to the places where technology becomes intimate — where a system stops feeling like a tool and starts feeling like a presence.</p>
            <p class="ab-p">Studied Art History at UBC and Marketing at PolyU Hong Kong. Spent years as Chief Editor at I.T Apparels, then as a curator across Vancouver and Hong Kong. The throughline was always the same: how images, objects, and systems make people feel things.</p>
            <p class="ab-p">That range is not accidental. Tse treats every medium — code, image, object, text — as a way of asking the same set of questions about memory, observation, and what it means to be seen.</p>
            <div class="ab-links">
              <a href="mailto:jeffreynicholast@gmail.com">Email ↗</a>
              <a href="https://www.instagram.com/hydrogenbonds/" target="_blank" rel="noopener">Instagram ↗</a>
              <a href="https://github.com/hydrogenbondss" target="_blank" rel="noopener">GitHub ↗</a>
              <a href="https://www.kaggle.com/jeffreyntse" target="_blank" rel="noopener">Kaggle ↗</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="sec" id="tools" style="border-top:1px solid rgba(242,237,228,.06)">
      <div class="si">
        <div class="sec-hd"><span class="sec-n">—</span><span class="sec-lbl">Tools & Technologies</span><span class="sec-line"></span></div>
        <div class="tools-grid" id="toolsGrid"></div>
      </div>
    </section>

    <section class="sec" id="projects">
      <div class="sec-accent"></div>
      <div class="si">
        <div class="sec-hd"><span class="sec-n">01</span><span class="sec-lbl">Selected Projects</span><span class="sec-line"></span></div>
        <div class="pj-list" id="pjList"></div>
      </div>
    </section>

    <section class="sec" id="creative">
      <div class="sec-accent"></div>
      <div class="si">
        <div class="sec-hd"><span class="sec-n">02</span><span class="sec-lbl">Creative Work</span><span class="sec-line"></span></div>
        <div class="cg" id="cg"></div>
      </div>
    </section>

    <section class="sec" id="curatorial">
      <div class="sec-accent"></div>
      <div class="si">
        <div class="sec-hd"><span class="sec-n">03</span><span class="sec-lbl">Curatorial</span><span class="sec-line"></span></div>
        <p style="font-family:'Space Grotesk',sans-serif;font-size:clamp(.88rem,1.2vw,1rem);font-weight:300;color:rgba(242,237,228,.68);line-height:1.75;max-width:600px;margin-bottom:3.5rem">Five exhibitions across Vancouver and Hong Kong. Group and solo shows spanning identity, belonging, memory, and the politics of visibility.</p>
        <div class="cur-list" id="curList"></div>
      </div>
    </section>

    <section class="sec" id="research">
      <div class="sec-accent"></div>
      <div class="si">
        <div class="sec-hd"><span class="sec-n">04</span><span class="sec-lbl">Research & Writing</span><span class="sec-line"></span></div>
        <p style="font-family:'Space Grotesk',sans-serif;font-size:clamp(.88rem,1.2vw,1rem);font-weight:300;color:rgba(242,237,228,.68);line-height:1.75;max-width:600px;margin-bottom:3.5rem">Academic research, critical essays, and press citations spanning spectatorship ethics, mediated intimacy, and material culture.</p>
        <div class="res-list" id="resList"></div>
      </div>
    </section>

    <section class="sec" id="contact">
      <div class="si">
        <div class="ct-pre">Open to collaboration</div>
        <div class="ct-big" data-reveal>Let's work<br>together.</div>
        <a href="mailto:jeffreynicholast@gmail.com" class="ct-email">jeffreynicholast@gmail.com</a><br>
        <a href="${T}Jeffrey_TSE_CV_2026.pdf" target="_blank" class="ct-cv">Download CV ↓</a>
        <div class="ct-soc">
          <a href="https://github.com/hydrogenbondss" target="_blank" rel="noopener">GitHub</a>
          <a href="https://www.instagram.com/hydrogenbonds/" target="_blank" rel="noopener">Instagram</a>
          <a href="https://www.kaggle.com/jeffreyntse" target="_blank" rel="noopener">Kaggle</a>
        </div>
      </div>
    </section>

    <footer>
      <span>© 2026 Jeffrey Nicholas Tse</span>
      <span style="display:flex;align-items:center;gap:1rem">
        <a href="https://hydrogenbondss.github.io/nectar-storyboard/" target="_blank" style="font-family:'DM Mono',monospace;font-size:.42rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(242,237,228,.22);transition:color .25s" onmouseenter="this.style.color='rgba(242,237,228,.65)'" onmouseleave="this.style.color='rgba(242,237,228,.22)'">NECTAR Storyboard ↗</a>
        <span>🇭🇰 Hong Kong</span>
      </span>
    </footer>
  </div>

  <div id="modal">
    <div class="m-wrap"><div class="m-box" id="mBox"></div></div>
    <button class="m-close" id="mClose">Close ✕</button>
  </div>
`;var r=[{t:0,top:[6,8,18],bot:[4,6,14]},{t:.15,top:[22,28,58],bot:[12,16,38]},{t:.28,top:[65,85,148],bot:[32,45,88]},{t:.42,top:[175,128,82],bot:[95,68,45]},{t:.56,top:[195,152,90],bot:[125,95,55]},{t:.7,top:[168,112,72],bot:[105,68,42]},{t:.82,top:[108,55,78],bot:[62,32,52]},{t:.92,top:[35,18,44],bot:[16,8,26]},{t:1,top:[6,8,18],bot:[4,6,14]}];function i(e,t,n){return e.map((e,r)=>Math.round(e+(t[r]-e)*n)).join(`,`)}function a(e){let t=0;for(;t<r.length-2&&!(e<=r[t+1].t);t++);let n=r[t],a=r[t+1]||r[t],o=a.t>n.t?(e-n.t)/(a.t-n.t):1;return{top:i(n.top,a.top,o),bot:i(n.bot,a.bot,o)}}var o=document.getElementById(`sky`),s=document.createElement(`div`);s.id=`sun-el`,s.style.cssText=`position:fixed;border-radius:50%;pointer-events:none;z-index:2;will-change:transform,opacity;transition:opacity .5s`,document.body.appendChild(s);var c=document.getElementById(`stars-layer`),l=document.createElement(`canvas`);l.style.cssText=`width:100%;height:100%;position:absolute;inset:0`,l.width=window.innerWidth,l.height=window.innerHeight;var u=l.getContext(`2d`);Array.from({length:240},()=>({x:Math.random(),y:Math.random(),r:.3+Math.random()*1.1,a:.1+Math.random()*.55})).forEach(e=>{u.beginPath(),u.arc(e.x*l.width,e.y*l.height,e.r,0,Math.PI*2),u.fillStyle=`rgba(242,237,228,${e.a})`,u.fill()}),c.appendChild(l);var d=null,f=!1;function p(){d=document.createElement(`video`),d.src=`https://raw.githubusercontent.com/hydrogenbondss/portfolio-assets/main/clouds-scroll.mp4`,d.muted=!0,d.playsInline=!0,d.preload=`auto`,d.loop=!1,d.style.cssText=`
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 2;
    pointer-events: none;
    opacity: 0;
    transition: opacity 1.2s ease;
    will-change: opacity;
  `;let e=document.createElement(`div`);e.style.cssText=`
    position: fixed;
    inset: 0;
    z-index: 3;
    pointer-events: none;
    background: linear-gradient(
      to bottom,
      rgba(6,8,16,0) 0%,
      rgba(6,8,16,0) 55%,
      rgba(6,8,16,0.6) 80%,
      rgba(6,8,16,0.92) 100%
    );
  `,document.body.insertBefore(d,document.getElementById(`sky`).nextSibling),document.body.insertBefore(e,d.nextSibling),d.addEventListener(`loadedmetadata`,()=>{f=!0,d.pause(),d.style.opacity=`0.92`,d.currentTime=0}),d.load()}function m(e){if(!d||!f)return;let t=d.duration||10,n=.05,r=.85;if(e<n){d.currentTime=0,d.style.opacity=`0`;return}if(e>r){d.currentTime=t,d.style.opacity=`0`;return}let i=(e-n)/.7999999999999999;d.currentTime=i*t;let a=Math.min(1,(e-n)/.06),o=Math.min(1,(r-e)/.08);d.style.opacity=String(Math.min(a,o)*.92)}var h=!1,g=0;function _(e){g=e,h||(h=!0,requestAnimationFrame(()=>{let e=document.documentElement.scrollHeight-window.innerHeight,t=e>0?Math.min(g/e,1):0;v(t),m(t),document.getElementById(`prog`).style.width=t*100+`%`;let n=document.getElementById(`scroll-pct-n`);n&&(n.textContent=String(Math.round(t*100)).padStart(2,`0`)),h=!1}))}function v(e){let{top:t,bot:n}=a(e);if(o.style.background=`linear-gradient(180deg, rgb(${t}) 0%, rgb(${n}) 100%)`,e>.07&&e<.9){let t=(e-.07)/.83*Math.PI*.9,n=window.innerWidth,r=window.innerHeight,i=n*.68+Math.cos(Math.PI*.1-t)*n*.44,a=r*.5-Math.sin(Math.PI*.1-t)*r*.58,o,c,l,u,d;if(e<.3)o=255,c=248,l=215,u=260,d=`rgba(255,248,200,.28)`;else if(e<.52){let t=(e-.3)/.22;o=255,c=Math.round(240-t*92),l=Math.round(205-t*162),u=Math.round(260+t*28),d=`rgba(255,200,80,.32)`}else if(e<.7){let t=(e-.52)/.18;o=255,c=Math.round(148-t*72),l=Math.round(43-t*26),u=Math.round(288-t*88),d=`rgba(255,110,40,.28)`}else{let t=(e-.7)/.2;o=Math.round(255-t*172),c=Math.round(76-t*62),l=Math.round(17-t*14),u=Math.round(200-t*148),d=`rgba(210,45,18,.22)`}let f=Math.min(1,(e-.07)/.1)*Math.min(1,(.9-e)/.08);u>8&&f>0&&(s.style.cssText=`
        position:fixed;left:${i}px;top:${a}px;
        width:${u}px;height:${u}px;
        transform:translate(-50%,-50%);
        border-radius:50%;pointer-events:none;z-index:4;
        background:radial-gradient(circle at 38% 36%,
          rgba(${o},${c},${l},${f}) 0%,
          rgba(${o},${c},${l},${f*.45}) 42%,
          rgba(${o},${c},${l},0) 70%);
        box-shadow:0 0 ${u*.7}px ${u*.28}px ${d};
        opacity:${Math.max(0,Math.min(1,f))};
        will-change:left,top,opacity;
      `)}else s.style.opacity=`0`;let r=e<.18?e<.08?.7:(.18-e)/.1*.7:e>.8?(e-.8)/.12*.7:0;c.style.opacity=String(r)}var y=[{cat:`Interactive Narrative`,title:`RE/SENSE`,sub:`Longitudinal memory · Digital intimacy · Shoujo aesthetics`,video:`https://raw.githubusercontent.com/hydrogenbondss/portfolio-assets/main/resense-opening.mp4`,thumb:`https://raw.githubusercontent.com/hydrogenbondss/portfolio-assets/main/resense-thumb-real.jpg`},{cat:`AI Creative Direction`,title:`PabePabe Trilogy`,sub:`Material metamorphosis · Luxury · Generative`,video:`https://raw.githubusercontent.com/hydrogenbondss/portfolio-assets/main/PBPBOCARINA_VIDEO_FINAL.mp4`,thumb:`https://raw.githubusercontent.com/hydrogenbondss/portfolio-assets/main/PBPBocarina.jpg`},{cat:`Character Design`,title:`Ash-01`,sub:`Neural portrait · Voice synthesis · Motion`,video:`https://raw.githubusercontent.com/hydrogenbondss/portfolio-assets/main/CharacterFINAL.mp4`,thumb:`https://raw.githubusercontent.com/hydrogenbondss/portfolio-assets/main/0311.jpg`},{cat:`Creative Coding`,title:`Feature World`,sub:`Touch-based chaos · Particle physics`,video:`https://raw.githubusercontent.com/hydrogenbondss/portfolio-assets/main/FeatureWorldChaosVid.mp4`,thumb:`https://raw.githubusercontent.com/hydrogenbondss/portfolio-assets/main/FeatureWorldThumbnail.jpg`}],b=[{n:`01`,title:`RE/SENSE`,cat:`Interactive Narrative System`,year:`2026`,badge:`dev`,bl:`In Development`,img:`https://raw.githubusercontent.com/hydrogenbondss/portfolio-assets/main/resense-thumb-real.jpg`,tagline:`A game about intimacy, memory, and what happens when the AI knows you better than you know yourself.`,role:`Creator & Lead Developer`,comingSoon:!0,platforms:`Steam · Itch.io`,desc:`RE/SENSE is a Hong Kong-set interactive narrative project examining digital intimacy, emotional persistence, and systems of longitudinal memory. Presenting itself as a dating simulation, the work investigates how relationships change once interaction becomes observable, recordable, and continuously remembered by computational systems.

Players navigate interpersonal relationships while the game's architecture silently tracks behavioural patterns, emotional tendencies, and recurring decisions across sessions. Longitudinal memory functions as the project's central mechanic: the system's ability to retain and reinterpret player behaviour over time destabilises the boundary between artificial interaction and emotional attachment.

Visually, the work draws from early 1990s anime aesthetics, fashion illustration, and romantic visual language associated with shoujo media — used not nostalgically alone, but as emotional frameworks tied to mediated memory, adolescence, and constructed intimacy.

Developed through AI-assisted pipelines, RE/SENSE also reflects on authorship itself: how identity, emotion, and aesthetic coherence are constructed collaboratively between human intention and generative systems.`},{n:`02`,title:`PawsAid`,cat:`Product · Brand · E-commerce`,year:`2026`,badge:`live`,bl:`Live`,img:`https://raw.githubusercontent.com/hydrogenbondss/portfolio-assets/main/pawsaid-kit-pro.jpg`,modalImg:`https://raw.githubusercontent.com/hydrogenbondss/portfolio-assets/main/pawsaid-hero.jpg`,tagline:`Designed the products. Built the platform. Launched the brand.`,role:`Co-Founder, CTO & Head of Product`,link:`https://pawsaid.hk`,desc:`PawsAid is a pet first-aid kit brand built from scratch — every element designed, engineered, and launched by the founding team. The product line covers three kits (Essential, Plus, Pro) for dogs and cats, each developed with veterinary input and manufactured to professional standard.

The brand's digital infrastructure is a bilingual React/TypeScript e-commerce platform with AI chat support and a full content management system. Tse led brand identity, product design, engineering, and go-to-market strategy from zero to launch.`},{n:`03`,title:`ROLL CALL`,cat:`Archival Interface · Material Culture`,year:`2026`,badge:`live`,bl:`Live`,img:`https://raw.githubusercontent.com/hydrogenbondss/Rollcall/main/public/images/og-image.jpg`,tagline:`A material culture archive and research project. 43 specimens across 21 Asian countries.`,role:`Founder & Curator`,link:`https://hydrogenbondss.github.io/Rollcall/`,desc:`ROLL CALL is a material culture archive cataloguing toilet paper specimens from 21 countries across contemporary Asia. It applies museum-standard methodology — specimen numbers, provenance records, material classifications — to one of the most overlooked categories of consumer goods.

The archive accompanies an original critical essay examining what disposable consumer objects reveal about the cultures, economies, and infrastructures that produce them. Accessible at rollcall.asia.`}],x=[{title:`PabePabe: The Morphing Trilogy`,cat:`AI Creative Direction`,year:`2026`,img:`https://raw.githubusercontent.com/hydrogenbondss/portfolio-assets/main/PBPBocarina.jpg`,desc:`Commissioned trilogy exploring material metamorphosis across three luxury bag designs — Ocarina, Flute Soft Bag, and Horn Bag.`,role:`AI Art Director`,carousel:[{type:`video`,src:`https://raw.githubusercontent.com/hydrogenbondss/portfolio-assets/main/PBPBOCARINA_VIDEO_FINAL.mp4`,thumb:`https://raw.githubusercontent.com/hydrogenbondss/portfolio-assets/main/PBPBocarina.jpg`},{type:`video`,src:`https://raw.githubusercontent.com/hydrogenbondss/portfolio-assets/main/PBPB_flutebagmotion.mp4`,thumb:`https://raw.githubusercontent.com/hydrogenbondss/portfolio-assets/main/pabepabeflutebag.jpg`},{type:`video`,src:`https://raw.githubusercontent.com/hydrogenbondss/portfolio-assets/main/pbpbhornbagv2.mp4`,thumb:`https://raw.githubusercontent.com/hydrogenbondss/portfolio-assets/main/PBPBHornBag.jpg`}]},{title:`Garden of Returning`,cat:`Generative Art`,year:`2026`,img:`https://raw.githubusercontent.com/hydrogenbondss/portfolio-assets/main/garden-thumb.jpg`,desc:`Living browser sanctuary — plants grow, bloom, die, and return. Procedural audio, generative poetry, seasonal cycles.`,role:`Creative Developer`,link:`https://hydrogenbondss.github.io/garden-of-returning/`},{title:`Cathedral of Small Hours`,cat:`Interactive · Generative`,year:`2026`,img:`https://raw.githubusercontent.com/hydrogenbondss/portfolio-assets/main/cathedral-thumb.jpg`,desc:`Human silhouettes resolve from streams of falling words. Move your cursor to summon presence.`,role:`Creative Developer`,link:`https://hydrogenbondss.github.io/cathedral-of-small-hours/`},{title:`Turbo MG21 — AI Motion Study`,cat:`AI Motion Design · Personal Experiment`,year:`2024`,img:`https://raw.githubusercontent.com/hydrogenbondss/portfolio-assets/main/AIgentleMon.jpg`,video:`https://raw.githubusercontent.com/hydrogenbondss/portfolio-assets/main/0310(4)%20(online-video-cutter.com)%20(3).mp4`,desc:`Personal experiment in AI-driven motion design using the Gentle Monster Turbo MG21 — a goggle-frame from the Circuit Collection. Testing generative video workflows for luxury product cinematography.`,role:`AI Motion Designer`},{title:`Ash-01`,cat:`Character Design · AI`,year:`2026`,img:`https://raw.githubusercontent.com/hydrogenbondss/portfolio-assets/main/0311.jpg`,video:`https://raw.githubusercontent.com/hydrogenbondss/portfolio-assets/main/CharacterFINAL.mp4`,desc:`Neural Portrait — original character design with full motion sequence and voice synthesis.`,role:`Character Designer & AI Director`},{title:`Feature World: Chaos`,cat:`Creative Coding`,year:`2026`,img:`https://raw.githubusercontent.com/hydrogenbondss/portfolio-assets/main/FeatureWorldThumbnail.jpg`,video:`https://raw.githubusercontent.com/hydrogenbondss/portfolio-assets/main/FeatureWorldChaosVid.mp4`,desc:`Interactive physics sandbox — touch-based web experience with particle chaos engine.`,role:`Creative Developer`,link:`https://hydrogenbondss.github.io/portfolio-assets/FeatureWorldChaos.html`},{title:`Fashion Editorials`,cat:`Fashion Editorial`,year:`2023–2025`,img:`https://raw.githubusercontent.com/hydrogenbondss/portfolio-assets/main/markgong.jpg`,desc:`Chief Editor at I.T Apparels — Markgong FW25, Doublet, A BATHING APE®, Carhartt WIP across New York and Hong Kong.`,role:`Chief Editor · Interviewer`}],S=[{year:`2019`,title:`Welcome Home`,venue:`Wil Aballe Art Projects · Vancouver`,role:`Curator`,desc:`Group exhibition examining home, belonging, superdiversity, and shifting constructions of identity through sculpture, performance, sound, and installation.`},{year:`2018`,title:`Finite Appearances`,venue:`Wil Aballe Art Projects · Vancouver`,role:`Co-Curator`,desc:`Research-driven exhibition exploring bodily traces, intimacy, ephemerality, and the documentation of presence through performance remnants and archival gestures.`},{year:`2018`,title:`Undergrowth`,venue:`Audain Gallery · Vancouver`,role:`Curator`,desc:`Exhibition exploring displacement, intimacy, belonging, and everyday rituals as sites of meaning-making.`},{year:`2017`,title:`Resonance`,venue:`JCCAC · Hong Kong`,role:`Curator`,desc:`Exhibition investigating memory, identity, emotional traces, and relational experience as persistent, evolving structures.`},{year:`2017`,title:`Unseen Unheard`,venue:`Hatch Gallery · Vancouver`,role:`Curator`,desc:`Exhibition foregrounding invisible presences, marginalised voices, and the politics of visibility.`}],C=[{type:`essay`,year:`2026`,title:`One-Ply Realism: On Toilet Paper as Material Culture and Infrastructure`,venue:`ROLL CALL — Material Culture Archive`,desc:`Critical essay examining 43 specimens across 21 countries. Argues toilet paper is a material index of invisible systems shaping daily life.`,links:[{label:`Read Essay`,url:`https://hydrogenbondss.github.io/Rollcall/#/essay`}]},{type:`research`,year:`2019`,presented:!0,title:`The Offender Behind the Lens: The Enduring Ethical Legacy of Beitler's Lynching Photograph`,venue:`UBC Undergraduate Journal of Art History · 14th Annual Symposium`,desc:`An Art History paper examining Beitler's 1930 Marion, Indiana lynching photograph of Thomas Shipp and Abner Smith. Argues that lynching photographs did not document racial violence — they normalised it. Drawing on Sontag, Wood, and Reinhardt, traces how photographic circulation desensitised viewers, extended humiliation postmortem, and made photographers complicit participants rather than neutral witnesses.`,links:[{label:`Symposium`,url:`https://ahva.ubc.ca/events/event/14th-annual-undergraduate-art-history-symposium-and-ujah-launch/`}]},{type:`thesis`,year:`2023`,title:`Determining the Marketing Legitimacy and Consumer Perception of Online Dating: A Comprehensive Study on Tinder Dating App`,venue:`MSc Marketing Management · Hong Kong Polytechnic University · Supervised by Dr Vincent Leung`,desc:`Masters dissertation examining consumer trust, marketing legitimacy, and perception of online dating platforms. Investigates how visibility and digital evaluation structures reshape self-presentation and relational behaviour.`,links:[]},{type:`press`,year:`2020`,title:`Research cited: The Crushing Emotional Strain of Seeing Images and Videos of Anti-Black Violence`,venue:`Milwaukee Independent`,desc:`The Milwaukee Independent cited Tse's undergraduate research on spectatorship ethics and documentary violence in their reporting on the psychological impact of witnessing anti-Black violence through digital media.`,links:[{label:`Read`,url:`https://www.milwaukeeindependent.com/featured/crushing-emotional-strain-seeing-images-videos-anti-black-violence/`}]}],w=[{label:`Languages & Frameworks`,items:[`React`,`TypeScript`,`JavaScript`,`Python`,`Ren'Py`,`HTML / CSS`,`Node.js`,`Bash`]},{label:`AI & LLMs`,items:[`Claude`,`GPT-4`,`Gemini`,`Qwen`,`Kimi`,`GEN:AI`,`Higgsfield`,`ComfyUI`,`LoRA Training`,`Midjourney`,`ElevenLabs`,`Runway Gen-2`,`Adobe Firefly`]},{label:`Design & Motion`,items:[`Figma`,`UI / UX`,`Character Design`,`After Effects`,`Premiere Pro`,`Photoshop`,`Illustrator`,`CapCut`]},{label:`Platforms & Infrastructure`,items:[`VS Code`,`GitHub`,`Vercel`,`Cloudflare`,`PostgreSQL`,`Drizzle ORM`,`Kaggle`,`Google Trends`,`SEO`,`Microsoft 365`]}];e.registerPlugin(t);;(function(){let e=document.getElementById(`ld-bar`),t=document.getElementById(`ld-pct`),n=document.getElementById(`loader`);function r(r){e.style.width=r+`%`,t.textContent=Math.round(r)+`%`,r>=100&&setTimeout(()=>{n.style.transition=`opacity .7s`,n.style.opacity=`0`,setTimeout(()=>n.style.display=`none`,700)},150)}let i=0,a=setInterval(()=>{i+=Math.random()*12,i>88&&clearInterval(a),r(Math.min(i,88))},90);[`https://raw.githubusercontent.com/hydrogenbondss/portfolio-assets/main/Jeffrey_Profile.jpg`,`https://raw.githubusercontent.com/hydrogenbondss/portfolio-assets/main/resense-thumb-real.jpg`].map(e=>{let t=new Image;return t.onload=t.onerror=()=>{},t.src=e,t}),setTimeout(()=>{clearInterval(a),r(100)},2800)})();var E=document.getElementById(`cur`),D=document.getElementById(`cur-r`),O=0,k=0;document.addEventListener(`mousemove`,t=>{O=t.clientX,k=t.clientY,e.set(E,{left:O,top:k}),e.to(D,{left:O,top:k,duration:.12,ease:`power2.out`})});function A(e){document.querySelectorAll(e).forEach(e=>{e.addEventListener(`mouseenter`,()=>D.classList.add(`big`)),e.addEventListener(`mouseleave`,()=>D.classList.remove(`big`))})}function j(){let e=new Date(new Date().toLocaleString(`en-US`,{timeZone:`Asia/Hong_Kong`})),t=e=>String(e).padStart(2,`0`),n=[`Sun`,`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`],r=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`];document.getElementById(`ck-t`).textContent=`${t(e.getHours())}:${t(e.getMinutes())}:${t(e.getSeconds())}`,document.getElementById(`ck-d`).textContent=`${n[e.getDay()]} ${e.getDate()} ${r[e.getMonth()]}`,document.getElementById(`g-time`).textContent=`${t(e.getHours())}:${t(e.getMinutes())} HKT`}setInterval(j,1e3),j(),(function(){let e=document.getElementById(`gate-c`),t=e.getContext(`2d`);function n(){e.width=innerWidth,e.height=innerHeight;for(let n=0;n<220;n++)t.beginPath(),t.arc(Math.random()*e.width,Math.random()*e.height,Math.random()*1.3,0,Math.PI*2),t.fillStyle=`rgba(242,237,228,${.08+Math.random()*.48})`,t.fill()}n(),window.addEventListener(`resize`,n)})(),e.timeline({delay:.3}).to(`.g-time`,{opacity:1,duration:.7,ease:`power3.out`}).to(`.g-name-i`,{y:`0%`,duration:1,ease:`power4.out`},`-=.3`).to(`.g-role`,{opacity:1,duration:.8,ease:`power3.out`},`-=.5`).to(`.g-btn`,{opacity:1,duration:.7,ease:`power3.out`},`-=.4`);var M=!1;function N(t){t&&t.stopPropagation(),!M&&(M=!0,e.to(`#gate`,{opacity:0,duration:1.4,ease:`power2.inOut`,onComplete:()=>{document.getElementById(`gate`).style.display=`none`;let t=document.getElementById(`world`);t.style.display=`block`,e.fromTo(t,{opacity:0},{opacity:1,duration:.8,ease:`power2.out`}),z()}}))}document.getElementById(`g-btn`).addEventListener(`click`,N);var P;function F(){P=new n({lerp:.08,smoothWheel:!0,wheelMultiplier:.9}),P.on(`scroll`,({scroll:e})=>{_(e),document.getElementById(`nav`).classList.toggle(`scrolled`,e>50)});function e(t){P.raf(t),requestAnimationFrame(e)}requestAnimationFrame(e),t.scrollerProxy(document.body,{scrollTop:()=>P.scroll,getBoundingClientRect:()=>({top:0,left:0,width:window.innerWidth,height:window.innerHeight})}),P.on(`scroll`,t.update)}var I=`ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/.-_`;function L(e,t,n=600){let r=null,i,a=t.split(``);function o(s){r||=s;let c=Math.min((s-r)/n,1);e.textContent=a.map((e,t)=>e===` `?` `:c>t/a.length+.15?e:I[Math.floor(Math.random()*40)]).join(``),c<1?i=requestAnimationFrame(o):e.textContent=t}cancelAnimationFrame(i),requestAnimationFrame(o)}function R(t,n=.35){t.addEventListener(`mousemove`,r=>{let i=t.getBoundingClientRect(),a=(r.clientX-i.left-i.width/2)*n,o=(r.clientY-i.top-i.height/2)*n;e.to(t,{x:a,y:o,duration:.4,ease:`power2.out`})}),t.addEventListener(`mouseleave`,()=>{e.to(t,{x:0,y:0,duration:.6,ease:`elastic.out(1,.4)`})})}function z(){v(0),p(),F(),e.to(`.h-line`,{y:`0%`,duration:1.2,ease:`power4.out`,stagger:.1,delay:.1}),e.to(`.h-eye`,{opacity:1,duration:.9,ease:`power3.out`,delay:.55}),e.to(`.h-stmt`,{opacity:1,duration:.9,ease:`power3.out`,delay:.7}),setTimeout(()=>{t.refresh()},400),e.utils.toArray(`.pj-row,.cur-row,.res-row,.cc`).forEach(t=>{e.fromTo(t,{opacity:0,y:22},{opacity:1,y:0,duration:.75,ease:`power3.out`,scrollTrigger:{trigger:t,start:`top 91%`,scroller:document.body}})}),e.utils.toArray(`.sec-hd`).forEach(t=>{e.fromTo(t,{opacity:0,x:-18},{opacity:.95,x:0,duration:.7,ease:`power3.out`,scrollTrigger:{trigger:t,start:`top 88%`,scroller:document.body}})}),e.fromTo(`.ab-img`,{opacity:0,scale:.97},{opacity:1,scale:1,duration:1.1,ease:`power3.out`,scrollTrigger:{trigger:`#about`,start:`top 78%`,scroller:document.body}}),e.fromTo(`.ab-grid > div:last-child`,{opacity:0,x:24},{opacity:1,x:0,duration:1,ease:`power3.out`,delay:.1,scrollTrigger:{trigger:`#about`,start:`top 78%`,scroller:document.body}}),e.fromTo(`.ct-big`,{opacity:0,y:32},{opacity:1,y:0,duration:1,ease:`power3.out`,scrollTrigger:{trigger:`#contact`,start:`top 85%`,scroller:document.body}}),document.querySelectorAll(`.sec-accent`).forEach(e=>{t.create({trigger:e.parentElement,start:`top 80%`,scroller:document.body,onEnter:()=>e.style.opacity=`1`,onLeaveBack:()=>e.style.opacity=`0`})}),document.querySelectorAll(`[data-count]`).forEach(e=>{t.create({trigger:e,start:`top 85%`,onEnter:()=>{let r=+e.dataset.count,i=performance.now();function a(s){let n=Math.min((s-i)/1400,1);e.textContent=Math.round((1-(1-n)**3)*r),n<1?requestAnimationFrame(a):e.textContent=r}requestAnimationFrame(a)}})});let n=0;window.addEventListener(`scroll`,()=>{let e=Math.abs(window.scrollY-n);n=window.scrollY;let t=document.querySelector(`.mq-inner`);t&&(t.style.animationDuration=Math.max(8,38/(1+e*.04))+`s`)},{passive:!0}),t.create({trigger:`#about`,start:`top bottom`,end:`bottom top`,scrub:!0,scroller:document.body,onUpdate:t=>{let n=document.querySelector(`.ab-img`);n&&e.set(n,{y:t.progress*-40})}}),document.querySelectorAll(`.g-btn,.n-logo`).forEach(e=>R(e,.3)),B(),V(),H(),U(),W(),G(),K(),A(`button, a, .pj-row, .cc, .vp`)}function B(){let e=document.getElementById(`vgrid`);y.forEach((t,n)=>{let r=document.createElement(`div`);r.className=`vp`,r.innerHTML=`<video src="${t.video}" poster="${t.thumb}" muted loop playsinline preload="none"></video>
      <div class="vp-scrim"></div>
      <div class="vp-n">${String(n+1).padStart(2,`0`)}</div>
      <div class="vp-info"><div class="vp-cat">${t.cat}</div><div class="vp-title">${t.title}</div><div class="vp-sub">${t.sub}</div></div>`;let i=r.querySelector(`video`);r.addEventListener(`mouseenter`,()=>{i.play(),D.classList.add(`big`)}),r.addEventListener(`mouseleave`,()=>{i.pause(),D.classList.remove(`big`)}),e.appendChild(r)})}function V(){let e=[`Creative Technologist`,`Editorial Director`,`Creative Coder`,`Generative Artist`,`Brand Designer`,`Researcher`,`Curator`,`Game Developer`,`AI Director`],t=document.getElementById(`mqInner`);[...e,...e].forEach(e=>{let n=document.createElement(`span`);n.className=`mq-item`,n.textContent=e,t.appendChild(n);let r=document.createElement(`span`);r.className=`mq-item mq-sep`,r.textContent=`·`,t.appendChild(r)})}function H(){let e=document.getElementById(`toolsGrid`);w.forEach(t=>{let n=document.createElement(`div`);n.innerHTML=`<div class="tg-label">${t.label}</div><div class="tg-items">${t.items.map(e=>`<span>${e}</span>`).join(``)}</div>`,e.appendChild(n)})}function U(){let e=document.getElementById(`pjList`);b.forEach((t,n)=>{let r=document.createElement(`div`);r.className=`pj-row`,r.innerHTML=`
      <div class="pj-n">${t.n}</div>
      <div>
        <div class="pj-title">${t.title}</div>
        <div class="pj-cat">${t.cat}</div>
        <div class="pj-tagline">${t.tagline}</div>
        ${t.role?`<div class="pj-role">${t.role}</div>`:``}
      </div>
      <div class="pj-meta"><div class="pj-yr">${t.year}</div><span class="pj-badge ${t.badge===`dev`?`b-dev`:`b-live`}">${t.bl}</span></div>
      <div class="pj-bg-n">${String(n+1).padStart(2,`0`)}</div>`;let i=r.querySelector(`.pj-title`);r.addEventListener(`mouseenter`,()=>L(i,t.title,500)),r.addEventListener(`click`,()=>X(t)),e.appendChild(r)})}function W(){let e=document.getElementById(`cg`);x.forEach(t=>{let n=document.createElement(`div`);n.className=`cc`,n.innerHTML=`${t.video?`<video class="cc-m" src="${t.video}" poster="${t.img}" muted loop playsinline preload="none"></video>`:`<img class="cc-m" src="${t.img}" alt="${t.title}" loading="lazy">`}<div class="cc-veil"></div>
      <div class="cc-info"><div class="cc-cat">${t.cat} · ${t.year}</div><div class="cc-title">${t.title}</div></div>`,t.video&&(n.addEventListener(`mouseenter`,()=>n.querySelector(`video`).play()),n.addEventListener(`mouseleave`,()=>n.querySelector(`video`).pause())),n.addEventListener(`click`,()=>X(t)),e.appendChild(n)})}function G(){let e=document.getElementById(`curList`);S.forEach(t=>{let n=document.createElement(`div`);n.className=`cur-row`,n.innerHTML=`<div class="cur-yr">${t.year}<br><span class="cur-role-tag">${t.role}</span></div>
      <div><div class="cur-title">${t.title}</div><div class="cur-venue">${t.venue}</div><div class="cur-desc">${t.desc}</div></div>`,e.appendChild(n)})}function K(){let e=document.getElementById(`resList`);C.forEach(t=>{let n=document.createElement(`div`);n.className=`res-row`;let r=t.links.map(e=>`<a href="${e.url}" target="_blank" rel="noopener" class="res-a">${e.label}</a>`).join(``);n.innerHTML=`<div><div class="res-yr">${t.year}</div><span class="res-type t-${t.type}">${t.type[0].toUpperCase()+t.type.slice(1)}</span>${t.presented?`<div class="res-flag">Presented</div>`:``}</div>
      <div><div class="res-title">${t.title}</div><div class="res-venue">${t.venue}</div><div class="res-desc">${t.desc}</div>${r}</div>`,e.appendChild(n)})}var q=document.getElementById(`modal`),J=document.getElementById(`mBox`),Y=0;function X(e){q.classList.add(`open`),document.body.style.overflow=`hidden`,P&&P.stop(),Y=0,$(e)}function Z(){q.classList.remove(`open`),document.body.style.overflow=``,P&&P.start(),J.querySelectorAll(`video`).forEach(e=>e.pause()),J.innerHTML=``}document.getElementById(`mClose`).addEventListener(`click`,Z),q.addEventListener(`click`,e=>{(e.target===q||e.target.classList.contains(`m-wrap`))&&Z()}),window.addEventListener(`keydown`,e=>{e.key===`Escape`&&Z()});function Q(e){return e.carousel?`<div class="car-w">${e.carousel.map((e,t)=>`<div class="car-s${t>0?` h`:``}">${e.type===`video`?`<video src="${e.src}" poster="${e.thumb}" controls ${t===0?`autoplay`:``} muted loop style="max-width:100%;max-height:66vh;object-fit:contain"></video>`:`<img src="${e.src}" style="max-width:100%;max-height:66vh">`}</div>`).join(``)}<button class="car-a p">&#8592;</button><button class="car-a n">&#8594;</button><div class="car-ds">${e.carousel.map((e,t)=>`<button class="car-d${t===0?` on`:``}" data-dot="${t}"></button>`).join(``)}</div></div>`:e.video?`<video src="${e.video}" poster="${e.img}" controls autoplay muted loop style="max-width:100%;max-height:66vh;object-fit:contain"></video>`:`<img src="${e.modalImg||e.img}" alt="${e.title}" style="max-width:100%;max-height:66vh;object-fit:cover;width:100%;height:100%">`}function $(e){let t=[e.comingSoon?`<span class="mb mb-d">Coming to ${e.platforms}</span>`:e.link?`<a href="${e.link}" target="_blank" rel="noopener" class="mb mb-p">View Project</a>`:``].filter(Boolean).join(``);if(J.innerHTML=`<div class="m-media">${Q(e)}</div>
    <div class="m-info">
      <div class="m-yr">${e.year}</div><div class="m-title">${e.title}</div>
      <div class="m-cat">${e.cat}</div><div class="m-desc">${e.desc}</div>
      ${e.role?`<div class="m-role-wrap"><div class="m-role-lbl">Role</div><div class="m-role">${e.role}</div></div>`:``}
      <div class="m-acts">${t}</div>
    </div>`,e.carousel){let t=[...J.querySelectorAll(`.car-s`)],n=[...J.querySelectorAll(`.car-d`)];function r(e){t.forEach((t,n)=>t.classList.toggle(`h`,n!==e)),n.forEach((t,n)=>t.classList.toggle(`on`,n===e)),t.forEach(e=>{let t=e.querySelector(`video`);t&&t.pause()});let r=t[e].querySelector(`video`);r&&r.play(),Y=e}J.querySelector(`.car-a.p`).addEventListener(`click`,t=>{t.stopPropagation(),r((Y-1+e.carousel.length)%e.carousel.length)}),J.querySelector(`.car-a.n`).addEventListener(`click`,t=>{t.stopPropagation(),r((Y+1)%e.carousel.length)}),n.forEach(e=>e.addEventListener(`click`,t=>{t.stopPropagation(),r(+e.dataset.dot)}))}}window.addEventListener(`resize`,()=>{t.refresh()});