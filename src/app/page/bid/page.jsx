'use client';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NavbarBids from '../../components/NavbarBids';
import Button from '@mui/material/Button'
import { Plus, Minus, ChevronLeft, ChevronRight } from 'lucide-react';

const BidPage = () => {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [bidAmount, setBidAmount] = useState(Number(product?.currentBid) || 0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180); // 5 minutes countdown
  const router = useRouter();

  useEffect(() => {
    const id = searchParams.get('id');
    const name = searchParams.get('name');
    const images = searchParams.get('images');
    const price = searchParams.get('price');
    const description = searchParams.get('description');
    const description2 = searchParams.get('description2');
    const currentBid = searchParams.get('currentBid');

    if (id && name && images && price && description && description2 && currentBid) {
      setProduct({ id, name, images: JSON.parse(images), price, description, description2, currentBid });
    }
  }, [searchParams]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          router.push('/page/homepage'); // Redirect to auction page
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch('/api/auth/session');
      if (response.ok) {
        const session = await response.json();
        console.log('User is authenticated:', session);
      } else {
        console.log('User is not authenticated');
      }
    };

    checkAuth();
  }, []);

  if (!product) {
    return (
      <div className='flex flex-col justify-center items-center h-screen text-4xl text-center font-bold'>
        <div className='p-4'>Loading...</div>
        <img alt="Loading" src='https://i.pinimg.com/originals/f2/9f/02/f29f025c9ff5297e8083c52b01f1a709.gif' />
      </div>
    );
  }

  const handleBidNow = () => {
    setShowCard(true);
  };

  const handleCancel = () => {
    setShowCard(false);
  };

  const handleConfirm = () => {
    // Add your bid handling logic here
    console.log('Bid placed');
    setShowCard(false);
  };
  
  const handleIncrement = () => {
    setBidAmount(prev => prev + 50);
  };

  const handleDecrement = () => {
    setBidAmount(prev => Math.max(Number(product?.currentBid) || 0, prev - 50));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div>
      <NavbarBids />
      <div className="max-w-7xl mx-auto bg-white pt-16 m-10">
        <h1 className="font-bold mb-4 text-center font-extrabold text-4xl p-2">{product.name}</h1>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <Slider {...settings}>
              {product.images.map((image, index) => (
                <div key={index}>
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-auto mb-4 rounded-lg" />
                </div>
              ))}
            </Slider>
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <div>
              <div className="mb-2 pl-4">
                <h2 className="text-2xl font-semibold">{product.description}</h2>
              </div>
              <div className='mt-4 ml-4 pt-4 border-t-2 border-gray-300'>
                <h2 className="text-l font-semibold opacity-50">รายละเอียดสินค้า :</h2>
              </div>
              <div className="mb-2 pl-4 py-2">
                <h4 className="text-xl font-semibold">{product.description2}</h4>
              </div>
            </div>
            <div className='py-3'>
              <div className="mb-2 pl-4">
                <h2 className="text-2xl font-bold">
                  <span className='opacity-50'>Ends in : </span>
                  <span className='text-red-600'>{formatTime(timeLeft)} min.</span>
                </h2>
              </div>
              <div className="mb-2 pl-4">
                <h3 className="text-xl font-bold">
                  <span className='opacity-50'>Current Bid : </span>
                  <span>{product.currentBid} บาท</span>
                </h3>
              </div>
              <div className="mb-2 pl-4">
                <h3 className="text-xl font-bold">
                  <span className='opacity-50'>Place Bid : </span>
                  <span>name.</span>
                </h3>
              </div>
            </div>
            <div className='flex p-3 items-center space-x-4'>
              <h3 className="text-2xl font-bold">
                <span className='opacity-50'>Your Bid :</span>
              </h3>
              <div className="flex items-center space-x-2">
            <button
              onClick={handleDecrement}
              className="bg-red-500 hover:bg-red-700 text-white p-2 rounded-full"
            >
              <Minus size={20} />
            </button>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(Number(e.target.value))}
              className="border-2 border-gray-300 p-2 w-40 text-center"
            />
            <button
              onClick={handleIncrement}
              className="bg-green-500 hover:bg-green-700 text-white p-2 rounded-full"
            >
              <Plus size={20} />
            </button>
          </div>
              <button onClick={handleBidNow} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg hover:scale-1">
                Bid Now
              </button>
            </div>
          </div>
        </div>
      </div>
      {showCard && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-72 bg-white rounded-2xl flex flex-col items-center justify-center gap-5 p-8 relative shadow-lg">
            <div className="w-full flex flex-col gap-1">
              <p className="text-xl font-bold text-gray-900">Confirm Bid</p>
              <p className="font-light text-gray-600">Are you sure you want to place this bid?</p>
            </div>
            <div className="w-full flex items-center justify-center gap-2">
              <button onClick={handleCancel} className="w-1/2 h-9 rounded-lg bg-gray-300 hover:bg-gray-400 font-semibold">
                Cancel
              </button>
              <button onClick={handleConfirm} className="w-1/2 h-9 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold">
                Confirm
              </button>
            </div>
            <button onClick={handleCancel} className="absolute top-5 right-5 flex items-center justify-center bg-transparent cursor-pointer">
              <svg height="20px" viewBox="0 0 384 512" className="fill-gray-400 hover:fill-black">
                <path
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BidPage;