import { useState } from "react";

const dietary_options = [
    { id: 'vegan', label: 'Vegan' },
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'gluten-free', label: 'Gluten-Free' },
    { id: 'keto', label: 'Keto' }
];

function DietaryFilters({ onFilterChange }) {
    const [activeFilters, setActiveFilters] = useState([]);

    const toggleFilter = (filterId) => {
        let newFilters;

        if (activeFilters.includes(filterId)) {
            newFilters = activeFilters.filter(id => id !== filterId);
        } else {
            newFilters = [...activeFilters, filterId]
        }

        setActiveFilters(newFilters);

        onFilterChange(newFilters);
    };

    return (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
            {dietary_options.map(option => (
                <button 
                    key={option.id}
                    onClick={() => toggleFilter(option.id)}
                    className={`px-3 py-1.5 text-sum font-medium rounded-full transition-colors ${
                        activeFilters.includes(option.id) ? 'bg-primary text-white' : 'bg-white text-text-primary border border-slate-300 hover:bg-slate-50'
                    }
                    `}
                    aria-pressed={activeFilters.includes(option.id)}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}

export default DietaryFilters;