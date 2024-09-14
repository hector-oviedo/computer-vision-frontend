import "@/styles/globals.css";
import { Provider } from 'react-redux';
import store from '../store';

import AppWrapper from '../components/AppWrapper';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </Provider>
  );
}

export default MyApp;