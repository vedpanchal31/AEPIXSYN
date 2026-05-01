import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { LogoMark } from "@/components/Logo";
import { CATEGORIES } from "@/data/gallery";
import type { UnsplashSearchParams } from "@/services/unsplash/types";
import { useUnsplashLazyLoad } from "@/hooks/useUnsplashLazyLoad";
import { useDebounce } from "@/hooks/useDebounce";
import { ThemeLoader } from "@/components/ThemeLoader";

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [q, setQ] = useState(searchParams.get("q") ?? "");
  const [cat, setCat] = useState(searchParams.get("cat") ?? "All");
  const debouncedQ = useDebounce(q, 450);

  useEffect(() => {
    setQ(searchParams.get("q") ?? "");
    setCat(searchParams.get("cat") ?? "All");
  }, [searchParams]);

  useEffect(() => {
    const next = new URLSearchParams();
    if (debouncedQ) next.set("q", debouncedQ);
    if (cat && cat !== "All") next.set("cat", cat);
    setSearchParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQ, cat]);

  const effectiveQuery = useMemo(() => {
    const trimmed = debouncedQ.trim();
    if (trimmed && cat !== "All") return `${trimmed} ${cat}`;
    if (trimmed) return trimmed;
    if (cat !== "All") return cat;
    return "nature";
  }, [debouncedQ, cat]);

  const orientation = (searchParams.get("orientation") as UnsplashSearchParams["orientation"]) ?? undefined;
  const color = (searchParams.get("color") as UnsplashSearchParams["color"]) ?? undefined;

  const { photos, isLoading, isLoadingMore, isError, errorText, canLoadMore, loadMore } = useUnsplashLazyLoad({
    query: effectiveQuery,
    perPage: 28,
    orientation,
    color,
  });

  return (
    <MobileShell>
      <header className="px-5 md:px-0 pt-2 md:pt-8 flex items-center justify-between md:hidden">
        <LogoMark size={22} />
        <p className="text-sm font-medium tracking-wide">Explore</p>
        <Search className="w-4 h-4 text-muted-foreground" />
      </header>

      {/* Desktop hero */}
      <div className="hidden md:block pt-10 pb-6">
        <p className="text-xs tracking-[0.3em] text-muted-foreground">EXPLORE</p>
        <h1 className="font-display text-4xl md:text-5xl font-light mt-3">
          Discover stunning <span className="text-gradient">4K visuals</span>.
        </h1>
        <p className="text-muted-foreground mt-3 max-w-xl">
          Browse curated collections from creators around the world.
        </p>
      </div>

      <div className="px-5 md:px-0 mt-4 md:mt-2 max-w-2xl">
        <label className="glass rounded-full px-4 md:px-6 py-2.5 md:py-4 flex items-center gap-2 shadow-glow-soft border border-primary/30">
          <Search className="w-3.5 h-3.5 md:w-5 md:h-5 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search 4K images..."
            className="bg-transparent outline-none text-xs md:text-base flex-1 placeholder:text-muted-foreground"
          />
        </label>
      </div>

      <div className="px-5 md:px-0 mt-4 md:mt-6 flex gap-2 md:gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden">
        {CATEGORIES.map((c) => {
          const on = c === cat;
          return (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-3 md:px-5 py-1.5 md:py-2.5 rounded-full text-[10px] md:text-sm whitespace-nowrap transition-smooth ${
                on
                  ? "bg-gradient-purple text-primary-foreground shadow-glow-soft"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      <div className="px-5 md:px-0 mt-4 md:mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 pb-6">
        {photos.map((img, i) => (
          <Link
            key={img.id}
            to={`/image/${img.id}`}
            className={`rounded-xl md:rounded-2xl overflow-hidden glass border border-border hover:border-primary/40 transition-smooth hover:-translate-y-0.5 ${
              i % 5 === 0 ? "row-span-2 aspect-[1/2]" : "aspect-square"
            }`}
          >
            <img
              src={img.urls.small}
              alt={img.alt_description ?? "Unsplash photo"}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </Link>
        ))}

        {isLoading && (
          <div className="col-span-2 md:col-span-4 flex justify-center py-12">
            <ThemeLoader label="Loading…" />
          </div>
        )}

        {isError && (
          <p className="col-span-2 md:col-span-4 text-center text-xs text-muted-foreground py-12">
            Failed to load images: {errorText}
          </p>
        )}

        {!isLoading && !isError && photos.length === 0 && (
          <p className="col-span-2 md:col-span-4 text-center text-xs text-muted-foreground py-12">
            No images match your search.
          </p>
        )}
      </div>

      <div className="px-5 md:px-0 pb-10 flex justify-center">
        <button
          onClick={loadMore}
          disabled={!canLoadMore}
          className={`px-6 py-3 rounded-full text-xs md:text-sm transition-smooth ${
            canLoadMore
              ? "glass border border-border hover:border-primary/40 text-foreground"
              : "glass border border-border/40 text-muted-foreground cursor-not-allowed opacity-60"
          }`}
        >
          {isLoadingMore ? (
            <span className="inline-flex items-center gap-2">
              <ThemeLoader variant="bare" size={16} showLabel={false} />
              Loading more…
            </span>
          ) : canLoadMore ? (
            "Load more"
          ) : (
            "No more results"
          )}
        </button>
      </div>
    </MobileShell>
  );
};

export default Explore;
