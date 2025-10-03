export const mockRecipes = [
  {
    id: 1,
    title: "Creamy Mushroom Risotto",
    slug: "creamy-mushroom-risotto",
    image: "https://picsum.photos/300/200?blur=2&grayscale",
    imageAlt: "Creamy mushroom risotto in a white ceramic bowl",
    summary: "A comforting Italian classic with earthy mushrooms and Parmesan. Ready in 30 minutes!",
    prepTime: 10,
    cookTime: 20,
    totalTime: 30,
    servings: 2,
    difficulty: "Intermediate",
    dietaryTags: ["Vegetarian", "Gluten-Free"],
    nutrition: {
      calories: 420,
      protein: 12,
      carbs: 58,
      fat: 18,
      fiber: 3,
      sugar: 2
    },
    ingredients: [
      { name: "arborio rice", amount: 1, unit: "cup" },
      { name: "mushrooms", amount: 200, unit: "g" },
      { name: "vegetable stock", amount: 1, unit: "L" },
      { name: "Parmesan cheese", amount: 50, unit: "g" },
      { name: "butter", amount: 2, unit: "tbsp" }
    ],
    instructions: [
      "Heat stock in a saucepan; keep warm.",
      "Melt butter, sauté mushrooms until golden.",
      "Add rice, toast 2 minutes.",
      "Add stock one ladle at a time, stirring.",
      "Stir in Parmesan. Season and serve."
    ],
    rating: 4.7,
    reviewCount: 128,
    cuisine: "Italian",
    mealType: ["Dinner"]
  },
  // ... add more recipes with similar structure
];