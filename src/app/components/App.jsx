import { useSession } from 'next-auth/react';

const App = () => {
  const { data: session } = useSession();

  return (
    <Navbar isLoggedIn={!!session} />
  );
};

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