import { Link } from 'react-router-dom';
import { Home, ChefHat, ShoppingBag } from 'lucide-react';

// This component renders the navigation bar for the application
// It includes links to the home page, meal plan page, and shopping list page
// The Home icon is displayed next to the home link

// src/components/layout/Navigationbar.jsx

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-around md:justify-start space-x-8">
        <Link to="/" className="flex flex-col items-center text-emerald-600 font-semibold">
          <Home size={20} />
          <span className='text-xs mt-1'>Home</span>
        </Link>

        <Link to="/meal-plan" className="flex flex-col items-center text-slate-700 hover:text-emerald-600">
          <ChefHat size={20} />
          <span className='text-xs mt-1'>Meal Plan</span>
        </Link>

        <Link to="/shopping-list" className="flex flex-col items-center text-slate-700 hover:text-emerald-600">
          <ShoppingBag size={20} />
          <span className='text-xs mt-1'>Shopping List</span>
        </Link>
      </div>
    </nav>
  );
}