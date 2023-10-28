import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "GSR",
  description: "Complete set of tools to scrape google search results",
  cleanUrls: true,
  lastUpdated : true,
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    // anaytics
    ['script', { src: 'https://umami.typical.gq/script.js', async: '', "data-website-id": '2dedf0d0-da4d-4b81-9cf3-2fac41885109' }]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/google/' },
      { text: 'API Docs', link: 'https://typicalninja.github.io/google-sr/' }
    ],
    editLink: {
      pattern: 'https://github.com/typicalninja/google-sr/tree/master/apps/website/:path'
    },
    search: {
      provider: 'local'
    },
    sidebar: [
      {
        text: 'sr',
        collapsed: true,
        items: [
          { text: 'Introduction', link: '/google/sr/' },
          { text: 'Usage', link: '/google/sr/usage' },
          { text: 'Advanced usage', link: '/google/sr/advanced' },
          { text: 'Result types', link: '/google/sr/types' },
          { text: 'API Documentation', link: 'https://typicalninja.github.io/google-sr/modules/google_sr.html' },
          { text: 'NPM link', link: 'https://www.npmjs.com/package/google-sr' }
        ]
      },
      {
        text: 'selectors',
        collapsed: true,
        items: [
          { text: 'Introduction', link: '/google/selectors/' },
          { text: 'Overview', link: '/google/selectors/overview' },
          { text: 'API Documentation', link: 'https://typicalninja.github.io/google-sr/modules/google_sr_selectors.html' },
          { text: 'NPM link', link: 'https://www.npmjs.com/package/google-sr' }
        ]
      },
      {
        text: 'that',
        collapsed: true,
        items: [
          { text: 'Introduction', link: '/google/that/' },
          { text: 'NPM link', link: 'https://www.npmjs.com/package/google-that' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/typicalninja/google-sr' },
      { icon: 'discord', link: 'https://discord.gg/ynwckXS9T2' }
    ],
    footer: {
      message: 'Released under the <a href="https://github.com/typicalninja/disci/blob/main/LICENSE">Apache 2.0 License</a>.',
      copyright: 'Copyright © 2023 <a href="https://typical.gq/">Typicalninja</a> & contributors'
    }
  },
  
  markdown: {
    lineNumbers: true
  }
})
