import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

function Searchbar() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState(searchParams.get("search") || "");

  function handleSubmit(e) {
    e.preventDefault();

    if (!query.trim()) {
      navigate("/");
      return;
    }

    navigate(`/?search=${encodeURIComponent(query.trim())}`);
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-72">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="placeholder:text-stone-400 text-sm text-stone-800 w-full border border-stone-200 rounded-full bg-stone-100 py-1.5 pl-4 pr-10 focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
        type="text"
        placeholder="Search items..."
      />
      <Search className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
    </form>
  );
}

export default Searchbar;
