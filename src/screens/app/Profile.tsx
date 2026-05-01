import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Settings } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { IMAGES } from "@/data/gallery";
import creatorAvatar from "@/assets/creator-avatar.jpg";
import { assetSrc } from "@/lib/assetSrc";

const STATS = [
  { v: "128", l: "Images" },
  { v: "12.4K", l: "Followers" },
  { v: "89.7K", l: "Downloads" },
  { v: "562", l: "Likes" },
];

const TABS = ["Creations", "Collections", "Liked"] as const;

const Profile = () => {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Creations");
  const grid = IMAGES.slice(0, 12);

  return (
    <MobileShell>
      <header className="md:hidden px-5 pt-2 flex items-center justify-between">
        <Link to="/explore" className="w-8 h-8 rounded-full glass flex items-center justify-center">
          <ChevronLeft className="w-4 h-4" />
        </Link>
        <button className="w-8 h-8 rounded-full glass flex items-center justify-center">
          <Settings className="w-3.5 h-3.5 text-muted-foreground" />
        </button>
      </header>

      <div className="flex flex-col items-center mt-4 md:mt-12">
        <div className="relative">
          <div className="absolute -inset-2 md:-inset-3 rounded-full bg-gradient-purple blur-md opacity-70" />
          <div className="relative w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-primary shadow-glow">
            <img src={assetSrc(creatorAvatar)} alt="Creator avatar" className="w-full h-full object-cover" />
          </div>
        </div>
        <h1 className="font-display text-lg md:text-3xl mt-3 md:mt-5">Aepixsyn Creator</h1>
        <p className="text-[11px] md:text-sm text-muted-foreground">@aepixsyn</p>
        <span className="mt-2 px-3 py-1 rounded-full glass text-[10px] md:text-xs text-primary border border-primary/30">
          ⚡ Pro Creator
        </span>
      </div>

      <div className="px-5 md:px-0 mt-5 md:mt-10 grid grid-cols-4 gap-2 md:gap-6 max-w-2xl mx-auto">
        {STATS.map((s) => (
          <div key={s.l} className="text-center glass md:rounded-2xl md:p-5 md:border md:border-border">
            <p className="text-sm md:text-3xl font-light md:text-gradient">{s.v}</p>
            <p className="text-[9px] md:text-xs tracking-wider text-muted-foreground mt-0 md:mt-2 uppercase">{s.l}</p>
          </div>
        ))}
      </div>

      <div className="px-5 md:px-0 mt-4 md:mt-8 flex gap-2 md:gap-3 max-w-md mx-auto">
        <button className="flex-1 py-2 md:py-3 rounded-xl glass text-xs md:text-sm border border-primary/30 hover:border-primary/60 transition-smooth">
          Edit Profile
        </button>
        <button className="w-9 h-9 md:w-12 md:h-12 rounded-xl glass flex items-center justify-center">
          <Settings className="w-3.5 h-3.5 md:w-4 md:h-4" />
        </button>
      </div>

      <div className="px-5 md:px-0 mt-5 md:mt-10 flex justify-center md:justify-start gap-5 md:gap-8 border-b border-border">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`text-xs md:text-sm pb-2 md:pb-4 transition-smooth ${
              t === tab
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="px-5 md:px-0 mt-3 md:mt-6 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1.5 md:gap-3 pb-6">
        {grid.map((img) => (
          <Link
            key={img.id}
            to={`/image/${img.id}`}
            className="aspect-square rounded-lg md:rounded-xl overflow-hidden hover:opacity-80 transition-smooth"
          >
            <img src={img.src} alt={img.title} loading="lazy" className="w-full h-full object-cover" />
          </Link>
        ))}
      </div>
    </MobileShell>
  );
};

export default Profile;
