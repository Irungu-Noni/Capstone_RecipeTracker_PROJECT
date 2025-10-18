# 🥗 Nutri-Chef Recipe App 

# ------------------------------WEEK THREE---------------------------------------------

> A recipe app focused on **nutrition, personalization, and simplicity**.  
> Week 1: Responsive UI with mock data ✨

## 🎯 Why This Stands Out
- **Unique palette**: Sage green (`#6B9E78`) + terracotta (`#D4A574`) — earthy, not generic  
- **Performance-first**: Debounced search, `key` props, and `line-clamp` for stable grids  
- **Accessible by default**: `aria-pressed`, semantic colors, AAA contrast  

## 🧩 Core Components

### 🔍 `SearchBar`
- **Debounced input** (300ms) to prevent API spam  
- Clear button with fallback image handling  
- *“Debouncing respects both the user’s intent and the server’s limits.”*

### 📇 `RecipeCard`
- **`summary` field** for engaging previews (not just titles!)  
- Dietary tags with **semantic colors** (Vegan = seafoam, Keto = dusty rose)  
- Consistent heights via **`line-clamp-2/3`**  
- *“Generic cards feel soulless. A great summary turns a recipe into an invitation.”*

### 🥗 `DietaryFilters`
- Toggle buttons with **`aria-pressed`** for accessibility  
- Active = `bg-primary`, inactive = subtle border + hover  
- *“Accessibility isn’t extra—it’s foundational.”*

## 🔑 Technical Nuances

> **The `key` Prop**  
> “I set `key={recipe.id}` in the grid—critical for React’s reconciliation. Without it, lists flicker on every update.”

> **Clean Code**  
> “Removed unused destructured variables (like `id` in `RecipeCard`) to eliminate noise. If it’s not used, it’s clutter.”

> **Mock Data with Purpose**  
> “Every field (`nutrition`, `ingredients`, `slug`) maps to a future feature—ensuring realism without over-engineering.”

## 📂 Project Structure
src/
├── components/ui/ # Reusable: SearchBar, RecipeCard, DietaryFilters
├── pages/ # Views: HomePage
├── data/ # MockRecipes.js (realistic, structured)
└── ...

https://docs.google.com/document/d/1wxhNcDdPCqQrUGtWK_dodqAmD23lbtlOKiO4BQ2HJKg/edit?usp=sharing - WEEK THREE DOCUMENTATION

# ------------------------------WEEK FOUR---------------------------------------------

> Week 2: Real API integration with dynamic search, filters, and detail view ✨

## 🔌 Why Spoonacular?
- **Structured data**: Nutrition, ingredients, dietary flags in one call
- **Free tier**: 150 requests/day (enough for dev + demo)
- **Dietary filters**: `vegan`, `ketogenic`, `glutenFree` built-in
- **Nutrition focus**: Calories + macros via `includeNutrition=true`

> “Gemini is an AI model—not a recipe database. Spoonacular gave me the structured data my app needed.”

## ⚙️ Core Features

### 🔍 Dynamic Homepage
- **Live search** with debouncing (300ms)
- **Dietary filters** (Vegan, Keto, etc.) with real-time API calls
- **Loading skeletons** with natural text flow (`w-3/4`, `w-5/6`)
- **Empty states** for no results

### 📇 Recipe Detail Page
- **Nutrition panel**: Color-coded macros (calories, protein, carbs, fat)
- **Structured ingredients**: `{amount} {unit} {name}`
- **Numbered instructions**: Clear step-by-step cooking guide
- **“Add to Meal Plan”**: Placeholder for Week 3

## 🔑 Technical Nuances

> **Nutrition Handling**  
> “Spoonacular’s free tier returns calories reliably but often omits protein/carbs. I implemented defensive rendering to show only available data.”

> **Skeleton Best Practices**  
> “Varying line widths (`w-3/4`, `w-5/6`) mimic natural text flow—reducing perceived load time.”
> **Error Resilience**  
> “User-friendly messages for rate limits (402) and network errors prevent blank screens.”

## 📂 Project Structure
src/
├── services/recipeService.js # API abstraction + data normalization
├── pages/HomePage.jsx # Dynamic search + filters
├── pages/RecipeDetailPage.jsx # Nutrition-focused detail view
└── ...

https://docs.google.com/document/d/1Juo052CqyO222VO4dGPJoeGi7auM5bp7dGpv2lPd7f0/edit?usp=sharing - WEEK FOUR DOCUMENTATION

# ------------------------------WEEK FIVE---------------------------------------------

> **A personalized recipe planner that helps you eat healthier without the guesswork.**  
> Final assessment project with meal planning, nutrition tracking, and smart shopping lists.

## 🌟 Why This Stands Out
- **Central Selling Point**: Weekly meal planner + **deduplicated shopping list** (200g chicken + 100g chicken = 300g chicken)
- **Nutrition-First**: Calories + macros on every recipe
- **Personalized**: Dietary filters (Vegan, Keto, Gluten-Free) + persistent planning
- **Professional UX**: Loading skeletons, error resilience, and accessibility-first design

## 🚀 Core Features
### 🔍 Dynamic Recipe Discovery
- Real recipes from Spoonacular API
- Search by ingredient or dish name
- Dietary filters with instant results

### 📅 Weekly Meal Planner
- Plan meals for Mon–Sun (breakfast/lunch/dinner)
- Persistent storage (survives refreshes)
- Empty slots show “+ Add Recipe”

### 🛒 Smart Shopping List
- **Auto-generated** from your meal plan
- **Deduplicates ingredients** by name + sums amounts
- Check off items as you shop (persistent state)
- Alphabetically sorted for easy scanning

### 📊 Nutrition Focus
- Calories, protein, carbs, fat per serving
- Color-coded macros (protein = green, fat = red)
- Defensive rendering for free-tier API limitations

## 🛠️ Tech Stack
- **Frontend**: React, Vite, React Router
- **Styling**: Tailwind CSS (custom sage/terracotta palette)
- **State**: Zustand + localStorage persistence
- **API**: Spoonacular (nutrition-focused recipes)
- **Icons**: Lucide React (clean, lightweight)

## 📂 Project Structure
src/
├── components/
│ ├── layout/ # Navbar
│ └── modals/ # AddToMealPlanModal
├── pages/ # HomePage, RecipeDetailPage, MealPlanPage, ShoppingListPage
├── services/ # recipeService.js (API abstraction)
├── store/ # useMealPlanStore.js (Zustand + persistence)
└── utils/ # shoppingListUtils.js (deduplication logic)

https://docs.google.com/document/d/1cWAztjXvLlTFq0lQdW_GW-khW-VA4bX2qGUDk8akVWg/edit?usp=sharing - WEEK FIVE DOCUMENTATION