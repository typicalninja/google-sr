const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
});

const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA(withNextra());
