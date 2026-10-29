const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.sociolla.com", // <-- Pastikan baris ini ada!
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});