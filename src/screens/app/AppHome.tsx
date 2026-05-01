import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { LogoMark } from "@/components/Logo";
import { COLLECTIONS, IMAGES } from "@/data/gallery";

const AppHome = () => {
  const featured = IMAGES.slice(0, 8);
  return (
    <MobileShell>
      {/* Mobile header */}
      <header className="md:hidden px-5 pt-2 flex items-center justify-between">
        <LogoMark size={22} />
        <div className="w-8 h-8 rounded-full bg-gradient-purple shadow-glow-soft" />
      </header>

      <section className="px-5 md:px-0 mt-5 md:mt-12">
        <h1 className="font-display text-2xl md:text-6xl font-light leading-tight">
          Create.{" "}
          <span className="text-gradient">Enhance.</span>{" "}
          Inspire.
        </h1>
        <p className="text-[11px] md:text-lg text-muted-foreground mt-2 md:mt-5 leading-relaxed max-w-xl">
          All the tools you need to bring your imagination to life.
        </p>
        <Link
          to="/explore"
          className="mt-3 md:mt-6 inline-flex items-center gap-1.5 md:gap-2 px-4 md:px-7 py-2 md:py-3 rounded-full bg-gradient-purple text-primary-foreground text-[11px] md:text-sm shadow-glow-soft hover:shadow-glow transition-smooth"
        >
          Explore Now <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
        </Link>
      </section>

      <section className="px-5 md:px-0 mt-6 md:mt-16">
        <div className="flex items-center justify-between mb-2 md:mb-5">
          <p className="text-xs md:text-base font-medium flex items-center gap-1 md:gap-2">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary" /> Featured
          </p>
          <Link to="/explore" className="text-[10px] md:text-sm text-primary">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-1.5 md:gap-4">
          {featured.map((img) => (
            <Link
              key={img.id}
              to={`/image/${img.id}`}
              className="aspect-square rounded-lg md:rounded-2xl overflow-hidden hover:opacity-80 transition-smooth"
            >
              <img src={img.src} alt={img.title} loading="lazy" className="w-full h-full object-cover" />
            </Link>
          ))}
        </div>
      </section>

      <section className="px-5 md:px-0 mt-6 md:mt-16 pb-6">
        <p className="text-xs md:text-base font-medium mb-2 md:mb-5">Your Collections</p>
        <div className="space-y-2 md:grid md:grid-cols-3 md:gap-4 md:space-y-0">
          {COLLECTIONS.slice(0, 3).map((c) => (
            <Link
              key={c.id}
              to="/collections"
              className="glass rounded-2xl p-2.5 md:p-4 flex items-center gap-3 md:gap-4 border border-primary/10 hover:border-primary/40 transition-smooth"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl overflow-hidden shrink-0">
                <img src={c.cover} alt="" loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="text-xs md:text-base font-medium">{c.name}</p>
                <p className="text-[10px] md:text-sm text-muted-foreground">{c.count} Images</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </MobileShell>
  );
};

export default AppHome;
