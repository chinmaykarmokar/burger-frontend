import "../../styles/globals.css";
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

// Import store
import store from '../state/store/store';

// Use React-Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import { SSRProvider } from "react-bootstrap";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
        <Provider store = {store}>
          <Component {...pageProps} />
        </Provider>
    </SSRProvider>
  )
}
