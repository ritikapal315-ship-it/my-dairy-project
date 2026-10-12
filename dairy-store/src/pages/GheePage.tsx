import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GheeCard from "../components/GheeCard";

type Product = {
  id: number;
  name: string;
  price: string;
  stock: number;
  description: string | null;
};

type Props = {
  addToCart: (productId: number) => Promise<void> | void;
};

function GheePage({ addToCart }: Props) {
  const [gheeList, setGheeList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadGhee() {
      try {
        const response = await fetch("http://localhost:5001/v1/products");
        const result = await response.json();

        if (!response.ok) {
          setError(result.message || "Ghee load nahi hua");
          return;
        }

        const onlyGhee = (result.data as Product[]).filter((product) =>
          product.name.toLowerCase().includes("ghee")
        );

        setGheeList(onlyGhee);
      } catch (err) {
        setError("Server se connect nahi ho paya");
      } finally {
        setLoading(false);
      }
    }

    loadGhee();
  }, []);

  // Buy Now: cart mein daalo, phir cart page par bhejo
  const handleBuy = async (ghee: Product) => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    if (ghee.stock === 0) {
      alert(`${ghee.name} abhi out of stock hai`);
      return;
    }

    await addToCart(ghee.id);
    navigate("/cart");
  };

  return (
    <div className="ghee-page">
      <h1>Ghee Products</h1>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && gheeList.length === 0 && (
        <p>Abhi koi ghee available nahi hai.</p>
      )}

      <div className="ghee-container">
        {gheeList.map((ghee) => (
          <GheeCard
            key={ghee.id}
            name={ghee.name}
            price={Number(ghee.price)}
            onBuy={() => handleBuy(ghee)}
          />
        ))}
      </div>
    </div>
  );
}

export default GheePage;