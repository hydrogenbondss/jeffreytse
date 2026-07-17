(() => {
  let loading = null;
  let pendingTarget = null;

  function loadPortfolio(target) {
    if (target) pendingTarget = target;
    if (loading) return loading;

    document.documentElement.dataset.portfolioLoading = "true";
    loading = import("./index-Bl2O-kNd.js?v=20260717-strip")
      .then(() => {
        document.documentElement.dataset.portfolioReady = "true";
        delete document.documentElement.dataset.portfolioLoading;
        window.dispatchEvent(new Event("portfolio:ready"));
        if (pendingTarget) {
          requestAnimationFrame(() => {
            document.querySelector(pendingTarget)?.scrollIntoView({ behavior: "smooth" });
            pendingTarget = null;
          });
        }
      });
    return loading;
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href^='#']");
    if (!link || document.documentElement.dataset.portfolioReady === "true") return;
    event.preventDefault();
    loadPortfolio(link.getAttribute("href"));
  });

  const activate = () => loadPortfolio();
  window.addEventListener("wheel", activate, { passive: true, once: true });
  window.addEventListener("touchstart", activate, { passive: true, once: true });
  window.addEventListener("keydown", activate, { once: true });
})();
