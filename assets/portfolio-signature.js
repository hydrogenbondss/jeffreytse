(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const sections = ["work", "motion", "writing", "campaigns", "editorial", "research", "about"];

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
    const navigation = document.querySelector('nav[data-sec^="n-"]');
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

  const heroWorks = [
    { src: "./assets/thumbnails/pawsaid-cropped.jpg", label: "PawsAid", index: "01" },
    { src: "./assets/rollcall-site.jpg", label: "ROLL CALL", index: "02" },
    { src: "./assets/echo/portfolio/banner-wide.jpg", label: "ECHO: Love and Logged", index: "03" },
    { src: "./assets/thumbnails/spector-hero-glasses.webp", label: "SPECTOR", index: "04" },
    { src: "./assets/thumbnails/selta-laptop-mockup.jpg", label: "SELTA", index: "05" },
    { src: "./assets/thumbnails/noru-feature.png", label: "Noru", index: "06" },
  ];

  function installHeroStrip() {
    const hero = document.querySelector('section[data-sec^="h-"]');
    if (!hero || hero.querySelector(".folio-strip")) return;

    const strip = document.createElement("a");
    strip.className = "folio-strip";
    strip.href = "#work";
    strip.setAttribute("aria-label", "Browse selected work");

    const track = document.createElement("div");
    track.className = "folio-strip-track";

    const renderSet = (ariaHidden) => {
      const set = document.createElement("div");
      set.className = "folio-strip-set";
      if (ariaHidden) set.setAttribute("aria-hidden", "true");
      heroWorks.forEach((work) => {
        const cell = document.createElement("figure");
        cell.className = "folio-strip-cell";
        const image = document.createElement("img");
        image.src = work.src;
        image.alt = ariaHidden ? "" : work.label;
        image.loading = "eager";
        image.decoding = "async";
        const caption = document.createElement("figcaption");
        caption.innerHTML = `<span>${work.index}</span>${work.label}`;
        cell.append(image, caption);
        set.append(cell);
      });
      return set;
    };

    track.append(renderSet(false), renderSet(true));
    strip.append(track);
    hero.append(strip);
  }

  function start() {
    installProgress();
    const prepare = () => {
      installHeroStrip();
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
