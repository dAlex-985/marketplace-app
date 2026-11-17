import { Link } from "react-router";

function ProductItem({ product }) {
  return (
    <li>
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <Link to={`/products/${product._id}`}>Product details</Link>
    </li>
  );
}

export default ProductItem;
