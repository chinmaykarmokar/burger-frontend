import "../../styles/globals.css";
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

// Import store
import store from '../state/store/store';

// Use React-Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store = {store}>
      <Component {...pageProps} />
    </Provider>
  )
}
