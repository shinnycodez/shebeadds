import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // ✅ import Link
import ProductCard from './ProductCard';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function ShopTheLook() {
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const q = query(collection(db, 'products'), where('isTopProduct', '==', true));
        const querySnapshot = await getDocs(q);
        const topItems = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTopProducts(topItems);
      } catch (err) {
        console.error('Failed to fetch top products:', err);
      }
      setLoading(false);
    };

    fetchTopProducts();
  }, []);

  return (
    <div className="mb-8">
      <h2 className="text-black text-2xl md:text-3xl font-bold leading-tight tracking-[-0.015em] px-4 pb-4 pt-6">
       top sellers ⋆｡𖦹°⭒˚｡⋆
      </h2>

      {loading ? (
        <p className="px-4 text-gray-500">Loading...</p>
      ) : topProducts.length === 0 ? (
        <p className="px-4 text-gray-500">No top products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {topProducts.map(product => (
            <Link to={`/product/${product.id}`} key={product.id}>
              <ProductCard
                title={product.title}
                description={product.description}
                imageUrl={product.coverImage}
                price={`PKR ${product.price}`}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShopTheLook;
