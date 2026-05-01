import { Link } from "react-router-dom";
import {
  Search,
  ChevronLeft,
  Heart,
  MoreVertical,
  Download,
  Edit3,
  Share2,
  Bookmark,
  Info,
  Settings,
  Plus,
  ChevronRight,
  Check,
  X,
  Home as HomeIcon,
  Compass,
  FolderHeart,
  User,
  Sliders,
  SlidersHorizontal,
  Crop,
  Sparkles,
  LayoutGrid,
  LogOut,
  Bell,
  MessageCircle,
  Filter,
  Image as ImageIcon,
  Heart as HeartIcon,
  FolderPlus,
} from "lucide-react";
import { LogoMark } from "@/components/Logo";
import purpleMajesty from "@/assets/purple-majesty.jpg";
import creatorAvatar from "@/assets/creator-avatar.jpg";
import catNature from "@/assets/cat-nature.jpg";
import catCity from "@/assets/cat-city.jpg";
import catMinimal from "@/assets/cat-minimal.jpg";
import catAbstract from "@/assets/cat-abstract.jpg";
import catAnimals from "@/assets/cat-animals.jpg";
import catDark from "@/assets/cat-dark.jpg";
import catArch from "@/assets/cat-arch.jpg";
import catSwirl from "@/assets/cat-swirl.jpg";
import catRoad from "@/assets/cat-road.jpg";
import heroMountain from "@/assets/hero-mountain.jpg";
import { assetSrc } from "@/lib/assetSrc";

/* ───────────── Phone shell ───────────── */
const Phone = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mx-auto w-[280px] shrink-0">
    <div className="absolute -inset-6 bg-gradient-purple opacity-20 blur-3xl rounded-full" />
    <div className="relative w-[280px] h-[580px] rounded-[2.6rem] bg-[hsl(232_30%_8%)] border border-border shadow-elegant p-2.5">
      <div className="relative w-full h-full rounded-[2.1rem] overflow-hidden bg-background">
        {/* Notch */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-30" />
        {/* Status bar */}
        <div className="relative z-20 px-5 pt-2 pb-1 flex items-center justify-between text-[9px] text-foreground/90">
          <span>9:41</span>
          <span className="opacity-70">●●●●●  ▮▮▮</span>
        </div>
        {children}
      </div>
    </div>
  </div>
);

/* Bottom nav reused by Explore */
const BottomNav = ({ active = "explore" }: { active?: string }) => (
  <div className="absolute bottom-0 inset-x-0 glass-strong border-t border-border px-5 py-3 flex items-center justify-between">
    {[
      { key: "home", Icon: HomeIcon, label: "Home" },
      { key: "explore", Icon: Compass, label: "Explore" },
      { key: "create", Icon: Plus, label: "Create" },
      { key: "collections", Icon: FolderHeart, label: "Collections" },
      { key: "profile", Icon: User, label: "Profile" },
    ].map(({ key, Icon, label }) => {
      const on = key === active;
      return (
        <div key={key} className="flex flex-col items-center gap-0.5">
          <Icon
            className={`w-3.5 h-3.5 ${on ? "text-primary" : "text-muted-foreground"}`}
            strokeWidth={on ? 2.4 : 1.8}
          />
          <span className={`text-[8px] ${on ? "text-primary" : "text-muted-foreground"}`}>
            {label}
          </span>
        </div>
      );
    })}
  </div>
);

/* ───────────── 1. Explore ───────────── */
const ExploreScreen = () => {
  const cats = ["All", "Nature", "Abstract", "Dark", "Minimal", "Architecture"];
  const grid = [catNature, heroMountain, catDark, catCity, catSwirl, catAnimals, catMinimal, catArch].map(assetSrc);
  return (
    <Phone>
      <div className="px-4 pt-1.5 flex items-center justify-between">
        <LogoMark size={18} />
        <p className="text-[11px] font-medium tracking-wide">Explore</p>
        <Search className="w-3.5 h-3.5 text-muted-foreground" />
      </div>

      {/* Search */}
      <div className="px-4 mt-3">
        <div className="glass rounded-full px-3 py-1.5 flex items-center gap-2 shadow-glow-soft border border-primary/30">
          <Search className="w-3 h-3 text-muted-foreground" />
          <span className="text-[10px] text-muted-foreground">Search 4K images...</span>
        </div>
      </div>

      {/* Chips */}
      <div className="px-4 mt-3 flex gap-1.5 overflow-hidden">
        {cats.map((c, i) => (
          <span
            key={c}
            className={`px-2.5 py-1 rounded-full text-[9px] whitespace-nowrap ${
              i === 0
                ? "bg-gradient-purple text-primary-foreground shadow-glow-soft"
                : "glass text-muted-foreground"
            }`}
          >
            {c}
          </span>
        ))}
      </div>

      {/* Grid */}
      <div className="px-4 mt-3 grid grid-cols-3 gap-1.5 pb-20">
        {grid.map((img, i) => (
          <div
            key={i}
            className={`rounded-lg overflow-hidden ${i === 1 || i === 4 ? "row-span-2 aspect-[1/2]" : "aspect-square"}`}
          >
            <img src={img} alt="" loading="lazy" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <BottomNav active="explore" />
    </Phone>
  );
};

/* ───────────── 2. Image Detail ───────────── */
const DetailScreen = () => (
  <Phone>
    <img
      src={assetSrc(purpleMajesty)}
      alt="Purple Majesty"
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/95" />

    {/* Top bar */}
    <div className="absolute top-8 inset-x-0 px-4 flex items-center justify-between z-20">
      <div className="w-7 h-7 rounded-full glass flex items-center justify-center">
        <ChevronLeft className="w-3.5 h-3.5" />
      </div>
      <div className="flex gap-2">
        <div className="w-7 h-7 rounded-full glass flex items-center justify-center">
          <Heart className="w-3.5 h-3.5 text-primary" fill="currentColor" />
        </div>
        <div className="w-7 h-7 rounded-full glass flex items-center justify-center">
          <MoreVertical className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>

    {/* Bottom panel */}
    <div className="absolute bottom-0 inset-x-0 z-20 p-4">
      <div className="glass-strong rounded-2xl p-4 space-y-3 border border-primary/20">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display text-base font-light">Purple Majesty</h3>
            <p className="text-[9px] text-muted-foreground">by Aepixsyn</p>
          </div>
          <span className="text-[8px] glass px-2 py-0.5 rounded-full text-primary border border-primary/30">
            4K Ultra HD
          </span>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 py-2 rounded-xl bg-gradient-purple text-primary-foreground text-[10px] font-medium shadow-glow flex items-center justify-center gap-1">
            <Download className="w-3 h-3" /> Download
          </button>
          <button className="flex-1 py-2 rounded-xl glass text-[10px] font-medium flex items-center justify-center gap-1">
            <Edit3 className="w-3 h-3" /> Edit
          </button>
        </div>

        <div className="flex justify-between text-[9px] text-muted-foreground pt-1">
          <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> Like</span>
          <span className="flex items-center gap-1"><Bookmark className="w-3 h-3" /> Save</span>
          <span className="flex items-center gap-1"><Share2 className="w-3 h-3" /> Share</span>
          <span className="flex items-center gap-1"><Info className="w-3 h-3" /> Info</span>
        </div>
      </div>
    </div>
  </Phone>
);

/* ───────────── 3. Editor ───────────── */
const EditorScreen = () => {
  const tabs = [
    { Icon: SlidersHorizontal, label: "Adjust" },
    { Icon: Sparkles, label: "Filters", on: true },
    { Icon: Crop, label: "Crop" },
    { Icon: LayoutGrid, label: "Effects" },
    { Icon: Info, label: "Details" },
  ];
  const sliders = [
    { label: "Exposure", val: 10, pos: 65 },
    { label: "Contrast", val: 20, pos: 70 },
    { label: "Saturation", val: 15, pos: 60 },
    { label: "Highlights", val: -10, pos: 40 },
  ];
  const filters = [
    { name: "Neon", img: assetSrc(catSwirl) },
    { name: "Cinematic", img: assetSrc(purpleMajesty), on: true },
    { name: "Moody", img: assetSrc(catDark) },
    { name: "Dark", img: assetSrc(catCity) },
    { name: "Minimal", img: assetSrc(catMinimal) },
  ];
  return (
    <Phone>
      <div className="px-4 pt-1.5 flex items-center justify-between">
        <ChevronLeft className="w-4 h-4" />
        <p className="text-[11px] font-medium">Edit Image</p>
        <button className="px-3 py-1 rounded-full bg-gradient-purple text-primary-foreground text-[9px] shadow-glow-soft">
          Save
        </button>
      </div>

      <div className="px-4 mt-2">
        <div className="rounded-2xl overflow-hidden h-32">
          <img src={assetSrc(purpleMajesty)} alt="edit preview" loading="lazy" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 mt-3 flex justify-between">
        {tabs.map((t) => (
          <div key={t.label} className="flex flex-col items-center gap-1">
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                t.on ? "bg-gradient-purple shadow-glow-soft" : "glass"
              }`}
            >
              <t.Icon className={`w-3 h-3 ${t.on ? "text-primary-foreground" : "text-muted-foreground"}`} />
            </div>
            <span className={`text-[8px] ${t.on ? "text-primary" : "text-muted-foreground"}`}>{t.label}</span>
          </div>
        ))}
      </div>

      {/* Filter presets */}
      <div className="px-4 mt-3 flex gap-1.5 overflow-hidden">
        {filters.map((f) => (
          <div key={f.name} className="flex flex-col items-center gap-1 shrink-0">
            <div
              className={`w-10 h-10 rounded-lg overflow-hidden border ${
                f.on ? "border-primary shadow-glow-soft" : "border-border"
              }`}
            >
              <img src={f.img} alt={f.name} loading="lazy" className="w-full h-full object-cover" />
            </div>
            <span className={`text-[7.5px] ${f.on ? "text-primary" : "text-muted-foreground"}`}>{f.name}</span>
          </div>
        ))}
      </div>

      {/* Sliders */}
      <div className="px-4 mt-3 space-y-2">
        {sliders.map((s) => (
          <div key={s.label}>
            <div className="flex justify-between text-[9px] text-muted-foreground mb-1">
              <span>{s.label}</span>
              <span className="text-foreground">{s.val}</span>
            </div>
            <div className="relative h-1 rounded-full bg-secondary">
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-gradient-purple"
                style={{ width: `${s.pos}%` }}
              />
              <div
                className="absolute -top-1 w-3 h-3 rounded-full bg-primary shadow-glow-soft border border-background"
                style={{ left: `calc(${s.pos}% - 6px)` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Phone>
  );
};

/* ───────────── 4. Profile ───────────── */
const ProfileScreen = () => {
  const stats = [
    { v: "128", l: "Images" },
    { v: "12.4K", l: "Followers" },
    { v: "89.7K", l: "Downloads" },
    { v: "562", l: "Likes" },
  ];
  const grid = [catSwirl, heroMountain, catDark, purpleMajesty, catAnimals, catArch].map(assetSrc);
  return (
    <Phone>
      <div className="px-4 pt-1.5 flex items-center justify-between">
        <ChevronLeft className="w-4 h-4" />
        <Settings className="w-3.5 h-3.5 text-muted-foreground" />
      </div>

      {/* Avatar */}
      <div className="flex flex-col items-center mt-3">
        <div className="relative">
          <div className="absolute -inset-1.5 rounded-full bg-gradient-purple blur-md opacity-70" />
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary shadow-glow">
            <img src={assetSrc(creatorAvatar)} alt="creator" loading="lazy" className="w-full h-full object-cover" />
          </div>
        </div>
        <p className="font-display text-sm mt-2">Aepixsyn Creator</p>
        <p className="text-[9px] text-muted-foreground">@aepixsyn</p>
        <span className="mt-1 px-2 py-0.5 rounded-full glass text-[8px] text-primary border border-primary/30">
          ⚡ Pro Creator
        </span>
      </div>

      {/* Stats */}
      <div className="px-4 mt-3 grid grid-cols-4 gap-1">
        {stats.map((s) => (
          <div key={s.l} className="text-center">
            <p className="text-[11px] font-medium text-foreground">{s.v}</p>
            <p className="text-[7.5px] text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>

      {/* Edit button */}
      <div className="px-4 mt-3 flex gap-2">
        <button className="flex-1 py-1.5 rounded-lg glass text-[10px] border border-primary/30">
          Edit Profile
        </button>
        <button className="w-7 h-7 rounded-lg glass flex items-center justify-center">
          <Settings className="w-3 h-3" />
        </button>
      </div>

      {/* Tabs */}
      <div className="px-4 mt-3 flex gap-3 border-b border-border">
        {["Creations", "Collections", "Liked"].map((t, i) => (
          <p
            key={t}
            className={`text-[10px] pb-1.5 ${
              i === 0 ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
            }`}
          >
            {t}
          </p>
        ))}
      </div>

      {/* Grid */}
      <div className="px-4 mt-2 grid grid-cols-3 gap-1">
        {grid.map((img, i) => (
          <div key={i} className="aspect-square rounded-md overflow-hidden">
            <img src={img} alt="" loading="lazy" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </Phone>
  );
};

/* ───────────── 5. Collections ───────────── */
const CollectionsScreen = () => {
  const cols = [
    { name: "Mountain Views", count: 128, img: assetSrc(heroMountain) },
    { name: "Dark Aesthetic", count: 96, img: assetSrc(catDark) },
    { name: "Abstract Life", count: 74, img: assetSrc(catSwirl) },
    { name: "Architecture", count: 112, img: assetSrc(catArch) },
    { name: "Nature Love", count: 87, img: assetSrc(catNature) },
  ];
  return (
    <Phone>
      <div className="px-4 pt-1.5 flex items-center justify-between">
        <p className="font-display text-sm">My Collections</p>
        <button className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-purple text-primary-foreground text-[9px] shadow-glow-soft">
          <Plus className="w-2.5 h-2.5" /> New Collection
        </button>
      </div>

      <div className="px-4 mt-3 space-y-2 pb-4">
        {cols.map((c) => (
          <div
            key={c.name}
            className="glass rounded-2xl p-2 flex items-center gap-3 border border-primary/10 hover:border-primary/40 transition-smooth"
          >
            <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0">
              <img src={c.img} alt={c.name} loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-medium">{c.name}</p>
              <p className="text-[9px] text-muted-foreground">{c.count} Images</p>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
          </div>
        ))}
      </div>
    </Phone>
  );
};

/* ───────────── 6. Download Modal ───────────── */
const DownloadModal = () => {
  const opts = [
    { name: "4K Ultra HD", res: "3840 × 2160", on: true },
    { name: "2K Quad HD", res: "2560 × 1440" },
    { name: "Full HD", res: "1920 × 1080" },
    { name: "Web", res: "1280 × 720" },
  ];
  return (
    <Phone>
      {/* Blurred background image */}
      <img
        src={assetSrc(catRoad)}
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover blur-md scale-110 opacity-60"
      />
      <div className="absolute inset-0 bg-background/70" />

      {/* Preview */}
      <div className="relative z-10 px-4 pt-8">
        <div className="flex justify-end">
          <div className="w-7 h-7 rounded-full glass flex items-center justify-center">
            <X className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden h-28 mt-1">
          <img src={assetSrc(catRoad)} alt="preview" loading="lazy" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Modal content */}
      <div className="relative z-10 px-4 mt-3">
        <h3 className="font-display text-sm">Choose Quality</h3>
        <p className="text-[9px] text-muted-foreground">Select download quality for this image.</p>

        <div className="mt-3 space-y-1.5">
          {opts.map((o) => (
            <div
              key={o.name}
              className={`rounded-xl p-2.5 flex items-center justify-between ${
                o.on
                  ? "glass border border-primary/50 shadow-glow-soft"
                  : "glass border border-border/50"
              }`}
            >
              <div>
                <p className="text-[10px] font-medium">{o.name}</p>
                <p className="text-[8px] text-muted-foreground">{o.res}</p>
              </div>
              <div
                className={`w-3.5 h-3.5 rounded-full flex items-center justify-center ${
                  o.on ? "bg-gradient-purple shadow-glow-soft" : "border border-border"
                }`}
              >
                {o.on && <Check className="w-2 h-2 text-primary-foreground" strokeWidth={3} />}
              </div>
            </div>
          ))}
        </div>

        <button className="w-full mt-3 py-2.5 rounded-xl bg-gradient-purple text-primary-foreground text-[11px] font-medium shadow-glow flex items-center justify-center gap-1.5">
          <Download className="w-3 h-3" /> Download
        </button>
      </div>
    </Phone>
  );
};

/* ───────────── Showcase ───────────── */
export const AppScreens = () => {
  const screens = [
    { title: "Explore", desc: "Discover 4K visuals", Comp: ExploreScreen, to: "/explore" },
    { title: "Image Detail", desc: "Immersive preview", Comp: DetailScreen, to: "/image/purple-majesty" },
    { title: "Editor", desc: "Pro-grade tools", Comp: EditorScreen, to: "/edit/purple-majesty" },
    { title: "Profile", desc: "Creator hub", Comp: ProfileScreen, to: "/profile" },
    { title: "Collections", desc: "Curated sets", Comp: CollectionsScreen, to: "/collections" },
    { title: "Download", desc: "Pick the quality", Comp: DownloadModal, to: "/download/cat-road" },
  ];
  return (
    <section id="screens" className="relative py-24">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <p className="text-xs tracking-[0.3em] text-muted-foreground">04 — APP SCREENS</p>
          <h2 className="font-display text-4xl md:text-5xl font-light">
            Six surfaces. One <span className="text-gradient">visual language</span>.
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Every screen is a real, navigable page — tap any mockup to open the live experience.
          </p>
          <Link
            to="/app"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-purple text-primary-foreground text-xs font-medium shadow-glow hover:shadow-elegant transition-smooth"
          >
            Launch the App <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-16 justify-items-center">
          {screens.map(({ title, desc, Comp, to }) => (
            <Link
              key={title}
              to={to}
              className="group flex flex-col items-center gap-4 transition-smooth hover:-translate-y-1"
            >
              <div className="transition-smooth group-hover:drop-shadow-[0_0_30px_hsl(265_90%_70%/0.5)]">
                <Comp />
              </div>
              <div className="text-center">
                <p className="font-display text-sm tracking-wide group-hover:text-primary transition-smooth">
                  {title} →
                </p>
                <p className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase mt-1">
                  {desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};


export default AppScreens;
