(function () {
  const config = window.SITE_COUNTER_CONFIG || {};
  const widgets = document.querySelectorAll("[data-visit-counter]");
  if (!widgets.length) return;

  const siteId = config.siteId || "ai-resource-site";
  const endpoint = (config.endpoint || "").trim();
  const page = document.body.dataset.page || location.pathname.split("/").pop() || "index";
  const visitorKey = `${siteId}:visitorId`;
  const localCountKey = `${siteId}:localViews`;

  let visitorId = localStorage.getItem(visitorKey);
  if (!visitorId) {
    visitorId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(visitorKey, visitorId);
  }

  function setCounter(value, note) {
    widgets.forEach((widget) => {
      const number = widget.querySelector("[data-visit-number]");
      const status = widget.querySelector("[data-visit-status]");
      if (number) number.textContent = value;
      if (status) status.textContent = note;
    });
  }

  function localPreview() {
    const next = Number(localStorage.getItem(localCountKey) || "0") + 1;
    localStorage.setItem(localCountKey, String(next));
    setCounter(next.toLocaleString("zh-TW"), "本機預覽");
  }

  async function remoteCount() {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        siteId,
        page,
        path: location.pathname,
        visitorId,
        referrer: document.referrer || ""
      })
    });
    const result = await response.json();
    const count = result.count || result.value || result.total || result.views;
    setCounter(count ? Number(count).toLocaleString("zh-TW") : "已記錄", "總瀏覽人次");
  }

  if (!endpoint) {
    localPreview();
    return;
  }

  remoteCount().catch(() => {
    setCounter("--", "計數服務暫時無法連線");
  });
})();
