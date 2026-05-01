import { Link } from "react-router-dom";
import { ChevronRight, Plus } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { COLLECTIONS } from "@/data/gallery";
import { toast } from "sonner";

const Collections = () => {
  return (
    <MobileShell>
      <header className="px-5 md:px-0 pt-2 md:pt-10 flex items-center justify-between">
        <h1 className="font-display text-base md:text-4xl font-light">My Collections</h1>
        <button
          onClick={() => toast.success("New collection created")}
          className="flex items-center gap-1 md:gap-2 px-3 md:px-5 py-1.5 md:py-2.5 rounded-full bg-gradient-purple text-primary-foreground text-[10px] md:text-sm shadow-glow-soft hover:shadow-glow transition-smooth"
        >
          <Plus className="w-3 h-3 md:w-4 md:h-4" /> New Collection
        </button>
      </header>

      <div className="px-5 md:px-0 mt-4 md:mt-8 space-y-2.5 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-5 pb-6">
        {COLLECTIONS.map((c) => (
          <Link
            key={c.id}
            to={`/explore`}
            className="glass rounded-2xl p-2.5 md:p-4 flex items-center gap-3 md:gap-4 border border-primary/10 hover:border-primary/40 hover:-translate-y-0.5 transition-smooth"
          >
            <div className="w-14 h-14 md:w-20 md:h-20 rounded-xl overflow-hidden shrink-0">
              <img src={c.cover} alt={c.name} loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-sm md:text-lg font-medium">{c.name}</p>
              <p className="text-[10px] md:text-sm text-muted-foreground">{c.count} Images</p>
            </div>
            <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
          </Link>
        ))}
      </div>
    </MobileShell>
  );
};

export default Collections;
