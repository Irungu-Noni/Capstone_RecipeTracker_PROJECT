import { Link } from 'react-router-dom';
import { useMealPlanStore } from '../store/useMealPlanStore';

const DAYS_OF_THE_WEEK = [
  { id: 'monday', label: 'Monday' },
  { id: 'tueday', label: 'Tuesday' },
  { id: 'wednesday', label: 'Wednesday' },
  { id: 'thursday', label: 'Thursday' },
  { id: 'friday', label: 'Friday' },
  { id: 'saturday', label: 'Saturday' },
  { id: 'sunday', label: 'Sunday' }
];

const MEAL_TYPES = [
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'lunch', label: 'Lunch' },
  { id: 'dinner', label: 'Dinner' },
];

// reusable meal slot component
function MealSlot({ recipe }) {
  if (recipe) {
    return (
      <Link to={`/recipe/${recipe.id}`} className='block'>
        <div className='bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition-shadow'>
          <h3 className='font-medium text-text-primary text-sm line-clamp-2 mb-1'>
            {recipe.title}
          </h3>
          <div className='flex items-center text-text-secondary text-xs'>
            <span>{recipe.totalTime} mins</span>
          </div>
        </div>
      </Link>
    );
  }

  // empty slot: showing "Add" button
  return (
    <Link to="/" className='block'>
      <div className='bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg p-3 text-center hover:border-primary transition-colors'>
        <span className='text-text-secondary text-sm'>+ Add Recipe</span>
      </div>
    </Link>
  );
}

function MealPlanPage() {
  const { plan } = useMealPlanStore();

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='max-w-6xl mx-auto'>
        <div className='mb-8 text-center'>
          <h1 className='text-2xl font-bold text-text-primary'>Your Weekly Meal Plan</h1>
          <p className='text-text-secondary mt-2'>
            Click a slot to add a recipe, or click a recipe to view details.
          </p>
        </div>

        {DAYS_OF_THE_WEEK.map(day => {
          const dayPlan = plan[day.id] || { breakfast: null, lunch: null, dinner: null };

          return (
            <div key={day.id} className='text-center'>
              <h2 className='font-bold text-text-primary mb-3'>{day.label}</h2>
              <div className='space-y-3'>
                {MEAL_TYPES.map(meal => (
                  <MealSlot
                    key={meal.id}
                    recipe={dayPlan[meal.id] || null}
                  />
                ))}
              </div>
            </div>
          );
        })}

        {Object.values(plan).every(day => Object.values(day).every(recipe => !recipe) ) && (
          <div className='text-center py-12'>
            <div className='text-text-secondary'>
              Your meal plan is empty.
            </div>
            <Link to="/" className='inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors'>
              Find Recipes to Plan
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default MealPlanPage;