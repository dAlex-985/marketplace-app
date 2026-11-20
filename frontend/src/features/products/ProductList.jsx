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
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.map((product) => (
        <ProductItem key={product._id} product={product} />
      ))}
    </ul>
  );
}

export default ProductList;
