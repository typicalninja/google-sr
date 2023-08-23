const withNextra = require("nextra")({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx",
});

const withPWA = require('next-pwa')({
  dest: 'public',
  //disable: process.env.NODE_ENV === 'development',
})

module.exports = withPWA(withNextra());
