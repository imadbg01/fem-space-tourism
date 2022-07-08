const { resolve } = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  assetsInclude: ["./assets", "./data"],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        destination: resolve(__dirname, "pages/destination.html"),
        crew: resolve(__dirname, "pages/crew.html"),
        technology: resolve(__dirname, "pages/technology.html"),
      },
    },
  },
});
