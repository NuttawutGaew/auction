import React from 'react';
import Navbar from './Navbar';

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar isLoggedIn={true} />
      <div className="pt-16">
        <h1 className="text-3xl font-bold text-center">ยินดีต้อนรับสู่หน้าแรก</h1>
      </div>
    </div>
  );
}

export default HomePage;

// import Image from "next/image";
// import Navbar from "./components/Navbar";
// import logo from '../app/images/Logo.png';
// import Slideimage from './components/Slideimage';
// import Productpage from './product/page';
// import Buttonmain from "../components/Buttonmain";

// function Homepage() {
//   return (
//     <div className="min-h-screen p-0 m-0 font-[family-name:var(--font-geist-sans)] bg-[#333333]">
//       <div className="fixed top-0 left-0 w-full z-50">

//       </div>
//       <div className="pt-16"> 
//         <div className="flex flex-col items-center gap-4 pt-8 mx-0">
//           <Image 
//             src={logo}
//             width={400}
//             height={300}
//             alt="logo"
//           />
//           <Buttonmain />
//         </div>
//         <main >
//           <div className="w-full bg-[#787878] p-4 mx-0">
//             <Slideimage />
//           </div>
//           <div className="w-full bg-white p-4 mx-0">
//             <Productpage />
//           </div>
//           <div className="w-full h-[1080] bg-white p-4 mx-0">

//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }
// export default Homepage;