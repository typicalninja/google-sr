export default {
    logo: <img src="/images/logo/transparent.png" height={70} width={70} />,
    project: {
      link: 'https://github.com/typicalninja/google-sr'
    },
    docsRepositoryBase: 'https://github.com/typicalninja/google-sr/tree/master/apps/website',
    useNextSeoProps() {
        return {
          titleTemplate: '%s – GSR'
        }
    },
    primaryHue: 174,
    head: (
        <>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta property="og:title" content="GSR" />
          <meta property="og:description" content="Collection of tools to scrape google search results in javascript" />
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          {/** Analytics */}
          <script async src="https://umami.typical.gq/script.js" data-website-id="2dedf0d0-da4d-4b81-9cf3-2fac41885109"></script>
        </>
      ),
    footer: {
      text: `© ${new Date().getFullYear()} GSR project | By typicalninja`,
    },
    chat: {
      link: 'https://discord.gg/ynwckXS9T2 '
    },
    sidebar: {
      defaultMenuCollapseLevel: 1,
      toggleButton: true
    },
}