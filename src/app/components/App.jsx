import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../login/page';
import HomePage from './HomePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
}

export default App;

// import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';

// function MyApp({ Component, pageProps }) {
//   return (
//     <Router>
//       <Component {...pageProps} />
//     </Router>
//   );
// }

// export default MyApp;