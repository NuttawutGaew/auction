'use client';

import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateAuction = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    handleClose();
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
              <Form.Control type="text" placeholder="Enter product name" required />
            </Form.Group>

            <Form.Group controlId="formProductDescription">
              <Form.Label className='font-bold'>Product description</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter product description" required />
            </Form.Group>

            <Form.Group controlId="formProductSize">
              <Form.Label className='font-bold'>Product size</Form.Label>
              <Form.Control type="text" placeholder="Enter product size" required />
            </Form.Group>

            <Form.Group controlId="formProductImage">
              <Form.Label className='font-bold'>Product image</Form.Label>
              <Form.Control type="file" required />
            </Form.Group>

            <Form.Group controlId="formProductPrice">
              <Form.Label className='font-bold'>Product price</Form.Label>
              <Form.Control type="number" placeholder="Enter product price" required />
            </Form.Group>

            <Form.Group controlId="formStartingBid">
              <Form.Label className='font-bold'>Starting bid</Form.Label>
              <Form.Control type="number" placeholder="Enter starting bid" required />
            </Form.Group>

            <Form.Group controlId="formAuctionEndTime">
              <Form.Label className='font-bold'>Duration</Form.Label>
              <Form.Control type="datetime-local" required />
            </Form.Group>

            <button variant="primary" type="submit" className='font-bold bg-yellow-500 text-white px-4 py-2 rounded mt-4 hover:scale-125'>
              Submit
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateAuction;