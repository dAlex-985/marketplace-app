import { useSearchParams } from "react-router";

const CATEGORIES = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Women",
    value: "women",
  },
  {
    label: "Men",
    value: "men",
  },
  {
    label: "Kids",
    value: "kids",
  },
  {
    label: "Accessories",
    value: "accessories",
  },
  {
    label: "Other",
    value: "other",
  },
];

function CategoryFilter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";

  function handleSelect(category) {
    if (category === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
  }

  return (
    <div className="flex gap-2.5 justify-center mb-8">
      {CATEGORIES.map((category) => {
        const isActive = category.value === currentCategory;

        return (
          <button
            onClick={() => handleSelect(category.value)}
            key={category.value}
            type="button"
            className={`rounded-full px-4 py-1.5 text-sm font-medium cursor-pointer border transition-colors ${
              isActive
                ? "bg-emerald-600 text-white border-emerald-600"
                : "border-stone-200 bg-white text-stone-600 hover:border-emerald-600 hover:text-emerald-600"
            }`}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryFilter;
