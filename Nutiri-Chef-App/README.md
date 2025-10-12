# 🥗 Nutri-Chef Recipe App 

# ------------------------------WEEK THREE---------------------------------------------

> A recipe app focused on **nutrition, personalization, and simplicity**.  
> Week 1: Responsive UI with mock data ✨

![Week 1 Homepage](https://via.placeholder.com/800x400/FBF9F5/2D312F?text=Responsive+Recipe+Grid) <!-- Replace with screenshot later -->

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

# ------------------------------WEEK FOUR---------------------------------------------

> Week 2: Real API integration with dynamic search, filters, and detail view ✨

![Week 2 Demo](https://via.placeholder.com/800x400/FBF9F5/2D312F?text=Real+Recipes+with+Nutrition) <!-- Replace with screenshot -->

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