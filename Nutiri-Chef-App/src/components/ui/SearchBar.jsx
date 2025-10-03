import { useState, useEffect, useRef } from "react";

function SearchBar({ onSearch, placeholder = "Search recipes or ingredients..." }) {
    const [searchTerm, setSearchTerm] = useState('');

    const debounceRef = useRef(null);

    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        if (searchTerm.trim() === '') {
            onSearch('');
            return;
        }

        debounceRef.current = setTimeout(() => {
            onSearch(searchTerm.trim())
        }, 300);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [searchTerm, onSearch]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleClear = () => {
        setSearchTerm('');
    };

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full px-4 py-3 pr-10 text-text-primary bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                aria-label="Search recipes" />

            {searchTerm && (
                <button
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 transform-translate-y-1/2 text-text-secondary hover:text-text-primary focus:outline-none"
                    aria-label="Clear search">✕
                </button>
            )}
        </div>
    );
}

export default SearchBar;