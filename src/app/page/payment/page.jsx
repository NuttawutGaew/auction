'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import NavbarPayment from '../../components/NavbarPayment';

const PaymentPage = () => {
  const router = useRouter();
  const [totalAmount, setTotalAmount] = useState(10000);
  const [countdown, setCountdown] = useState(300); // 5 minutes countdown

  useEffect(() => {
    if (router.query && router.query.totalAmount) {
      setTotalAmount(parseFloat(router.query.totalAmount));
    }
  }, [router.query]);

  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [qrCodeValue, setQrCodeValue] = useState('');

  useEffect(() => {
    if (paymentMethod === 'qrCode') {
      setQrCodeValue(`Amount: ${totalAmount}`);
      setCountdown(1200); // Reset countdown to 5 minutes
    }
  }, [paymentMethod, totalAmount]);

  useEffect(() => {
    let timer;
    if (paymentMethod === 'qrCode' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      // Handle QR Code expiration logic here
      alert('QR Code expired');
    }
    return () => clearInterval(timer);
  }, [paymentMethod, countdown]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment submission logic here
    alert('Payment submitted');
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div>
      <NavbarPayment />
      <form onSubmit={handleSubmit}>
        <div className="max-w-2xl mx-auto bg-white p-8  border border-yellow-300 rounded-lg shadow-lg mt-20 m-10" style={{ boxShadow: '0 4px 6px rgb(255, 217, 0), 0 8px 8px rgba(0, 0, 0, 0.06)' }}>
          <h2 className="text-2xl font-bold mb-6 text-center">Payment Information</h2>
          <div className="space-y-4">
            <div className="form-group">
              <label className="block font-semibold mb-2">Choose form of payment:</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm"
              >
                <option value="qrCode">QR Code</option>
                <option value="creditCard">Credit Card</option>
                <option value="bankTransfer">Bank Transfer</option>
              </select>
            </div>
            {/* QR Code /////////////////////////////////////////////////// */}
            {paymentMethod === 'qrCode' && (
                <div className="form-group flex justify-center items-center flex-col">
                    <label className="block font-semibold mb-2">Scan QR Code:</label>
                    <QRCodeSVG value={qrCodeValue} size={128} className="w-64 h-64 mb-4" />
                    <div className="text-center font-bold text-xl">Amount: ${totalAmount.toLocaleString()}</div>
                    <div className="text-center font-bold text-red-500">Expires in: {formatTime(countdown)}</div>
                </div>
            )}
            {/* creditCard /////////////////////////////////////////////////// */}
            {paymentMethod === 'creditCard' && (
              <>
                <div className="form-group">
                  <label className="block font-semibold mb-2">Card Number:</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="form-group">
                  <label className="block font-semibold mb-2">Expiry Date:</label>
                  <input
                    type="text"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    placeholder="MM/YY"
                  />
                </div>
                <div className="form-group">
                  <label className="block font-semibold mb-2">CVV:</label>
                  <input
                    type="text"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    placeholder="123"
                  />
                </div>
                <div className="form-group">
                  <label className="block font-semibold mb-2">Card Holder Name:</label>
                  <input
                    type="text"
                    value={cardHolderName}
                    onChange={(e) => setCardHolderName(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    placeholder="Your Name"
                  />
                </div>
                <div className="text-center font-bold">Amount: ${totalAmount.toLocaleString()}</div>
              </>
            )}
            {/* bankTransfer ///////////////////////////////////////////////////
            {paymentMethod === 'bankTransfer' && (
              <>
                <div className="form-group">
                  <label className="block font-semibold mb-2">Reference Number:</label>
                  <input
                    type="text"
                    value={referenceNumber}
                    onChange={(e) => setReferenceNumber(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    placeholder="Reference Number"
                  />
                </div>
                <div className="text-center font-bold">Amount: {totalAmount.toLocaleString()} บาท</div>
              </>
            )} */}

            <button type="submit" className="w-full bg-green-500 text-white p-2 rounded font-semibold hover:bg-green-600 hover:scale-105">
              Submit Payment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaymentPage;