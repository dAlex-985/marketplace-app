import { formatCurrency } from "../../utils/helpers";

const CONDITION_LABELS = {
  new_with_tags: "New with tags",
  new_without_tags: "New without tags",
  very_good: "Very good",
  good: "Good",
  satisfactory: "Satisfactory",
};

const CATEGORY_LABELS = {
  women: "Women",
  men: "Men",
  kids: "Kids",
  accessories: "Accessories",
  other: "Other",
};

function ProductItem({ product }) {
  const formattedSize =
    product.size.toLowerCase() === "one size"
      ? "One Size"
      : `Size ${product.size}`;

  return (
    <li className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer hover:border-stone-300 group">
      <div className="relative">
        <img
          className="w-full aspect-4/5 object-cover bg-stone-100"
          src={product.images?.[0]}
          alt={product.title}
        />
        <button
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-stone-600 hover:text-emerald-600 hover:bg-white shadow-xs transition-colors cursor-pointer"
          type="button"
          aria-label="Add to favorites"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-lg font-bold text-stone-900">
            {formatCurrency(product.price)}
          </p>
          <span className="bg-emerald-50 text-emerald-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {CONDITION_LABELS[product.condition] || product.condition}
          </span>
        </div>

        <h3 className="text-sm font-medium text-stone-700 truncate mt-0.5 group-hover:text-emerald-700 transition-colors">
          {product.title}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-2">
          <span>{formattedSize}</span>
          <span>•</span>
          <span>{CATEGORY_LABELS[product.category] || product.category}</span>
        </div>
      </div>
    </li>
  );
}

export default ProductItem;
