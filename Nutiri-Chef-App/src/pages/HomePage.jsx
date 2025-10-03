import SearchBar from "../components/ui/SearchBar";
import DietaryFilters from "../components/ui/DietaryFilters";
import RecipeCard from "../components/ui/RecipeCard";
import { mockRecipes } from "../data/mockRecipes";

function HomePage() {
  const handleSearch = (query) => {
    console.log('Searching for:', query)
  };

  const handleFilterChange = (filters) => {
    console.log('Active filters:', filters);
    // Later: filter recipes or call API with these filters
  }

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold text-text-primary mb-6 text-center" >
        Find Your Perfect Recipe
      </h1>

      <SearchBar onSearch={handleSearch} />

      <DietaryFilters onFilterChange={handleFilterChange} />

      <div className="mt-6 grid grid-cols-1 sm:grid-cols lg:grid-cols-3 gap-6">
        {mockRecipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;