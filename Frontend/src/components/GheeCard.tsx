
type GheeCardProps = {
  name: string;
  price: number;
  onBuy: (name: string) => void;
};

function GheeCard({ name, price, onBuy }: GheeCardProps) {
  return (
    <div className="ghee-card">

      <div className="ghee-image">
        🧈
      </div>

      <h2>{name}</h2>

      <p>Pure and Fresh Ghee</p>

      <h3>₹{price}</h3>

      <button onClick={() => onBuy(name)}>
        Buy Now
      </button>

    </div>
  );
}

export default GheeCard;

