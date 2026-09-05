import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favorites, setFavorites] = useState(() => {
  const savedFavorites = localStorage.getItem("foodieFavorites");
  return savedFavorites ? JSON.parse(savedFavorites) : [];
});
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/recipes?limit=0")
      .then((response) => response.json())
      .then((data) => {
        const extraRecipies = [
          {
            id: 101,
            name: "Chinese Fried Rice",
            cuisine: "Chinese",
            ingredients: [
              "2 cups cooked rice",
              "1 cup mixed vegetables",
              "2 eggs, beaten",
              "2 tablespoons soy sauce",
              "1 tablespoon vegetable oil",
              "Salt and pepper to salt to taste"
            ] ,
            instructions: [
              "Heat the vegetable oil in a large skillet or work over medium heat.",
              "Add the mixed vegetables and cook until tender.",
              "Push the vegetables to one side of the skillet and pour the beaten eggs into the other side. Scramble the eggs until cooked.",
              "Add the cooked rice to the skillet and stir everything together.",
              "Pour in the soy sauce and season with salt and pepper to taste.",
              "Cook for an additional 2-3 minutes, stirring occaasionally, until the rice is heated through.",
              "Serve hot and enjoy!" 
            ] ,
            prepTimeMinutes: 10,
            cookTimeMinutes: 15,
            servings: 4,
            difficulty: "Easy",
            caloriesPerServing: 350,
            tags: [ "Chinise", "Fried Rice"],
            image: "https://cdn.dummyjson.com/recipe-image/2.webp",
            rating: 4.7,
            reviewCount: 50,
            mealType: ["Lunch", "Dinner"]
          },
          {
            id: 102,
            name: "French Vegetable Ratatoille",
            cuisine: "French",
            ingredients: [
              "1 eggplant",
              "2 zucchinis",
              "1 red bell pepper",
              "1 yellow bell pepper",
              "1 onion",
              "2 cloves garlic, minced",
              "2 tablespoon olive oil",
              "1 can diced tomatoes",
              "1 teaspoon dried thyme",
              "Salt and pepper to taste"
            ],
            instructions: [
            "Choap all the  vegetables into small pieces.",
          "Heat olive oil in a pan.",
        "Cook onion and garlic until soft.",
      "Add eggplant, zucchins and tomatoes.",
    "Season with herbs , salt and pepper.",
  "Cook until vegetables are tender.",
"Serve hot and enjoy!"
],    
prepTimeMinutws: 15,
cookTimeMinutes: 30,
servings: 4,
difficulty: "Medium",
caloriesPerServing: 220,
tags: ["French", "Ratouille"],
image: "https://cdn.dummyjson.com/recipe-images/33.webp",
rating: 4.8 ,
reviewCount: 45,
mealType: ["Lunch", "Dinner"]
          }
        ];

setRecipes([...data.recipes, ...extraRecipies]);
          })

      .catch((error) => console.log("Error:", error));
  }, []);
  useEffect(() => {
  localStorage.setItem(
    "foodieFavorites",
    JSON.stringify(favorites)
  );
}, [favorites]);

  const countries = [
    { name: "All", emoji: "🌎" },
    { name: "Pakistani", emoji: "🇵🇰" },
    { name: "Italian", emoji: "🇮🇹" },
    { name: "Japanese", emoji: "🇯🇵" },
    { name: "Mexican", emoji: "🇲🇽" },
    { name: "Indian", emoji: "🇮🇳" },
    { name: "Thai", emoji: "🇹🇭" },
    { name: "American", emoji: "🇺🇸" },
    { name: "Turkish", emoji: "🇹🇷" },
    { name: "French", emoji: "🇫🇷" },
    { name: "Korean", emoji: "🇰🇷" },
    { name: "Greek", emoji: "🇬🇷" },
  ];

  const toggleFavorite = (recipe) => {
    setFavorites((currentFavorites) => {
      const alreadyFavorite = currentFavorites.some(
        (item) => item.id === recipe.id
      );

      if (alreadyFavorite) {
        return currentFavorites.filter(
          (item) => item.id !== recipe.id
        );
      }

      return [...currentFavorites, recipe];
    });
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCountry =
      selectedCountry === "All" ||
      (selectedCountry === "Chinese"
        ? [ "Chinese", "Asian"] . includes(recipe.cusine)
        : selectedCountry === "French"
        ? ["French" , " European"] . includes(recipe.cuisine)
        :recipe.cuisine === selectedCountry);
      recipe.cuisine === selectedCountry;

    return matchesSearch && matchesCountry;
  });

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">🍴 Foodie</div>

        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#countries">Countries</a>
          <a href="#recipes">Recipes</a>
          <a href="#favorites">Favorites ❤️</a>
          <a href="#about">About</a>
        </div>

        <button className="login-btn">Login</button>
      </nav>
      <button
  className="theme-btn"
  onClick={() => setDarkMode(!darkMode)}
>
  {darkMode ? "☀️" : "🌙"}
</button>

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">

          <p className="small-title">
            WELCOME TO FOODIE
          </p>

          <h1>
            Discover Your
            <span> Favorite Recipe</span>
          </h1>

          <p className="description">
            Explore delicious recipes, discover new flavors,
            and make every meal special.
          </p>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search your favorite recipe..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button>🔍 Search</button>
          </div>

        </div>
      </section>

      {/* COUNTRIES */}
      <section className="countries-section" id="countries">

        <p className="section-label">
          EXPLORE THE WORLD
        </p>

        <h2>
          🌍 Choose Your <span>Favorite Cuisine</span>
        </h2>

        <p className="recipe-subtitle">
          Taste delicious food from different countries
        </p>

        <div className="countries-container">

          {countries.map((country) => (

            <button
              key={country.name}
              className={`country-card ${
                selectedCountry === country.name
                  ? "country-active"
                  : ""
              }`}
              onClick={() =>
                setSelectedCountry(country.name)
              }
            >

              <div className="country-icon">
                {country.emoji}
              </div>

              <div className="country-text">
                {country.name}
              </div>

              <div className="country-arrow">
                →
              </div>

            </button>

          ))}

        </div>

      </section>

      {/* RECIPES */}
      <section className="recipes" id="recipes">

        <p className="section-label">
          DELICIOUS FOOD
        </p>

        <h2>
          {selectedCountry === "All"
            ? "Popular Recipes 🍽️"
            : `${selectedCountry} Recipes 🍽️`}
        </h2>

        <p className="recipe-subtitle">
          {search
            ? `${filteredRecipes.length} recipes found`
            : `${filteredRecipes.length} delicious recipes waiting for you`}
        </p>

        <div className="recipe-container">

          {filteredRecipes.map((recipe) => (

            <div className="recipe-card" key={recipe.id}>

              <div className="image-wrapper">

                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="recipe-image"
                />

                <button
                  className={`favorite-btn ${
                    favorites.some(
                      (item) => item.id === recipe.id
                    )
                      ? "favorite-active"
                      : ""
                  }`}
                  onClick={() => toggleFavorite(recipe)}
                >
                  ❤️
                </button>

              </div>

              <div className="recipe-info">

                <h3>{recipe.name}</h3>

                <p>
                  🍽️ {recipe.cuisine}
                </p>

                <p>
                  ⭐ {recipe.rating}
                </p>

                <button
                  className="view-btn"
                  onClick={() =>
                    setSelectedRecipe(recipe)
                  }
                >
                  View Recipe
                  <span>→</span>
                </button>

              </div>

            </div>

          ))}

        </div>

        {filteredRecipes.length === 0 && (
          <div className="no-results">
            <div>😔</div>
            <h3>No Recipe Found</h3>
            <p>
              Try another country or search for another recipe.
            </p>
          </div>
        )}

      </section>

      {/* FAVORITES */}
      <section
        className="recipes favorites-section"
        id="favorites"
      >

        <p className="section-label">
          YOUR COLLECTION
        </p>

        <h2>
          ❤️ My Favorites
        </h2>

        <p className="recipe-subtitle">
          {favorites.length === 0
            ? "You haven't added any favorites yet."
            : `${favorites.length} favorite recipe(s)`}
        </p>

        <div className="recipe-container">

          {favorites.map((recipe) => (

            <div
              className="recipe-card"
              key={recipe.id}
            >

              <div className="image-wrapper">

                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="recipe-image"
                />

              </div>

              <div className="recipe-info">

                <h3>{recipe.name}</h3>

                <p>
                  🍽️ {recipe.cuisine}
                </p>

                <button
                  className="view-btn"
                  onClick={() =>
                    setSelectedRecipe(recipe)
                  }
                >
                  View Recipe
                  <span>→</span>
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* MODAL */}
      {selectedRecipe && (

        <div className="recipe-modal">

          <div className="recipe-details">

            <button
              className="close-btn"
              onClick={() =>
                setSelectedRecipe(null)
              }
            >
              ✕
            </button>

            <img
              src={selectedRecipe.image}
              alt={selectedRecipe.name}
              className="details-image"
            />

            <h2>
              {selectedRecipe.name}
            </h2>

            <div className="details-info">

              <span>
                🍽️ {selectedRecipe.cuisine}
              </span>

              <span>
                ⭐ {selectedRecipe.rating}
              </span>

              <span>
                ⏱️ {selectedRecipe.prepTimeMinutes} min prep
              </span>

              <span>
                🔥 {selectedRecipe.cookTimeMinutes} min cook
              </span>

            </div>

            <h3>
              🥗 Ingredients
            </h3>

            <ul className="ingredients-list">

              {selectedRecipe.ingredients.map(
                (ingredient, index) => (
                  <li key={index}>
                    {ingredient}
                  </li>
                )
              )}

            </ul>

            <h3>
              👨‍🍳 Instructions
            </h3>

            <ol className="instructions-list">

              {selectedRecipe.instructions.map(
                (instruction, index) => (
                  <li key={index}>
                    {instruction}
                  </li>
                )
              )}

            </ol>

            <button
              className="close-details"
              onClick={() =>
                setSelectedRecipe(null)
              }
            >
              Close Recipe
            </button>

          </div>

        </div>

      )}

      {/* FOOTER */}
      <footer className="footer" id="about">

        <h2>
          🍴 Foodie
        </h2>

        <p>
          Made with ❤️ for food lovers
        </p>

      </footer>

    </div>
  );
}

export default App;