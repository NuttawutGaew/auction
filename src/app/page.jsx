import Image from "next/image";
import Navbar from "./components/Navbar";
import logo from '../app/images/Logo.png';
import Slideimage from './components/Slideimage';
import Productpage from './product/page';
// import Buttonmain from "../components/Buttonmain";


export default function Home() {
  return (
    <div className="min-h-screen p-0 m-0 font-[family-name:var(--font-geist-sans)] bg-[#333333]">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <div className="pt-16"> 
        <div className="flex flex-col items-center gap-4 pt-8 mx-0">
          <Image 
            src={logo}
            width={400}
            height={300}
            alt="logo"
          />
          <div className="flex gap-4">
            <button className=" text-yellow-400 px-4 py-2 rounded hover:bg-yellow-400 hover:text-white">หน้าหลัก</button>
            <button className=" text-yellow-400 px-4 py-2 rounded hover:bg-yellow-400 hover:text-white">สินค้าประมูล</button>
            <button className=" text-yellow-400 px-4 py-2 rounded hover:bg-yellow-400 hover:text-white">สินค้า</button>
            <button className=" text-yellow-400 px-4 py-2 rounded hover:bg-yellow-400 hover:text-white">ติดต่อเรา</button>
          </div>
        </div>
        <main >
          <div className="w-full bg-[#787878] p-4 mx-0">
            <Slideimage />
          </div>
          <div className="w-full bg-white p-4 mx-0">
            <Productpage />
          </div>
          <div className="w-full h-[1080] bg-white p-4 mx-0">

          </div>
        </main>
      </div>
    </div>
  );
}