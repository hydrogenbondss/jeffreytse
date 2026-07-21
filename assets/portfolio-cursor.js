(() => {
  const finePointer = window.matchMedia("(pointer: fine)");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Only enhance precise pointers when motion is welcome. Touch/keyboard users
  // and anyone who prefers reduced motion keep the native cursor untouched.
  if (!finePointer.matches || reduceMotion.matches) return;

  const root = document.documentElement;

  const make = (className) => {
    const node = document.createElement("div");
    node.className = className;
    node.setAttribute("aria-hidden", "true");
    return node;
  };

  const dot = make("folio-cursor-dot");
  const ring = make("folio-cursor-ring");
  const glow = make("folio-spotlight");

  const attach = () => {
    document.body.append(glow, ring, dot);
    root.classList.add("folio-cursor-active");
  };

  if (document.body) attach();
  else window.addEventListener("DOMContentLoaded", attach, { once: true });

  const hoverSelector =
    "a, button, input, textarea, select, label, summary, [role='button'], [data-cursor-hover], .project-card";

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let rafId = null;

  const setPos = (node, x, y) => {
    node.style.setProperty("--x", `${x}px`);
    node.style.setProperty("--y", `${y}px`);
  };

  const loop = () => {
    ringX += (mouseX - ringX) * 0.2;
    ringY += (mouseY - ringY) * 0.2;
    setPos(ring, ringX, ringY);

    if (Math.abs(mouseX - ringX) > 0.1 || Math.abs(mouseY - ringY) > 0.1) {
      rafId = requestAnimationFrame(loop);
    } else {
      rafId = null;
    }
  };

  const kick = () => {
    if (rafId === null) rafId = requestAnimationFrame(loop);
  };

  window.addEventListener(
    "mousemove",
    (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      setPos(dot, mouseX, mouseY);
      setPos(glow, mouseX, mouseY);
      root.classList.remove("folio-cursor-hidden");
      kick();
    },
    { passive: true },
  );

  document.addEventListener("mouseover", (event) => {
    if (event.target.closest?.(hoverSelector)) root.classList.add("folio-cursor-hovering");
  });

  document.addEventListener("mouseout", (event) => {
    const stillHovering =
      event.relatedTarget && event.relatedTarget.closest?.(hoverSelector);
    if (event.target.closest?.(hoverSelector) && !stillHovering) {
      root.classList.remove("folio-cursor-hovering");
    }
  });

  window.addEventListener("mousedown", () => root.classList.add("folio-cursor-down"));
  window.addEventListener("mouseup", () => root.classList.remove("folio-cursor-down"));

  root.addEventListener("mouseleave", () => root.classList.add("folio-cursor-hidden"));
  root.addEventListener("mouseenter", () => root.classList.remove("folio-cursor-hidden"));
})();
