import { useState, useEffect } from "react";
import SearchBar from "../components/ui/SearchBar";
import DietaryFilters from "../components/ui/DietaryFilters";
import RecipeCard from "../components/ui/RecipeCard";
import { searchRecipes } from "../services/recipeService";

function HomePage() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const results = await searchRecipes(searchQuery, activeFilters);
        setRecipes(results);
      } catch (err) {
        setError(err.message);
        setRecipes([]);
      } finally {
        setIsLoading(false);
      }
    };

    const delay = setTimeout(fetchRecipes, 300);
    return () => clearTimeout(delay);
  }, [searchQuery, activeFilters]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
  };

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold text-text-primary mb-6 text-center" >
        Find Your Perfect Recipe
      </h1>

      <SearchBar onSearch={handleSearch} />

      <DietaryFilters onFilterChange={handleFilterChange} />

      {/* 🔹 Show loading state */}
      {isLoading && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-4 animate-pulse">
              <div className="h-full flex items-center justify-center"></div>
              <div className="h-4 bg-slate-200 rounded mb-2"></div>
              <div className="h-3 bg-slate-200 rounded mb-4"></div>
              <div className="h-8 bg-slate-200 rounded"></div>
            </div>
          ))}
        </div>
      )}

      {/* 🔹 Show error state */}
      {error && (
        <div className="mt-8 text-center text-red-600 bg-red-50 p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* 🔹 Show recipes or mock data */}
      {!isLoading && !error && (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.length > 0 ? (
            recipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))
          ) : (
            <div className="col-span-full text-center text-text-secondary py-12">
              No recipes found. Please try a different search or filter.
            </div>
          )}
        </div>
      )}
      </div>
  );
}

export default HomePage;