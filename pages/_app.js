import { QueryClient, QueryClientProvider } from 'react-query';
import '@/styles/globals.css'
import { MainNav } from '.'

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return(
    <QueryClientProvider client={queryClient}>
      <MainNav>
        <Component {...pageProps} />
      </MainNav>
    </QueryClientProvider>
  ) 
}
