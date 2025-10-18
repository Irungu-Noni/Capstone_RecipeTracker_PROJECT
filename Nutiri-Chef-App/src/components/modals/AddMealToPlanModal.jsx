import { useState } from "react";

// Defining the days and meal types
const DAYS_OF_THE_WEEK = [
    { id: 'monday', label: 'Monday' },
    { id: 'tuesday', label: 'Tuesday' },
    { id: 'wednesday', label: 'Wednesday' },
    { id: 'thursday', label: 'Thursday' },
    { id: 'friday', label: 'Friday' },
    { id: 'saturday', label: 'Saturday' },
    { id: 'sunday', label: 'Sunday' }
];

const MEAL_TYPES = [
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'dinner', label: 'Dinner' }
];

function AddMealToPlanModal({
    isOpen,
    onClose,
    onAdd,
    recipeTitle
}) {
    // local state for form
    const [selectedDay, setSelectedDay] = useState('monday');
    const [selectedMeal, setSelectedMeal] = useState('lunch');

    // Handling form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        onAdd(selectedDay, selectedMeal);
        onClose();
    };

    // don't render if not open
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={onClose} // close when cicking backdrop
        >
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md" onClick={(event) => event.stopPropagation()} // Preventing closing when clicking modal
            >
                <div className="border-b border-slate-200 p-5">
                    <h2 className="text-xl font-bold text-text-primary">Add to Your Meal Plan</h2>
                    <p>Choose when to cook <span className="font-medium">{recipeTitle}</span>
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-5">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-1">
                                Day
                            </label>
                            <select value={selectedDay} onChange={(event) => setSelectedDay(event.target.value)} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" aria-label="Select day">{DAYS_OF_THE_WEEK.map(day => (
                                <option key={day.id} value={day.id}>
                                    {day.label}
                                </option>
                            ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-primary">
                                Meal
                            </label>
                            <select value={selectedMeal} onChange={(event) => setSelectedMeal(event.target.value)} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" aria-label="Select meal type">{MEAL_TYPES.map(meal => (
                                <option key={meal.id} value={meal.id}>
                                    {meal.label}
                                </option>
                            ))}
                            </select>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end space-x-3">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-text-primary hover:bg-slate-100 rounded-lg transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-secondary transition-colors font-medium">Add to Plan</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddMealToPlanModal;