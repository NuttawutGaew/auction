// 'use client';

// import React, { useState } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const CreateAuction = () => {
//   const [show, setShow] = useState(false);
//   const [formData, setFormData] = useState({
//     productName: '',
//     productDescription: '',
//     productSize: '',
//     productImage: null,
//     productPrice: '',
//     startingBid: '',
//     duration: ''
//   });

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) {
//       setFormData({ ...formData, [name]: files[0] });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const data = new FormData();
//     data.append('name', formData.productName);
//     data.append('description', formData.productDescription);
//     data.append('size', formData.productSize);
//     data.append('image', formData.productImage);
//     data.append('price', formData.productPrice);
//     data.append('startingBid', formData.startingBid);
//     data.append('duration', formData.duration);

//     try {
//       const response = await fetch('http://localhost:3000/api/v1/auction', {
//         method: 'POST',
//         body: data
//       });

//       if (response.ok) {
//         const result = await response.json();
//         console.log('Auction created successfully:', result.data);
//         handleClose();
//       } else {
//         const error = await response.json();
//         console.error('Error creating auction:', error.message);
//       }
//     } catch (error) {
//       console.error('Error creating auction:', error);
//     }
//   };

//   return (
//     <>
//       <button variant="primary" onClick={handleShow} className='fixed bottom-20 left-5 rounded-full bg-gradient-to-tr from-red-500 to-yellow-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer hover:scale-125'>
//         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
//             <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
//         </svg>
//       </button>

//       <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Create Auction</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handleSubmit} className='ml-2 mr-2'>
//             <Form.Group controlId="formProductName">
//               <Form.Label className='font-bold'>Product name</Form.Label>
//               <Form.Control type="text" name="productName" placeholder="Enter product name" required onChange={handleChange} />
//             </Form.Group>

//             <Form.Group controlId="formProductDescription">
//               <Form.Label className='font-bold'>Product description</Form.Label>
//               <Form.Control as="textarea" name="productDescription" rows={3} placeholder="Enter product description" required onChange={handleChange} />
//             </Form.Group>

//             <Form.Group controlId="formProductSize">
//               <Form.Label className='font-bold'>Product size</Form.Label>
//               <Form.Control type="text" name="productSize" placeholder="Enter product size" required onChange={handleChange} />
//             </Form.Group>

//             <Form.Group controlId="formProductImage">
//               <Form.Label className='font-bold'>Product image</Form.Label>
//               <Form.Control type="file" name="productImage" required onChange={handleChange} />
//             </Form.Group>

//             <Form.Group controlId="formProductPrice">
//               <Form.Label className='font-bold'>Product price</Form.Label>
//               <Form.Control type="number" name="productPrice" placeholder="Enter product price" required onChange={handleChange} />
//             </Form.Group>

//             <Form.Group controlId="formStartingBid">
//               <Form.Label className='font-bold'>Starting bid</Form.Label>
//               <Form.Control type="number" name="startingBid" placeholder="Enter starting bid" required onChange={handleChange} />
//             </Form.Group>

//             <Form.Group controlId="formAuctionEndTime">
//               <Form.Label className='font-bold'>Duration</Form.Label>
//               <Form.Control type="datetime-local" name="duration" required onChange={handleChange} />
//             </Form.Group>

//             <button variant="primary" type="submit" className='font-bold bg-gradient-to-tr from-red-500 to-yellow-500 text-white px-4 py-2 rounded mt-4 hover:scale-125'>
//               Submit
//             </button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };
// export default CreateAuction;

'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateAuction = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    startingPrice: '',
    minimumBidIncrement: 10,
    category: '',
    images: []
  });
  const [error, setError] = useState('');
  const router = useRouter();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      images: e.target.files
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const data = new FormData();
    data.append('name', formData.name);
    data.append('startingPrice', formData.startingPrice);
    data.append('minimumBidIncrement', formData.minimumBidIncrement);
    data.append('category', formData.category);
    for (let i = 0; i < formData.images.length; i++) {
      data.append('images', formData.images[i]);
    }
    
    try {
      const response = await fetch('http://localhost:3111/api/v1/auction', {
        method: 'POST',
        credentials: 'include', // ✅ ต้องเปิดให้ Cookies ถูกแนบไปด้วย
        body: data
      });
    
      if (response.status === 201) {
        router.push('/page/homepage');
        handleClose();
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (err) {
      setError('An error occurred while creating the auction.');
    }
  };

  return (
    <>
    <button variant="primary" onClick={handleShow} className='fixed bottom-20 left-5 rounded-full bg-gradient-to-tr from-red-500 to-yellow-500 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none cursor-pointer hover:scale-125'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Auction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className='ml-2 mr-2'>
          <Form.Group controlId="formProductName">
            <Form.Label className='font-bold'>Product name</Form.Label>
            <Form.Control type="text" name="name" placeholder="Enter product name" required onChange={handleChange} />
          </Form.Group>

          <Form.Group controlId="formStartingPrice">
            <Form.Label className='font-bold'>Starting Price</Form.Label>
            <Form.Control type="number" name="startingPrice" placeholder="Enter starting price" required onChange={handleChange} />
          </Form.Group>

          <Form.Group controlId="formMinimumBidIncrement">
            <Form.Label className='font-bold'>Minimum Bid Increment</Form.Label>
            <Form.Control type="number" name="minimumBidIncrement" placeholder="Enter minimum bid increment" onChange={handleChange} />
          </Form.Group>

          <Form.Group controlId="formCategory">
            <Form.Label className='font-bold'>Category</Form.Label>
            <Form.Control as="select" name="category" required onChange={handleChange}>
              <option value="">Select a category</option>
              <option value="chair">Chair</option>
              <option value="sofas_and_armchairs">Sofas and armchairs</option>
              <option value="table">Table</option>
              <option value="cupboard">Cupboard</option>
              <option value="bad">Bad</option>
              <option value="counter">Counter</option>
              <option value="office_furniture">Office furniture</option>
              <option value="kitchenware_and_freezer">Kitchenware and freezer</option>
              <option value="door">Door</option>
              <option value="home_decoration">Home decoration</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formImages">
            <Form.Label className='font-bold'>Upload Images (max 5)</Form.Label>
            <Form.Control type="file" name="images" accept="image/*" multiple onChange={handleFileChange} required />
          </Form.Group>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button variant="primary" type="submit" className='font-bold bg-gradient-to-tr from-red-500 to-yellow-500 text-white px-4 py-2 rounded mt-4 hover:scale-125'>
            Submit
          </button>
        </Form>
      </Modal.Body>
    </Modal>
    </>
  );
};

export default CreateAuction;