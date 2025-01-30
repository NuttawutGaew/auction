'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

function BidPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      // Fetch product data based on id
      fetch(`http://localhost:3000/api/products/${id}`)
        .then(response => response.json())
        .then(data => setProduct(data))
        .catch(error => console.error('Error fetching product:', error));
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>Current Bid: {product.currentBid}</p>
    </div>
  );
}

export default BidPage;