import { useProducts } from "../features/products/useProducts";

function Marketplace() {
  const { data, error, isError, isPending } = useProducts();

  console.log(data);

  return (
    <div>
      <h1>Marketplace</h1>
    </div>
  );
}

export default Marketplace;
