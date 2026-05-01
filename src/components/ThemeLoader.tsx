import { cn } from "@/lib/utils";
import { HashLoader } from "react-spinners";
import { useEffect, useMemo, useState } from "react";

type ThemeLoaderProps = {
  label?: string;
  overlay?: boolean;
  size?: number;
  showLabel?: boolean;
  variant?: "card" | "bare";
  className?: string;
};

export function ThemeLoader({
  label = "Loading…",
  overlay = false,
  size = 16,
  showLabel = true,
  variant = "card",
  className,
}: ThemeLoaderProps) {
  const [spinnerColor, setSpinnerColor] = useState<string>("rgb(0, 0, 0)");

  useEffect(() => {
    const resolvePrimaryToRgb = () => {
      if (typeof window === "undefined") return;
      const root = document.documentElement;
      const raw = window.getComputedStyle(root).getPropertyValue("--primary").trim();
      const hsl = raw ? `hsl(${raw})` : "hsl(0 0% 0%)";

      const probe = document.createElement("span");
      probe.style.color = hsl;
      probe.style.position = "absolute";
      probe.style.left = "-9999px";
      probe.style.top = "-9999px";
      document.body.appendChild(probe);
      const rgb = window.getComputedStyle(probe).color;
      probe.remove();
      setSpinnerColor(rgb);
    };

    resolvePrimaryToRgb();

    const observer = new MutationObserver(() => resolvePrimaryToRgb());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style", "data-theme"] });

    return () => observer.disconnect();
  }, []);

  const spinner = useMemo(() => <HashLoader size={size} color={spinnerColor} />, [size, spinnerColor]);

  const content =
    variant === "bare" ? (
      <div className={cn("flex items-center gap-2", className)}>
        {spinner}
        {showLabel && <span className="text-xs text-muted-foreground">{label}</span>}
      </div>
    ) : (
      <div className={cn("glass-strong rounded-2xl px-5 py-4 border border-border flex items-center gap-3 shadow-elegant", className)}>
        {spinner}
        {showLabel && <span className="text-xs text-muted-foreground">{label}</span>}
      </div>
    );

  if (!overlay) return content;

  return (
    <div
      className="absolute inset-0 grid place-items-center bg-background/50 backdrop-blur-sm"
      role="status"
      aria-label={label}
    >
      {content}
    </div>
  );
}
