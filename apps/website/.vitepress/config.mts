import { type HeadConfig, defineConfig } from 'vitepress';


const docHead = [
  ['meta', { name: 'theme-color', content: '#ffffff' }],
  ['link', { rel: 'icon', href: '/favicon.ico' }],
  ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    // anaytics
  //['script', { src: 'https://typical-umami.vercel.app/script.js', async: '', "data-website-id": '2dedf0d0-da4d-4b81-9cf3-2fac41885109', 'data-do-not-track': 'true' }],

  
  ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon-180x180.png', sizes: '180x180' }],

  // meta tags
  ['meta', { property: 'og:description', content: 'Complete set of tools to scrape google search results' }],
  ['meta', { name: 'author', content: 'TypicalNinja' }],
  ['meta', {
    name: 'keywords',
    content: 'google, npm, google-sr, google search, searchresults, javascript, typescript, google-search, google-api, scrape',
  }],
  ['meta', { property: 'og:type', content: 'website' }],
  ['meta', { property: 'og:title', content: 'GSR' }],
] satisfies HeadConfig[];


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "GSR",
  description: "Complete set of tools to scrape google search results",
  cleanUrls: false,
  lastUpdated : true,
  head: docHead,
  sitemap: {
    hostname: 'https://g-sr.vercel.app/',
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/google/' },
      { text: 'API Docs', link: '/api/' }
    ],
    editLink: {
      pattern: 'https://github.com/typicalninja/google-sr/tree/master/apps/website/:path'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/typicalninja/google-sr' },
      { icon: 'discord', link: 'https://discord.gg/ynwckXS9T2' }
    ],
    footer: {
      message: 'Released under the <a href="https://github.com/typicalninja/disci/blob/main/LICENSE">Apache 2.0 License</a>.',
      copyright: 'Copyright © 2021-Present <a href="http://typical.vercel.app/">Typicalninja</a> & contributors'
    }
  },

})
