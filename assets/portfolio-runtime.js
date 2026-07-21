(() => {
  const mediaSelector = "img, video";
  let visibilityObserver;
  const createElement = document.createElement.bind(document);

  document.createElement = (tagName, options) => {
    const element = createElement(tagName, options);
    const tag = String(tagName).toLowerCase();

    if (tag === "img") {
      element.loading = "lazy";
      element.decoding = "async";
    } else if (tag === "video") {
      element.preload = "none";
    }

    return element;
  };

  function markReady(element) {
    element.dataset.mediaState = "ready";
    element.parentElement?.querySelector(":scope > .portfolio-media-fallback")?.remove();
  }

  function markError(element) {
    element.dataset.mediaState = "error";
    const parent = element.parentElement;
    if (!parent || parent.querySelector(":scope > .portfolio-media-fallback")) return;

    const fallback = document.createElement("div");
    fallback.className = "portfolio-media-fallback";
    fallback.setAttribute("role", "status");
    fallback.textContent = "Media unavailable";
    parent.append(fallback);
  }

  function prepareMedia(element) {
    if (element.dataset.mediaPrepared === "true") return;
    element.dataset.mediaPrepared = "true";
    element.dataset.mediaState = "loading";
    element.parentElement?.classList.add("portfolio-media-parent");

    if (element instanceof HTMLImageElement) {
      if (!element.loading) element.loading = "lazy";
      element.decoding = "async";
      element.addEventListener("load", () => markReady(element), { once: true });
      element.addEventListener("error", () => markError(element), { once: true });
      if (element.complete) {
        if (element.naturalWidth > 0) markReady(element);
        else markError(element);
      }
      return;
    }

    if (!element.autoplay) element.preload = "none";
    visibilityObserver?.observe(element);
    element.addEventListener("loadeddata", () => markReady(element), { once: true });
    element.addEventListener("error", () => markError(element), { once: true });
    if (element.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) markReady(element);
  }

  function prepareDialog(dialog) {
    if (dialog.dataset.dialogPrepared === "true") return;
    dialog.dataset.dialogPrepared = "true";
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");

    dialog
      .querySelector('[data-sec="pm-931155b3"]')
      ?.setAttribute("aria-label", "Close project");
    dialog
      .querySelector('[data-sec="pm-3faa88c2"]')
      ?.setAttribute("aria-label", "Previous media");
    dialog
      .querySelector('[data-sec="pm-5b4e6e34"]')
      ?.setAttribute("aria-label", "Next media");
  }

  function prepareTree(root) {
    if (root instanceof Element && root.matches(mediaSelector)) prepareMedia(root);
    root.querySelectorAll?.(mediaSelector).forEach(prepareMedia);

    if (root instanceof Element && root.matches('[data-sec="pm-f5c1d377"]')) {
      prepareDialog(root);
    }
    root
      .querySelectorAll?.('[data-sec="pm-f5c1d377"]')
      .forEach(prepareDialog);
  }

  const start = () => {
    visibilityObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting && entry.target instanceof HTMLVideoElement) {
          entry.target.pause();
        }
      }
    }, { rootMargin: "240px 0px" });

    prepareTree(document);
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node instanceof Element) prepareTree(node);
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();
