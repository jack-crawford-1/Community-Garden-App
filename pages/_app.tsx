import '../src/app/styles/globals.css'
import SessionProviderWrapper from '../src/app/components/auth/SessionProviderWrapper'
import type { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProviderWrapper>
      <Component {...pageProps} />
    </SessionProviderWrapper>
  )
}
