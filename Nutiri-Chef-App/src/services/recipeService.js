// 🔹 Get API key from environment variables
const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

// 🔹 Base URL for the Spoonacular API
const BASE_URL = 'https://api.spoonacular.com';

// 🔹 Map our filter names to Spoonacular's diet parameters
// Spoonacular uses: vegetarian, vegan, glutenFree, ketogenic, etc.
const DIET_FILTERS = {
  vegetarian: 'vegetarian',
  vegan: 'vegan',
  glutenFree: 'glutenFree',
  ketogenic: 'ketogenic',
  paleo: 'paleo',
  lowFodmap: 'lowFodmap',
};

/**
 * Search recipes by query and dietary filters
 * @param {string} query - Search term (e.g., "chicken curry")
 * @param {string[]} activeFilters - Array of filter IDs (e.g., ['vegan', 'keto'])
 * @returns {Promise<Array>} - Array of normalized recipe objects
 */
export const searchRecipes = async (query = '', activeFilters = []) => {
  try {
    // 🔹 Build diet parameters string (e.g., "vegan,ketogenic")
    const dietParams = activeFilters
      .map(filter => DIET_FILTERS[filter])
      .filter(Boolean)
      .join(',');

    // 🔹 Construct the API URL with query and diet parameters
    const url = new URL(`${BASE_URL}/recipes/complexSearch`);
    url.searchParams.append('apiKey', API_KEY);
    url.searchParams.append('number', '12'); // Limit to 12 results
    url.searchParams.append('addRecipeInformtion', 'true'); // Include nutritional info
    url.searchParams.append('includeNutrition', 'true'); // Include nutrition details

    if (query) {
      url.searchParams.append('query', query);
    }

    if (dietParams) {
      url.searchParams.append('diet', dietParams);
    }

    // 🔹 Fetch data from the Spoonacular API
    const response = await fetch(url);

    if (!response.ok) {
        if (response.status === 402) {
            throw new Error(`API key is invalid or has exceeded its usage limit. Please check your API key and try again later.`);
        }
        throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    // 🔹 Normalize Spoonacular data to mtch the mock structure
    return data.results.map(recipe => {
        const nutrients = recipe.nutrition?.nutrients || [];
        const getNutrient = (name) => {
            nutrients.find(n => n.name === name)?.amount || 0;
        };
        
        return {
            id: recipe.id,
            title: recipe.title,
            slug: recipe.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
            image: recipe.image || 'https://picsum.photos/200/300?blur=2&grayscale',
            imageAlt: recipe.title,
            summary: recipe.summary?.replace(/<[^>]*>/g, '') || 'Delicious recipe ready to be cooked.',
            prepTime: recipe.readyInMinutes || 30,
            cookTime: 0, // Spoonacular doesn't provide separate cook time
            totalTime: recipe.readyInMinutes || 30,
            servings: recipe.servings || 2,
            difficulty: 'intermediate', // Spoonacular doesn't provide difficulty, so we set a default
            dietaryTags: [
                ...(recipe.vegetarian ? ['vegetarian'] : []),
                ...(recipe.vegan ? ['vegan'] : []),
                ...(recipe.glutenFree ? ['glutenFree'] : []),
                ...(recipe.ketogenic ? ['ketogenic'] : []),
                ...(recipe.paleo ? ['paleo'] : []),
                ...(recipe.lowFodmap ? ['lowFodmap'] : []),
            ],
            nutrition: {
                calories: getNutrient('Calories'),
                protein: getNutrient('Protein'),
                carbs: getNutrient('Carbohydrates'),
                fat: getNutrient('Fat'),
                fibre: getNutrient('Fiber'),
                sugar: getNutrient('Sugar'),
            },
            ingredients: recipe.nutrition?.ingredients?.map(ing => ({
                name: ing.name,
                amount: ing.amount,
                unit: ing.unit,
            })) || [],
            instructions: recipe.analyzedInstructions?.[0]?.steps?.map(step => step.step) || [],
            rating: recipe.spoonacularScore ? recipe.spoonacularScore / 10 : 4.5,
            reviewCount: 0, // Spoonacular doesn't provide review count
            cuisine: recipe.cuisines?.[0] || 'Unknown',
            mealType: recipe.dishTypes || 'main course',
        };
    });

    } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

/**
 * Get a single recipe by ID
 * @param {number} id - Recipe ID
 * @returns {Promise<Object>} - Normalized recipe object
 */
export const getRecipeById = async (id) => {
  try {
    // 🔹 Construct the API URL for fetching recipe by ID
    const url = new URL(`${BASE_URL}/recipes/${id}/information`);
    url.searchParams.append('apiKey', API_KEY);
    url.searchParams.append('includeNutrition', 'true'); // Include nutritional info

    // 🔹 Fetch data from the Spoonacular API
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`Failed to fetch the recipe: ${response.status}`);
    }

    const recipe = await response.json();

    // 🔹 Normalize Spoonacular data to match the mock structure

    const nutrients = recipe.nutrition?.nutrients || [];
    const getNutrient = (name) => {
        nutrients.find(n => n.name === name)?.amount || 0;
    };
    
    return {
        id: recipe.id,
        title: recipe.title,
        slug: recipe.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, ''),
        image: recipe.image || 'https://picsum.photos/200/300?blur=2&grayscale',
        imageAlt: recipe.title,
        summary: recipe.summary?.replace(/<[^>]*>/g, '') || 'Delicious recipe ready to be cooked.',
        prepTime: recipe.readyInMinutes || 30,
        cookTime: 0, // Spoonacular doesn't provide separate cook time
        totalTime: recipe.readyInMinutes || 30,
        servings: recipe.servings || 2,
        difficulty: 'intermediate', // Spoonacular doesn't provide difficulty, so we set a default
        dietaryTags: [
            ...(recipe.vegetarian ? ['vegetarian'] : []),
            ...(recipe.vegan ? ['vegan'] : []),
            ...(recipe.glutenFree ? ['glutenFree'] : []),
            ...(recipe.ketogenic ? ['ketogenic'] : []),
            ...(recipe.paleo ? ['paleo'] : []),
            ...(recipe.lowFodmap ? ['lowFodmap'] : []),
        ],
        nutrition: {
            calories: getNutrient('Calories'),
            protein: getNutrient('Protein'),
            carbs: getNutrient('Carbohydrates'),
            fat: getNutrient('Fat'),
            fibre: getNutrient('Fiber'),
            sugar: getNutrient('Sugar'),
        },
        ingredients: recipe.nutrition?.ingredients?.map(ing => ({
            name: ing.name,
            amount: ing.amount,
            unit: ing.unit,
        })) || [],
        instructions: recipe.analyzedInstructions?.[0]?.steps?.map(step => step.step) || [],
        rating: recipe.spoonacularScore ? recipe.spoonacularScore / 10 : 4.5,
        reviewCount: 0, // Spoonacular doesn't provide review count
        cuisine: recipe.cuisines?.[0] || 'Unknown',
        mealType: recipe.dishTypes || 'main course',
    };
} catch (error) {
    console.error('Error fetching recipe by ID:', error);
    throw error;
  }
};