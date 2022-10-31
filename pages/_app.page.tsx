import 'antd/dist/antd.css'
import '../styles/globals.scss'

import type { AppProps } from 'next/app'
import AppLayout from '@/components/AppLayout'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import { useState } from 'react'

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps?.dehydratedState}>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
        <ReactQueryDevtools initialIsOpen={false} />
      </Hydrate>
    </QueryClientProvider>
  )
}
