import { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from 'styled-components'

import { PageContextProvider } from 'context/PageContext'
import GlobalStyles from 'styles/global'
import theme from 'styles/theme'

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Vibbra Venda e Troca</title>
        <link rel="shortcut icon" href="/img/vibbra-logo-512.png" />
        <link rel="apple-touch-icon" href="/img/vibbra-logo-512.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#06092B" />
        <meta name="description" content="Vibbra Venda e Troca" />
      </Head>
      <GlobalStyles />
      <PageContextProvider>
        <Component {...pageProps} />
      </PageContextProvider>
    </ThemeProvider>
  )
}

export default App
