import ProtectedRoute from "../components/ProtectedRoute";

function MyProducts() {
  return (
    <ProtectedRoute>
      <div>
        <h1>My Wishes Product</h1>

        <h2>Butter</h2>
        <h2>Ghee </h2>
        <h2>Paneer 🧀</h2>
        <h2>Chaap 🍢</h2>
      </div>
    </ProtectedRoute>
  );
}

export default MyProducts;