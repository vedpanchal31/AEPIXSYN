import { useEffect, useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Image as ImageIcon, Sliders, Download, Heart, Home as HomeIcon, Compass, Plus, Edit3, User, Menu, X, ArrowRight, Sparkles, Infinity as InfinityIcon } from "lucide-react";
import { Logo, LogoMark } from "@/components/Logo";
import { AppScreens } from "@/components/AppScreens";
import heroMountain from "@/assets/hero-mountain.jpg";
import visionHiker from "@/assets/vision-hiker.jpg";
import catNature from "@/assets/cat-nature.jpg";
import catCity from "@/assets/cat-city.jpg";
import catMinimal from "@/assets/cat-minimal.jpg";
import catAbstract from "@/assets/cat-abstract.jpg";
import catAnimals from "@/assets/cat-animals.jpg";
import catDark from "@/assets/cat-dark.jpg";
import catArch from "@/assets/cat-arch.jpg";
import { assetSrc } from "@/lib/assetSrc";

const categories = [
  { name: "Nature", img: assetSrc(catNature) },
  { name: "Cityscape", img: assetSrc(catCity) },
  { name: "Minimal", img: assetSrc(catMinimal) },
  { name: "Abstract", img: assetSrc(catAbstract) },
  { name: "Animals", img: assetSrc(catAnimals) },
  { name: "Dark Aesthetic", img: assetSrc(catDark) },
  { name: "Architecture", img: assetSrc(catArch) },
];

const tags = ["4K Ultra HD", "Aesthetic", "Nature", "Architecture", "Abstract"];

const features = [
  { icon: ImageIcon, title: "4K Quality", desc: "Ultra HD images for every need." },
  { icon: Sliders, title: "Powerful Editor", desc: "Edit like a pro with advanced tools." },
  { icon: Download, title: "Easy Download", desc: "Fast, secure and watermark-free." },
  { icon: Heart, title: "Creator First", desc: "Designed for creators, loved by all." },
];

const stats = [
  { value: "10K+", label: "Premium Images" },
  { value: "50+", label: "Categories" },
  { value: "1M+", label: "Creators" },
  { value: "∞", label: "Possibilities", isInfinity: true },
];

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "explore", label: "Explore" },
  { id: "edit", label: "Edit" },
  { id: "premium", label: "Premium" },
  { id: "about", label: "About" },
];

const Index = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    }
  };

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      setTimeout(() => scrollToSection(id), 100);
    }
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/explore?q=${encodeURIComponent(q)}` : "/explore");
  };

  const goToCategory = (cat: string) => navigate(`/explore?cat=${encodeURIComponent(cat)}`);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ambient glow blobs */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-primary/20 blur-[140px]" />
        <div className="absolute top-[40%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[hsl(280_90%_60%)]/15 blur-[160px]" />
        <div className="absolute bottom-[5%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[hsl(200_90%_55%)]/10 blur-[160px]" />
      </div>

      {/* Top bar */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-background/60 border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between py-4 md:py-5">
          <button onClick={() => scrollToSection("home")} aria-label="Go to top" className="flex items-center">
            <Logo />
          </button>
          <nav className="hidden md:flex items-center gap-10 text-sm">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollToSection(l.id)}
                className={`transition-smooth ${
                  activeSection === l.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/signin"
              className="hidden sm:inline-flex px-4 py-2 rounded-full glass text-sm font-medium text-muted-foreground hover:text-foreground transition-smooth"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="hidden sm:inline-flex px-5 py-2 rounded-full bg-gradient-purple text-primary-foreground text-sm font-medium shadow-glow-soft hover:shadow-glow transition-smooth"
            >
              Sign up
            </Link>
            <button
              className="md:hidden w-10 h-10 rounded-full glass flex items-center justify-center"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/90 backdrop-blur-xl">
            <div className="container mx-auto py-4 flex flex-col gap-3">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => scrollToSection(l.id)}
                  className="text-left text-sm text-muted-foreground hover:text-foreground py-1"
                >
                  {l.label}
                </button>
              ))}
              <Link
                to="/signin"
                className="mt-2 text-center px-5 py-2 rounded-full glass text-sm font-medium"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="text-center px-5 py-2 rounded-full bg-gradient-purple text-primary-foreground text-sm font-medium shadow-glow-soft"
              >
                Sign up
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center pt-10 pb-24">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs tracking-[0.25em] text-muted-foreground">
              <Sparkles className="w-3 h-3 text-primary" />
              BRANDING · CASE STUDY · 2026
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-light leading-[1.05]">
              Elevate <span className="text-gradient font-normal">Every</span> Pixel.
            </h1>
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">
              Discover, edit and download stunning 4K images. Built for creators, made for excellence.
            </p>

            {/* search */}
            <form onSubmit={handleSearch} className="glass-strong rounded-2xl p-2 flex items-center gap-2 max-w-lg shadow-card">
              <div className="flex items-center gap-3 flex-1 px-4">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search stunning 4K images..."
                  className="bg-transparent outline-none w-full py-3 text-sm placeholder:text-muted-foreground"
                />
              </div>
              <button
                type="submit"
                aria-label="Search"
                className="w-11 h-11 rounded-xl bg-gradient-purple flex items-center justify-center shadow-glow-soft transition-smooth hover:shadow-glow"
              >
                <Search className="w-4 h-4 text-primary-foreground" />
              </button>
            </form>

            <div className="flex flex-wrap gap-2 max-w-lg">
              {tags.map((t) => (
                <button
                  key={t}
                  onClick={() => navigate(`/explore?q=${encodeURIComponent(t)}`)}
                  className="px-3 py-1.5 rounded-full glass text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 transition-smooth"
                >
                  {t}
                </button>
              ))}
              <Link to="/explore" className="px-3 py-1.5 rounded-full glass text-xs text-muted-foreground hover:text-foreground transition-smooth">
                ···
              </Link>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-purple opacity-30 blur-3xl rounded-[2rem]" />
            <div className="relative rounded-[2rem] overflow-hidden shadow-elegant glass">
              <img
                src={assetSrc(heroMountain)}
                alt="Purple mountain twilight 4K wallpaper"
                width={1920}
                height={1080}
                className="w-full h-[420px] md:h-[520px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 glass rounded-xl px-4 py-2 text-xs tracking-wider">
                4K · ULTRA HD
              </div>
            </div>
          </div>
        </div>

        {/* category strip */}
        <div id="explore" className="container mx-auto pb-20 scroll-mt-24">
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.map((c) => (
              <button
                key={c.name}
                onClick={() => goToCategory(c.name)}
                className="group relative rounded-2xl overflow-hidden glass shadow-card cursor-pointer transition-smooth hover:-translate-y-1 hover:shadow-glow-soft text-left"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={c.img}
                    alt={`${c.name} category`}
                    width={400}
                    height={400}
                    loading="lazy"
                    className="w-full h-full object-cover transition-smooth group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent p-3">
                  <p className="text-xs font-medium tracking-wide text-center">{c.name}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND IDENTITY */}
      <section className="relative py-24 grid-bg">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <p className="text-xs tracking-[0.3em] text-muted-foreground">01 — BRAND IDENTITY</p>
            <h2 className="font-display text-4xl md:text-5xl font-light">
              A mark built for the <span className="text-gradient">future</span>.
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Big logo card */}
            <div className="lg:col-span-2 glass-strong rounded-3xl p-12 md:p-20 flex flex-col items-center justify-center min-h-[420px] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-radial opacity-60" />
              <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="relative">
                  <div className="absolute inset-0 blur-3xl bg-primary/40 rounded-full" />
                  <LogoMark size={140} className="relative drop-shadow-[0_0_30px_hsl(265_90%_70%/0.6)]" />
                </div>
                <div className="text-center">
                  <p className="font-display font-light text-3xl md:text-4xl tracking-[0.4em]">AEPIXSYN</p>
                  <p className="mt-3 text-xs tracking-[0.35em] text-muted-foreground">WHERE PIXELS MEET INTELLIGENCE</p>
                </div>
              </div>
            </div>

            {/* Color palette */}
            <div className="glass-strong rounded-3xl p-8 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <p className="text-xs tracking-[0.25em] text-muted-foreground">PALETTE</p>
                <p className="text-xs text-muted-foreground">04</p>
              </div>
              <div className="grid grid-cols-2 gap-4 flex-1">
                {[
                  { hex: "#A78BFA", bg: "#A78BFA" },
                  { hex: "#7C3AED", bg: "#7C3AED" },
                  { hex: "#0EA5E9", bg: "#0EA5E9" },
                  { hex: "#0F1117", bg: "#0F1117" },
                ].map((c) => (
                  <div key={c.hex} className="flex flex-col gap-2">
                    <div
                      className="aspect-square rounded-2xl shadow-card border border-border"
                      style={{ background: c.bg }}
                    />
                    <p className="text-xs text-center text-muted-foreground tracking-wider">{c.hex}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Logo lockup card */}
            <div className="lg:col-span-3 glass rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <Logo size={56} />
              <div className="hidden md:block w-px h-12 bg-border" />
              <p className="font-display text-lg tracking-[0.25em] text-muted-foreground text-center md:text-right">
                WHERE <span className="text-gradient">PIXELS</span> MEET INTELLIGENCE
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MOBILE APP MOCKUP */}
      <section id="edit" className="relative py-24">
        <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Phone */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute -inset-10 bg-gradient-purple opacity-30 blur-3xl rounded-full" />
              <div className="relative w-[300px] h-[610px] rounded-[3rem] bg-[hsl(232_30%_8%)] border border-border shadow-elegant p-3">
                {/* Screen */}
                <div className="relative w-full h-full rounded-[2.4rem] overflow-hidden bg-background">
                  {/* Notch */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-30" />
                  {/* Status bar */}
                  <div className="relative z-20 px-6 pt-3 pb-1 flex items-center justify-between text-[10px] text-foreground">
                    <span>9:41</span>
                    <span className="opacity-70">●●●●● 􀊫</span>
                  </div>
                  {/* App header */}
                  <div className="px-5 pt-3 flex items-center justify-between">
                    <Menu className="w-4 h-4 text-muted-foreground" />
                    <LogoMark size={22} />
                    <div className="w-7 h-7 rounded-full bg-gradient-purple" />
                  </div>
                  {/* Hero block */}
                  <div className="px-5 mt-4">
                    <h3 className="font-display text-2xl font-light leading-tight">
                      Create.<br />
                      <span className="text-gradient">Enhance.</span><br />
                      Inspire.
                    </h3>
                    <p className="text-[10px] text-muted-foreground mt-2 leading-relaxed">
                      All the tools you need to bring your imagination to life.
                    </p>
                    <button className="mt-3 px-4 py-2 rounded-full bg-gradient-purple text-[10px] text-primary-foreground inline-flex items-center gap-1.5 shadow-glow-soft">
                      Explore Now <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  {/* Featured */}
                  <div className="px-5 mt-5">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[11px] font-medium">Featured Collections</p>
                      <p className="text-[9px] text-primary">View all</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[heroMountain, catDark, catAbstract, catArch, catMinimal, catCity].map(assetSrc).map((img, i) => (
                        <div key={i} className="aspect-square rounded-lg overflow-hidden">
                          <img src={img} alt="" loading="lazy" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Bottom nav */}
                  <div className="absolute bottom-0 inset-x-0 glass-strong border-t border-border px-6 py-3 flex items-center justify-between">
                    <HomeIcon className="w-4 h-4 text-primary" />
                    <Compass className="w-4 h-4 text-muted-foreground" />
                    <div className="w-9 h-9 rounded-full bg-gradient-purple flex items-center justify-center shadow-glow-soft -mt-6">
                      <Plus className="w-4 h-4 text-primary-foreground" />
                    </div>
                    <Edit3 className="w-4 h-4 text-muted-foreground" />
                    <User className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-xs tracking-[0.3em] text-muted-foreground">02 — MOBILE EXPERIENCE</p>
            <h2 className="font-display text-4xl md:text-5xl font-light leading-tight">
              Your studio, in your <span className="text-gradient">pocket</span>.
            </h2>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              A fluid mobile editor with a curated gallery, gesture-driven tools and one-tap exports — designed for the way Gen-Z creates.
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-md pt-4">
              {features.slice(0, 4).map((f) => (
                <div key={f.title} className="glass rounded-2xl p-4">
                  <div className="w-9 h-9 rounded-xl bg-gradient-purple/20 flex items-center justify-center mb-3 border border-primary/30">
                    <f.icon className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm font-medium">{f.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* APP SCREENS SHOWCASE */}
      <AppScreens />

      {/* VISION BANNER */}
      <section className="relative py-20">
        <div className="container mx-auto">
          <div className="relative rounded-[2rem] overflow-hidden shadow-elegant min-h-[480px] flex items-center">
            <img
              src={assetSrc(visionHiker)}
              alt="Hiker overlooking purple mountain range"
              width={1920}
              height={1080}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
            <div className="relative z-10 p-10 md:p-20 max-w-2xl space-y-6">
              <Logo size={32} />
              <h2 className="font-display text-4xl md:text-6xl font-light leading-[1.05]">
                Your Vision,<br />
                Perfected in <span className="text-gradient">4K.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                High-quality visuals. Powerful editing. <br />
                <span className="text-foreground">Limitless inspiration.</span>
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {stats.map((s) => (
              <div key={s.label} className="glass-strong rounded-2xl p-8 text-center">
                <p className="font-display text-4xl md:text-5xl font-light text-gradient">
                  {s.isInfinity ? <InfinityIcon className="w-12 h-12 mx-auto" strokeWidth={1.2} /> : s.value}
                </p>
                <p className="text-xs tracking-[0.25em] text-muted-foreground mt-3">{s.label.toUpperCase()}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section id="premium" className="relative py-24">
        <div className="container mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
            <p className="text-xs tracking-[0.3em] text-muted-foreground">03 — WHY AEPIXSYN</p>
            <h2 className="font-display text-4xl md:text-5xl font-light">
              Crafted for <span className="text-gradient">creators</span> who refuse the ordinary.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f) => (
              <div
                key={f.title}
                className="group glass-strong rounded-3xl p-8 transition-smooth hover:-translate-y-1 hover:shadow-glow-soft"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-purple/15 border border-primary/30 flex items-center justify-center mb-6 group-hover:shadow-glow-soft transition-smooth">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-xs tracking-[0.25em] text-muted-foreground mb-2">
                  {f.title.toUpperCase()}
                </p>
                <p className="font-display text-xl font-light leading-snug">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="about" className="relative py-24 scroll-mt-24">
        <div className="container mx-auto">
          <div className="relative rounded-[2rem] overflow-hidden glass-strong p-12 md:p-20 text-center">
            <div className="absolute inset-0 bg-gradient-radial opacity-80" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <LogoMark size={64} className="mx-auto" />
              <h2 className="font-display text-4xl md:text-6xl font-light leading-tight">
                Step into the <span className="text-gradient">future</span> of imagery.
              </h2>
              <p className="text-muted-foreground">
                Join a million creators shaping the next era of visual storytelling.
              </p>
              <div className="flex flex-wrap gap-3 justify-center pt-2">
                <Link
                  to="/signup"
                  className="px-7 py-3 rounded-full bg-gradient-purple text-primary-foreground text-sm font-medium shadow-glow hover:shadow-elegant transition-smooth"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/explore"
                  className="px-7 py-3 rounded-full glass text-sm font-medium hover:bg-secondary/50 transition-smooth"
                >
                  Explore Premium
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border py-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Logo size={28} />
          <p className="text-xs text-muted-foreground tracking-wider">
            © 2026 AEPIXSYN · CRAFTED WITH LIGHT & PIXELS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
