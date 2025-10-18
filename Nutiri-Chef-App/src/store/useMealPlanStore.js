import { create } from "zustand";
import { persist } from 'zustand/middleware';

// 🔹 Defining the initial meal plan structure
// Days: monday, tuesday, ..., sunday
// Meals: breakfast, lunch, dinner
const initialPlan = {
    monday: { breakfast: null, lunch: null, dinner: null },
    tuesday: { breakfast: null, lunch: null, dinner: null },
    wednesday: { breakfast: null, lunch: null, dinner: null },
    thursday: { breakfast: null, lunch: null, dinner: null },
    friday: { breakfast: null, lunch: null, dinner: null },
    saturday: { breakfast: null, lunch: null, dinner: null },
    sunday: { breakfast: null, lunch: null, dinner: null }
};

// Creating the store with persistence
export const useMealPlanStore = create(
    persist(
        (set, get) => ({
            // 🔸 State: the current meal plan
            plan: initialPlan,

            // 🔸 State: checked items in the shopping list
            checkedItems: {},

            // 🔸 Action: Adding a recipe to a specific day/meal slot
            addRecipeToSlot: (day, mealType, recipe) => {
                set((state) => ({
                    plan: {
                        ...state.plan,
                        [day]: {
                            ...state.plan[day],
                            [mealType]: recipe
                        }
                    }
                }));
            },

            // 🔸 Action: Removing a recipe from a slot
            removeRecipeFromSlot: (day, mealType) => {
                set((state) => ({
                    plan: {
                        ...state.plan,
                        [day]: {
                            ...state.plan[day],
                            [mealType]: null
                        }
                    }
                }));
            },

            // 🔸 Action: Clearing the entire plan
            clearPlan: () => {
                set({ plan: initialPlan });
            },

            // 🔸 Selector: Getting all recipes in the plan (for shopping list)
            getAllRecipes: () => {
                const plan = get().plan;
                const recipes = [];
                for (const day in plan) {
                    for (const mealType in plan[day]) {
                        if (plan[day][mealType]) {
                            recipes.push(plan[day][mealType]);
                        }
                    }
                }
                return recipes;
            },

            // 🔸 Action: Toggling checked state of an item in the shopping list
            toggleCheckedItem: (ingredientName) => {
                set((state) => ({
                    checkedItems: {
                        ...state.checkedItems,
                        [ingredientName]: !state.checkedItems[ingredientName]
                    }
                }));
            },

            // 🔸 Action: Clearing all checked items in the shopping list
            clearCheckedItems: () => {
                set({ checkedItems: {} });
            }
        }),
        {
            name: 'meal-plan-storage', // localStorage key
            partialize: (state) => ({ plan: state.plan, checkedItems: state.checkedItems }) // perit checked items
        }
    )
);