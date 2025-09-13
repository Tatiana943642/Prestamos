import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GamepadIcon, HomeIcon, BookOpenIcon, ClipboardListIcon, HistoryIcon } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-700 text-white' : 'text-gray-300 hover:bg-blue-700 hover:text-white';
  };

  return (
    <header className="bg-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <GamepadIcon size={28} />
            <span>GameLoan UFPS</span>
          </Link>
          
          <nav className="hidden md:flex space-x-1">
            <Link 
              to="/" 
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/')}`}
            >
              <HomeIcon size={18} />
              Inicio
            </Link>
            <Link 
              to="/catalog" 
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/catalog')}`}
            >
              <BookOpenIcon size={18} />
              Catálogo
            </Link>
            <Link 
              to="/loan" 
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/loan')}`}
            >
              <ClipboardListIcon size={18} />
              Préstamo
            </Link>
            <Link 
              to="/inventory" 
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/inventory')}`}
            >
              <ClipboardListIcon size={18} />
              Inventario
            </Link>
            <Link 
              to="/history" 
              className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/history')}`}
            >
              <HistoryIcon size={18} />
              Historial
            </Link>
          </nav>
          
          {/* Menú móvil (hamburguesa) */}
          <div className="md:hidden">
            <button className="p-2 rounded-md text-gray-300 hover:bg-blue-700 hover:text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;