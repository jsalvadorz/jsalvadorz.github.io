class CopyButtonPlugin {
    constructor(options = {}) {
        self.hook = options.hook;
        self.callback = options.callback;
        self.lang = options.lang || document.documentElement.lang || "en"
    }
    "after:highlightElement"({
        el,
        text
    }) {
        let button = Object.assign(document.createElement("button"), {
            innerHTML: locales[lang]?.[0] || "Copy",
            className: "hljs-copy-button"
        });
        button.dataset.copied = false;
        el.parentElement.classList.add("hljs-copy-wrapper");
        el.parentElement.appendChild(button);
        el.parentElement.style.setProperty("--hljs-theme-background", window.getComputedStyle(el).backgroundColor);
        button.onclick = function() {
            if (!navigator.clipboard) return;
            let newText = text;
            if (hook && typeof hook === "function") {
                newText = hook(text, el) || text
            }
            navigator.clipboard.writeText(newText).then(function() {
                button.innerHTML = locales[lang]?.[1] || "Copied!";
                button.dataset.copied = true;
                let alert = Object.assign(document.createElement("div"), {
                    role: "status",
                    className: "hljs-copy-alert",
                    innerHTML: locales[lang]?.[2] || "Copied to clipboard"
                });
                el.parentElement.appendChild(alert);
                setTimeout(() => {
                    button.innerHTML = locales[lang]?.[0] || "Copy";
                    button.dataset.copied = false;
                    el.parentElement.removeChild(alert);
                    alert = null
                }, 2e3)
            }).then(function() {
                if (typeof callback === "function") return callback(newText, el)
            })
        }
    }
}
if (typeof module != "undefined") {
    module.exports = CopyButtonPlugin
}
const locales = {
    en: ["Copy", "Copied!", "Copied to clipboard"],
    es: ["Copiar", "¡Copiado!", "Copiado al portapapeles"],
    fr: ["Copier", "Copié !", "Copié dans le presse-papier"],
    de: ["Kopieren", "Kopiert!", "In die Zwischenablage kopiert"],
    ja: ["コピー", "コピーしました！", "クリップボードにコピーしました"],
    ko: ["복사", "복사됨!", "클립보드에 복사됨"],
    ru: ["Копировать", "Скопировано!", "Скопировано в буфер обмена"],
    zh: ["复制", "已复制!", "已复制到剪贴板"],
    "zh-tw": ["複製", "已複製!", "已複製到剪貼簿"]
};