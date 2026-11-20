import { Link } from "react-router";

function Logo() {
  return (
    <Link to="/" className="inline-flex items-center">
      <img
        src="/logo.png"
        alt="GreenMarket logo"
        className="h-9 w-auto object-contain"
      />
    </Link>
  );
}

export default Logo;
