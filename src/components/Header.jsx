import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import Cart from './Cart';

const Header = () => {
  const [user] = useAuthState(auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
    }
  };

  const adminEmails = ["mueezimran1@gmail.com", "marhamaqeel2023@gmail.com"];

  return (
    <>
      <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#FFF4EA] bg-[#FFF4EA] px-4 md:px-10 py-3 relative">
        <div className="flex items-center gap-4 md:gap-8">
          <Link to="/" className="flex items-center gap-2 md:gap-4 text-[#141414]">
<h2 className="font-serif text-xl md:text-2xl italic tracking-wide text-[#141414]">
  Shebeadds
</h2>
          </Link>

          <div className="hidden md:flex items-center gap-5 lg:gap-9">
            <Link to="/" className="text-[#141414] text-sm font-medium transition">Home</Link>
            <Link to="/products?category=Bracelets" className="text-[#141414] text-sm font-medium transition">Bracelets ˚⊹♡</Link>
            <Link to="/products?category=Pendants" className="text-[#141414] text-sm font-medium  transition">
Pendants ⋆｡𖦹°</Link>
            <Link to="/products?category=Earrings" className="text-[#141414] text-sm font-medium  transition">Earrings ˚⋆𐙚｡</Link>
            <Link to="/products?category=Phone charms" className="text-[#141414] text-sm font-medium  transition">Phone charms˚⋆𐙚｡</Link>
            {adminEmails.includes(user?.email) && (
              <Link to="/admin" className="text-[#141414] text-sm font-medium hover:text-[#0c77f2] transition">Admin</Link>
            )}
          </div>
        </div>

        <div className="flex flex-1 justify-end gap-4 md:gap-8">
          <label className="hidden md:flex flex-col min-w-40 !h-10 max-w-64">
            <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
              <div className="text-neutral-500 flex border-none bg-[#
#FFF4EA] items-center justify-center pl-4 rounded-l-lg border-r-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                </svg>
              </div>
              <input
                placeholder="Search"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#141414] focus:outline-0 focus:ring-0 border-none bg-[
#FFF4EA] focus:border-none h-full placeholder:text-neutral-500 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
              />
            </div>
          </label>

          <div className="hidden md:flex gap-2 items-center">
            <button onClick={() => setIsCartOpen(true)} className="flex items-center justify-center px-4 h-10 rounded-lg bg-[
#FFF4EA] text-[#141414] hover:bg-[#FFDCDC] transition">🛒 Cart</button>
            {user ? (
              <>
                <button onClick={handleLogout} className="px-4 h-10 rounded-lg bg-[#
#FFF4EA] text-[#141414] text-sm font-semibold hover:bg-[#
#FFF4EA] transition">Logout</button>
                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#FFE9DD]"
                  style={{
                    backgroundImage: user.photoURL
                      ? `url("${user.photoURL}")`
                      : 'url("https://www.gravatar.com/avatar/default?s=200&d=mp")'
                  }}
                />
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center justify-center px-4 h-10 rounded-lg bg-[
#FFF4EA] text-white text-sm font-semibold hover:opacity-90 transition"
              >
                <p className='text-black'>Login</p>
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button onClick={() => setIsCartOpen(true)} className="h-10 w-10 rounded-lg bg-[#
#FFF4EA]">🛒</button>
            <button onClick={toggleMenu} className="h-10 w-10 rounded-lg bg-[
#FFF4EA]">
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50 border-t border-[#ededed]">
            <div className="px-4 py-2 space-y-2">
              <div className="flex items-center gap-2 rounded-lg bg-[#FFE9DD] px-3 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#666" viewBox="0 0 256 256">
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent border-none focus:outline-none w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearchSubmit()}
                />
                <button onClick={handleSearchSubmit} className="text-[#141414] hover:text-[#0c77f2]" aria-label="Search">
                  🔍
                </button>
              </div>

              <Link to="/products?category=Bracelets" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 hover:bg-[#FFE9DD] rounded-lg transition">Bracelets ˚⊹♡</Link>
              <Link to="/products?category=Pendants" onClick={() => setIsMenuOpen(false)} className="blocsk px-4 py-3 hover:bg-[#FFE9DD] rounded-lg transition">Pendants ⋆｡𖦹°
</Link>
              <Link to="/products?category=Earrings" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 hover:bg-[#FFE9DD] rounded-lg transition">
Earrings˚⋆𐙚｡
</Link>
              <Link to="/products?category=Phone charms" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 hover:bg-[#FFE9DD] rounded-lg transition">Phone charms ｡°✩
</Link>

              {adminEmails.includes(user?.email) && (
                <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 hover:bg-[#FFE9DD] rounded-lg transition">Admin</Link>
              )}

              <div className="pt-2 border-t border-gray-200">
                {user ? (
                  <>
                    <div className="flex items-center px-4 py-3 space-x-3">
                      <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#FFE9DD]" style={{
                        backgroundImage: user.photoURL
                          ? `url("${user.photoURL}")`
                          : 'url("https://www.gravatar.com/avatar/default?s=200&d=mp")'
                      }}></div>
                      <div>
                        <p className="font-medium text-[#141414]">{user.displayName || user.email}</p>
                      </div>
                    </div>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-red-600 hover:bg-[#] rounded-lg transition">Logout</button>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-[#141414] hover:bg-[#FFE9DD] rounded-lg transition font-medium">Login</Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
