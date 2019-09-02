
const manifest = {
    background: {
        persistent:  false,
        scripts: []
    },
    description: "Auto bookmarks referrer, chrome-extension.",
    manifest_version: 2,
    name: "Bookmark Page Referrer",
    options_page: "options.html",
    page_action: {
        default_popup: "popup.html",
    },
    permissions: ["bookmarks", "declarativeContent", "storage", "activeTab"],
    version: "0.0.1",
};

export {manifest};
// export default manifest;
