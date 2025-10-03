import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-around md:justify-start space-x-8">
        <Link to="/" className="text-emerald-600 font-semibold">HomeAs</Link>
        <Link to="/meal-plan" className="text-slate-700 hover:text-emerald-600">Meal Plan</Link>
        <Link to="/shopping-list" className="text-slate-700 hover:text-emerald-600">Shopping List</Link>
      </div>
    </nav>
  );
}