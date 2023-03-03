import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AppContextWrapper } from '../context/context'
import { connectToDatabase } from "../config/mongo";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContextWrapper>
    <Component {...pageProps} />
  </AppContextWrapper>
  )
}

connectToDatabase().then(() => {
  console.log('connected to the database');
}).catch((error) => {
  console.error('failed to connect to the database', error);
});
