import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div style={{ textAlign: "center", padding: "50px 20px" }}>
      <h1 style={{ fontSize: "3rem", color: "#ff6347" }}>Welcome to Foodie 🍔</h1>
      <p style={{ fontSize: "1.2rem", margin: "20px 0" }}>
        Discover amazing recipes from around the world. Cook, Eat, Enjoy!
      </p>
      <Link to="/recipes">
        <button style={{
          padding: "15px 30px",
          fontSize: "1.1rem",
          backgroundColor: "#ff6347",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}>
          View Recipes
        </button>
      </Link>
    </div>
  );
}

export default HomePage;
