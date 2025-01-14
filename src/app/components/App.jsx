import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

function MyApp({ Component, pageProps }) {
  return (
    <Router>
      <Component {...pageProps} />
    </Router>
  );
}

export default MyApp;