
import GheeCard from "../components/GheeCard";

function GheePage() {
  const handleBuy = (name: string) => {
    console.log(name + " bought");
  };

  return (
    <div className="ghee-page">

      <h1>Ghee Products</h1>

      <div className="ghee-container">

        <GheeCard
          name="Cow Ghee"
          price={500}
          onBuy={handleBuy}
        />

        <GheeCard
          name="Desi Ghee"
          price={700}
          onBuy={handleBuy}
        />

        <GheeCard
          name="Buffalo Ghee"
          price={600}
          onBuy={handleBuy}
        />

      </div>

    </div>
  );
}

export default GheePage;

