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
    primaryHue: 174,
    head: (
        <>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta property="og:title" content="GSR" />
          <meta property="og:description" content="The next site builder" />
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        </>
      ),
    footer: {
      text: `© ${new Date().getFullYear()} GSR project | By typicalninja`,
    },
    chat: {
      link: 'https://discord.gg/ynwckXS9T2 '
    }
}