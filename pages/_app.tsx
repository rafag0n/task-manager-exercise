import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';
import { ToastContainer } from 'react-toastify';
import '../styles.css';


const App: AppType = ({ Component, pageProps }) => {
  return <>
    <Component {...pageProps} />
    <ToastContainer />
  </>
};

export default trpc.withTRPC(App);