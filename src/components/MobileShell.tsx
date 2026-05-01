import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home as HomeIcon, Compass, Plus, FolderHeart, User } from "lucide-react";
import { LogoMark } from "@/components/Logo";

/**
 * Responsive app shell.
 * - Mobile (<md): native-style layout with bottom tab bar.
 * - Desktop (md+): full web layout with top navbar + centered max-width content.
 *   The same children render fluidly inside a wider container.
 */
export const MobileShell = ({
  children,
  showNav = true,
  fullBleed = false,
}: {
  children: ReactNode;
  showNav?: boolean;
  fullBleed?: boolean;
}) => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* Ambient glows */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute top-[-10%] left-[10%] w-[600px] h-[600px] rounded-full bg-primary/15 blur-[140px]" />
        <div className="absolute bottom-[5%] right-[5%] w-[500px] h-[500px] rounded-full bg-[hsl(280_90%_60%)]/10 blur-[160px]" />
      </div>

      {/* Desktop top nav */}
      {showNav && <DesktopNav />}

      {/* Mobile status bar (only on small screens to keep app feel) */}
      <div className="md:hidden relative z-20 px-6 pt-3 pb-1 flex items-center justify-between text-[10px] text-foreground/90">
        <span>9:41</span>
        <span className="opacity-70">●●●●●  ▮▮▮</span>
      </div>

      {/* Content area — fluid container, wider on desktop */}
      <main
        className={`relative z-10 mx-auto w-full ${
          fullBleed ? "max-w-7xl" : "max-w-7xl px-0 md:px-8"
        } ${showNav ? "pb-20 md:pb-12" : "pb-6"}`}
      >
        {children}
      </main>

      {showNav && <BottomNav />}
    </div>
  );
};

const NAV = [
  { to: "/app", Icon: HomeIcon, label: "Home" },
  { to: "/explore", Icon: Compass, label: "Explore" },
  { to: "/create", Icon: Plus, label: "Create", center: true },
  { to: "/collections", Icon: FolderHeart, label: "Collections" },
  { to: "/profile", Icon: User, label: "Profile" },
];

const DesktopNav = () => {
  const { pathname } = useLocation();
  return (
    <header className="hidden md:block sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" aria-label="Aepixsyn home">
          <LogoMark size={26} />
          <span className="font-display tracking-[0.3em] text-sm">AEPIXSYN</span>
        </Link>
        <nav className="flex items-center gap-8">
          {NAV.filter((n) => !n.center).map(({ to, label }) => {
            const active = to === "/app" ? pathname === "/app" : pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={`text-sm transition-smooth ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </Link>
            );
          })}
          <Link
            to="/explore"
            className="px-4 py-2 rounded-full bg-gradient-purple text-primary-foreground text-xs font-medium shadow-glow-soft hover:shadow-glow transition-smooth"
          >
            Launch App
          </Link>
        </nav>
      </div>
    </header>
  );
};

const BottomNav = () => {
  const { pathname } = useLocation();
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 glass-strong border-t border-border px-5 py-3 flex items-center justify-between z-40">
      {NAV.map(({ to, Icon, label, center }) => {
        const active =
          to === "/app" ? pathname === "/app" : pathname.startsWith(to);
        if (center) {
          return (
            <Link
              key={to}
              to={to}
              className="-mt-7 w-12 h-12 rounded-full bg-gradient-purple flex items-center justify-center shadow-glow text-primary-foreground"
              aria-label={label}
            >
              <Icon className="w-5 h-5" />
            </Link>
          );
        }
        return (
          <Link
            key={to}
            to={to}
            className="flex flex-col items-center gap-0.5 transition-smooth"
            aria-label={label}
          >
            <Icon
              className={`w-4 h-4 ${active ? "text-primary" : "text-muted-foreground"}`}
              strokeWidth={active ? 2.4 : 1.8}
            />
            <span
              className={`text-[9px] ${active ? "text-primary" : "text-muted-foreground"}`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default MobileShell;
