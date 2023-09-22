export default {
    logo: <img src="/transparent.png" height={70} width={70} />,
    project: {
      link: 'https://github.com/typicalninja/google-sr'
    },
    docsRepositoryBase: 'https://github.com/typicalninja/google-sr/tree/master/apps/website',
    useNextSeoProps() {
        return {
          titleTemplate: '%s – GSR'
        }
    },
    head: (
        <>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />

          <meta property="og:type" content="website" />
          <meta property="og:description" content="Collection of tools to scrape google search results in javascript" />
          <meta property="og:image" content="/images/logo/transparent.png" />
          <meta property="og:url" content="https://g-sr.vercel.app/" />
          
          {/** Analytics */}
          <script async src="https://umami.typical.gq/script.js" data-website-id="2dedf0d0-da4d-4b81-9cf3-2fac41885109"></script>

          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="theme-color" content="#ffffff" />
        </>
      ),
    footer: {
      text: `© ${new Date().getFullYear()} GSR project | Made with ☕ by typicalninja`,
    },
    chat: {
      link: 'https://discord.gg/ynwckXS9T2 '
    },
    sidebar: {
      defaultMenuCollapseLevel: 1,
      toggleButton: true
    },
}