// giscus.js
(function () {
    const giscus = document.createElement("script");
    giscus.src = "https://giscus.app/client.js";
    giscus.setAttribute("data-repo", "jsalvadorz/jsalvadorz.github.io");
    giscus.setAttribute("data-repo-id", "R_kgDOPqkzFA");
    giscus.setAttribute("data-category", "Announcements");
    giscus.setAttribute("data-category-id", "DIC_kwDOPqkzFM4CvBCj");
    giscus.setAttribute("data-mapping", "pathname");
    giscus.setAttribute("data-strict", "0");
    giscus.setAttribute("data-reactions-enabled", "0");
    giscus.setAttribute("data-emit-metadata", "0");
    giscus.setAttribute("data-input-position", "top");
    giscus.setAttribute("data-theme", "https://jsalvadorz.github.io/assets/plugins/giscus/catppuccin_mocha_custom.css");
    giscus.setAttribute("data-lang", "es");
    giscus.setAttribute("data-loading", "lazy");
    giscus.crossOrigin = "anonymous";
    giscus.async = true;

    const container = document.querySelector(".giscus");
    if (container) {
        container.appendChild(giscus);
    }
})();