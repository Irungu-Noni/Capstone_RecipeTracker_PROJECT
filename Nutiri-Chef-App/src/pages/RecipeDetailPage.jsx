import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getRecipeById } from '../services/recipeService';
import { useMealPlanStore } from '../store/useMealPlanStore';
import AddToMealPlanModal from '../components/modals/AddToMealPlanModal';

// Days constant for alert message
const DAYS_OF_THE_WEEK = [
  { id: 'monday', label: 'Monday' },
  { id: 'tuesay', label: 'Tuesday' },
  { id: 'wednesday', label: 'Wednesday' },
  { id: 'thursday', label: 'Thursday' },
  { id: 'friday', label: 'Friday' },
  { id: 'saturday', label: 'Saturday' },
  { id: 'sunday', label: 'Sunday' }
];

function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { addRecipeToSlot } = useMealPlanStore();

  useEffect(() => {
    const fetchRecipe = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const recipeId = parseInt(id, 10);
        if (isNaN(recipeId)) {
          throw new Error('Invalid recipe ID');
        }

        const recipeData = await getRecipeById(recipeId);
        setRecipe(recipeData);
      } catch (err) {
        console.error('Error fetching recipe:', err);
        setError(err.message || 'Failed to load recipe');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
            <div className="h-64 bg-slate-200 rounded-lg mb-6"></div>
            <div className="h-8 bg-slate-200 rounded mb-4"></div>
            <div className="h-4 bg-slate-200 rounded mb-2 w-3/4"></div>
            <div className="space-y-3 mt-8">
              <div className="h-4 bg-slate-200 rounded"></div>
              <div className="h-4 bg-slate-200 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  };

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-100 text-red-800 p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Ooop!! Recipe not found</h2>
            <p>{error}</p>
            <Link to="/" className="mt-4 inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors">
              Back to Recipes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center text-text-primary hover:text-primary mb-6">
          &larr; Back to Recipes
        </Link>

        <div className="rounded-xl overflow-hidden shadow-md mb-6">
          <img
            src={recipe.image}
            alt={recipe.title}
            className='w-full h-80 md:h-96 object-cover'
            onError={(event) => {
              event.target.src = "https://picsum.photos/800/400?blur=2&grayscale";
            }} />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-text-primary mb-2">
              {recipe.title}
            </h1>

            <div className="flex flex-wrap gap-2 mb-4">
              {recipe.dietaryTags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 text-sm font-medium rounded-full ${tag === 'Vegan' ? 'bg-success text-white' : tag === 'Vegetarian' ? 'bg-accent text-text-primary' : tag === 'Gluten-Free' ? 'bg-info text-white' : tag === 'Keto' ? 'bg-keto text-white' : 'bg-slate-200 text-slate-700'}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center text-text-secondary text-sm">
              <span>⭐ {recipe.rating.toFixed(1)}</span>
              <span className="mx-2">•</span>
              <span>{recipe.totalTime} mins</span>
              <span>Serves {recipe.servings}</span>
            </div>
          </header>

          {recipe.nutrition.calories > 0 && (
            <section className="mb-8 p-4 bg-slate-50 rounded-lg">
              <h2 className="text-lg font-semibold text-text-primary mb-3">Nutrition (per serving)</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <NutritionItem
                  label="Calories"
                  value={Math.round(recipe.nutrition.calories)}
                  unit="kcal"
                  color="text-amber-600"
                />
                {recipe.nutrition.protein > 0 && (
                  <NutritionItem
                    label="Protein"
                    value={Math.round(recipe.nutrition.protein)}
                    unit="g"
                    color="text-success"
                  />
                )}
                {recipe.nutrition.carbs > 0 && (
                  <NutritionItem
                    label="Carbs"
                    value={Math.round(recipe.nutrition.carbs)}
                    unit="g"
                    color="text-amber-500"
                  />
                )}
                {recipe.nutrition.fat > 0 && (
                  <NutritionItem
                    label="Fat"
                    value={Math.round(recipe.nutrition.fat)}
                    unit="g"
                    color="text-red-600"
                  />
                )}
              </div>
            </section>
          )}

          <div className='mb-8'>
            <button
              onClick={() => setIsModalOpen(true)} 
              className="w-full md:w-auto px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-secondary transition-colors">Add to Meal Plan</button>

              {isModalOpen && (
                <AddToMealPlanModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  onAdd={(day, mealType) => {
                    addRecipeToSlot(day, mealType, recipe);
                    const dayLabel = DAYS_OF_THE_WEEK.find(d => d.id === day)?.label || day;
                    alert(`Added to ${dayLabel} ${mealType}`);
                  }}
                  recipeTitle={recipe.title}
                />
              )}
          </div>

          <section className="mb-8">
            <h2 className="text-xl font-bold text-text-primary mb-4">
              Ingredients
            </h2>
            <ul className='space-y-2'>{recipe.ingredients.length > 0 ? (
              recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-text-primary mr-2">•</span>
                  <span className="text-text-primary">
                    {ingredient.amount} {ingredient.unit} {ingredient.name}
                  </span>
                </li>
              ))
            ) : (
              <li className="text-text-secondary">No ingredients found or listed.</li>
              )}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-primary mb-4">Instructions</h2>
            {recipe.instructions.length > 0 ? (
              <ol className="space-y-3">
                {recipe.instructions.map((step, index) => (
                  <li key={index} className="flex">
                    <span className="font-medium text-primary mr-3 flex-shrink-0">{index + 1}.</span>
                    <span className="text-text-primary">{step}</span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-text-secondary">No instructions available.</p>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

function NutritionItem({ label, value, unit, color }) {
  return (
    <div className='text-center'>
      <div className={`text-lg font-bold ${color}`}>
        {value}
      </div>
      <div className='text-x5 text-text-secondary mt-1'>
        {label} {unit}
      </div>
    </div>
  );
}

export default RecipeDetailPage;