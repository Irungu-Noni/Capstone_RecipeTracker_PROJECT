function RecipeCard({ recipe }) {
    const {
        title,
        summary,
        image = "https://picsum.photots/300/200?blur=2",
        totalTime,
        rating,
        dietaryTags = []
    } = recipe;

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="h-48 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                    onError={(event) => {
                        event.target.src = "https://picsum.photos/300/200?blur=2&grayscale";
                    }}
                />
            </div>

            <div className="p-4">
                <h3 className="font-semibold text-text-primary text-lg mb-2 line-clamp-2">{title}</h3>

                <p className="text-text-secondary text-sm mb-3 line-clamp">{summary}</p>

                <div className="flex flex-warp gap-1 mb-3">{dietaryTags.map((tag, index) => (
                    <span
                        key={index}
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                            tag === 'Vegan'
                                ? 'bg-success text-white'
                                : tag === 'Vegetarian'
                                ? 'bg-accent text-text-primary'
                                : tag === 'Gluten-Free'
                                ? 'bg-info text-white'
                                : tag === 'Keto'
                                ? 'bg-keto text-white'
                                : 'bg-slate-200 text-slate-700'
                        }
                        `}
                    >
                        {tag}
                    </span>
                    ))}
                </div>

                <div>
                    <span>⭐ {rating}</span>
                    <span className="mx-2">•</span>
                    <span>{totalTime} mins</span>
                </div>

                <button className="w-full py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-secondary transition-colors">
                    View Recipe
                </button>
            </div>
        </div>
    );
}

export default RecipeCard;