import { useEffect, useMemo } from "react";
import { useMealPlanStore } from "../store/useMealPlanStore";
import { generateShoppingList } from "../utils/shoppingListUtils";

function ShoppingListPage() {
  const { plan, checkedItems, toggleCheckedItem, clearCheckedItems } = useMealPlanStore();

  const allRecipes = useMemo(() => {
    const recipes = [];
    for (const day in plan) {
      for (const meal in plan[day]) {
        if (plan[day][meal]) {
          recipes.push(plan[day][meal]);
        }
      }
    }
    return recipes;
  }, [plan]);

  // Generate deduplicated shopping list
  const shoppingList = useMemo(() => {
    return generateShoppingList(allRecipes);
  }, [allRecipes]);

  // clear checked items when the plan changes
  useEffect(() => {
    if (shoppingList.length === 0) {
      clearCheckedItems();
    }
  }, [shoppingList.length, clearCheckedItems]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-text-primary">Shopping List</h1>
          <p className="text-text-secondary mt-2">{shoppingList.length > 0 ? `You neeed ${shoppingList.length} items for your planned meals.` : 'Plan some meals first to generate a shopping list!'}</p>

          {shoppingList.length > 0 && (
            <button onClick={clearCheckedItems} className="mt-4 text-sm text-primary hover:text-secondary transition-colors">Clear Checked Items</button>
          )}
        </div>

        {shoppingList.length > 0 ? (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <ul className="divide-y divide-slate-100">{shoppingList.map((item, index) => {
              const isChecked = checkedItems[item.name] || false;
              return (
                <li key={index} className={`p-4 flex items-start ${isChecked ? 'opacity-70' : ''}`}>
                  <input type="checkbox" id={`item-${index}`} checked={isChecked} onChange={() => toggleCheckedItem(item.name)} className="mt-1 h-5 w-5 text-primary rounded focus:ring-primary" />
                  <label htmlFor={`item-${index}`} className={`ml-3 flex-1 ${isChecked ? 'line-through text-text-secondary' : 'text-text-primary'}`}><span className="font-medium">{item.amount} {item.unit}</span> {item.name}</label>
                </li>
              );
            })}</ul>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="text-text-secondary mb-4">
              🛒 Your shopping list is empty.
            </div>
            <p className="text-sm text-text-secondary mb-6">Add recipes to your meal plan, and we'll generate a smart shopping list for you!</p>
            <a href="/meal-plan" className="inline-block bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition-colors">Go to Meal Plan</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShoppingListPage;