// src/utils/shoppingListUtils.js

/**
 * Generate a deduplicated shopping list from recipes
 * @param {Array} recipes - Array of recipe objects
 * @returns {Array} - Deduplicated ingredients with summed amounts
 */

export const generateShoppingList = (recipes) => {
    const ingredientMap = new Map();

    recipes.forEach(recipe => {
        recipe.ingredients?.forEach(ing => {
            const key = ing.name.toLowerCase().trim();

            if (ingredientMap.has(key)) {
                // Sum amounts if units match
                if (ingredientMap.get(key).unit === ing.unit) {
                    ingredientMap.get(key).amount += ing.amount;
                } else {
                    // Different units? keep original (or handle conversion later)
                    console.warn(`Different units for ${ing.name}: ${ingredientMap.get(key).unit} vs ${ing.unit}`);
                }
            } else {
                // First occurrence
                ingredientMap.set(key, {
                    name: ing.name,
                    amount: ing.amount,
                    unit: ing.unit
                });
            }
        });
    });

    // convert to array and sort alphabetically
    return Array.from(ingredientMap.values())
        .sort((a, b) => a.name.localeCompare(b.name));
};