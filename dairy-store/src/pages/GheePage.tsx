import { useEffect, useState } from "react";
import GheeCard from "../components/GheeCard";

type Product = {
  id: number;
  name: string;
  price: string;
  stock: number;
  description: string | null;
};

function GheePage() {
  const [gheeList, setGheeList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const handleBuy = (name: string) => {
    console.log(name + " bought");
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
            onBuy={handleBuy}
          />
        ))}
      </div>
    </div>
  );
}

export default GheePage;