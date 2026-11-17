import { useParams } from "react-router";
import { useProduct } from "./useProduct";
import { Link } from "react-router";

function ProductDetails() {
  const params = useParams();

  const { data, isPending, isError, error } = useProduct(params.id);

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h3>{data.title}</h3>
      <p>{data.description}</p>
      <p>{data.size}</p>
      <p>Sold by {data.seller?.name}</p>
      <Link to="/">Back to the catalog</Link>
    </div>
  );
}

export default ProductDetails;
