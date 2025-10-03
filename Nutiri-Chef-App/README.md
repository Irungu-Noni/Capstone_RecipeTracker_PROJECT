# 🥗 Nutri-Chef Recipe App — Week 3

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