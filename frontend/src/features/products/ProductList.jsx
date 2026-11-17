import ProductItem from "./ProductItem";
import { useProducts } from "./useProducts";

function ProductList() {
  const { data, error, isError, isPending } = useProducts();

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <ul>
      {data.map((product) => (
        <ProductItem key={product._id} product={product} />
      ))}
    </ul>
  );
}

export default ProductList;
