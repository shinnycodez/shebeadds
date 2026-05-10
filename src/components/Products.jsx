import React, { useEffect, useState } from 'react';
import Header from './Header';
import SidebarFilters from './SidebarFilters';
import ProductGrid from './ProductGrid';
import Newsletter from './Newsletter';
import Footer from './Footer';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { AiOutlineClose, AiOutlineSearch } from 'react-icons/ai';

function Products() {
  const [filters, setFilters] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const productList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllProducts(productList);
        setFilteredProducts(productList);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Apply search filter whenever searchQuery or allProducts changes
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredProducts(allProducts);
    } else {
      const query = searchQuery.toLowerCase().trim();
      const filtered = allProducts.filter(product => {
        // Search by title
        if (product.title?.toLowerCase().includes(query)) return true;
        
        // Search by description
        if (product.description?.toLowerCase().includes(query)) return true;
        
        // Search by category
        if (product.category?.toLowerCase().includes(query)) return true;
        
        // Search by variations (colors)
        if (product.variations?.some(variation => 
          variation.toLowerCase().includes(query)
        )) return true;
        
        // Search by sizes
        if (product.sizes?.some(size => 
          size.toLowerCase().includes(query)
        )) return true;
        
        return false;
      });
      setFilteredProducts(filtered);
    }
  }, [searchQuery, allProducts]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div
      className="relative flex size-full min-h-screen flex-col bg-[#FFF4EA] group/design-root overflow-x-hidden"
      style={{ fontFamily: '"Noto Serif", "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <Header />

        <div className="gap-1 px-4 md:px-6 flex flex-1 justify-center py-5">
          {/* Sidebar visible only on desktop */}
          <div className="hidden md:block">
            <SidebarFilters onFilterChange={setFilters} />
          </div>

          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            {/* Mobile Categories Header with Filters Button */}
            <div className="flex items-center justify-between md:hidden mb-4">
              <h2 className="text-lg font-semibold">Products</h2>
              <button
                className="bg-black text-white px-3 py-1 rounded-md text-sm"
                onClick={() => setMobileFiltersOpen(true)}
              >
                Filters
              </button>
            </div>

            {/* Search Bar Section */}
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <AiOutlineSearch className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search products by name, category, color, size, or description..."
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black text-base bg-white"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <AiOutlineClose className="h-5 w-5" />
                  </button>
                )}
              </div>
              
              {/* Search Results Info */}
              {searchQuery && (
                <div className="mt-2 text-sm text-gray-600">
                  Found {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} for "{searchQuery}"
                </div>
              )}
            </div>

            {/* Mobile Fullscreen Filter Overlay */}
            {mobileFiltersOpen && (
              <div className="fixed inset-0 z-50 bg-white p-4 overflow-y-auto md:hidden">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="text-gray-500"
                  >
                    <AiOutlineClose className="w-6 h-6" />
                  </button>
                </div>
                <SidebarFilters onFilterChange={setFilters} onClose={() => setMobileFiltersOpen(false)} />
              </div>
            )}

       
<ProductGrid products={filteredProducts} filters={filters} searchQuery={searchQuery} />
            {/* No results message */}
            {filteredProducts.length === 0 && !searchQuery && (
              <div className="text-center py-12">
                <p className="text-gray-600">No products available.</p>
              </div>
            )}
            
            {filteredProducts.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-2">No products found matching "{searchQuery}".</p>
                <button
                  onClick={clearSearch}
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;