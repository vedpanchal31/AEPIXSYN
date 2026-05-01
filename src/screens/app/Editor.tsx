import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChevronLeft,
  SlidersHorizontal,
  Sparkles,
  Crop,
  LayoutGrid,
  Info,
} from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { findImage, IMAGES, isLocalImageId } from "@/data/gallery";
import { toast } from "sonner";
import { useGetPhotoQuery } from "@/services/unsplash/unsplashApi";
import { skipToken } from "@reduxjs/toolkit/query";

const TABS = [
  { key: "adjust", Icon: SlidersHorizontal, label: "Adjust" },
  { key: "filters", Icon: Sparkles, label: "Filters" },
  { key: "crop", Icon: Crop, label: "Crop" },
  { key: "effects", Icon: LayoutGrid, label: "Effects" },
  { key: "details", Icon: Info, label: "Details" },
];

const FILTER_PRESETS = [
  { name: "Neon", img: IMAGES.find((i) => i.id === "cat-swirl")!.src },
  { name: "Cinematic", img: IMAGES.find((i) => i.id === "purple-majesty")!.src },
  { name: "Moody", img: IMAGES.find((i) => i.id === "cat-dark")!.src },
  { name: "Dark", img: IMAGES.find((i) => i.id === "cat-city")!.src },
  { name: "Minimal", img: IMAGES.find((i) => i.id === "cat-minimal")!.src },
];

const Editor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isLocal = isLocalImageId(id);
  const local = isLocal ? findImage(id) : null;
  const { data: remote } = useGetPhotoQuery(isLocal || !id ? skipToken : id);
  const img = remote
    ? {
        id: remote.id,
        src: remote.urls.regular,
      }
    : local ?? findImage(undefined);

  const [tab, setTab] = useState("filters");
  const [filter, setFilter] = useState("Cinematic");
  const [exposure, setExposure] = useState(10);
  const [contrast, setContrast] = useState(20);
  const [saturation, setSaturation] = useState(15);
  const [highlights, setHighlights] = useState(-10);

  const filterCss = (() => {
    switch (filter) {
      case "Neon":
        return "saturate(1.6) hue-rotate(-15deg) contrast(1.1)";
      case "Cinematic":
        return "saturate(1.2) contrast(1.15) brightness(0.95)";
      case "Moody":
        return "saturate(0.85) contrast(1.25) brightness(0.85)";
      case "Dark":
        return "saturate(0.8) contrast(1.2) brightness(0.7)";
      case "Minimal":
        return "saturate(0.6) contrast(1.05) brightness(1.05)";
      default:
        return "none";
    }
  })();

  const adjustCss = `brightness(${1 + exposure / 200}) contrast(${1 + contrast / 200}) saturate(${1 + saturation / 200})`;

  return (
    <MobileShell showNav={false}>
      <header className="px-5 md:px-0 pt-2 md:pt-8 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 md:w-10 md:h-10 rounded-full glass flex items-center justify-center"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <p className="text-sm md:text-lg font-medium">Edit Image</p>
        <button
          onClick={() => toast.success("Saved to Creations")}
          className="px-4 md:px-6 py-1.5 md:py-2.5 rounded-full bg-gradient-purple text-primary-foreground text-xs md:text-sm shadow-glow-soft hover:shadow-glow transition-smooth"
        >
          Save
        </button>
      </header>

      <div className="md:grid md:grid-cols-[1fr_360px] md:gap-8 mt-3 md:mt-8">
        {/* Preview */}
        <div className="px-5 md:px-0">
          <div className="rounded-2xl md:rounded-3xl overflow-hidden h-44 md:h-[520px] shadow-card border border-border">
            <img
              src={img.src}
              alt="preview"
              className="w-full h-full object-cover transition-smooth"
              style={{ filter: `${filterCss} ${adjustCss}` }}
            />
          </div>
        </div>

        {/* Tools panel */}
        <div className="md:glass-strong md:rounded-3xl md:p-6 md:border md:border-border">
          {/* Tabs */}
          <div className="px-5 md:px-0 mt-4 md:mt-0 flex justify-between">
            {TABS.map((t) => {
              const on = tab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className="flex flex-col items-center gap-1.5"
                >
                  <span
                    className={`w-9 h-9 md:w-11 md:h-11 rounded-xl flex items-center justify-center transition-smooth ${
                      on ? "bg-gradient-purple shadow-glow-soft" : "glass"
                    }`}
                  >
                    <t.Icon
                      className={`w-3.5 h-3.5 md:w-4 md:h-4 ${on ? "text-primary-foreground" : "text-muted-foreground"}`}
                    />
                  </span>
                  <span className={`text-[9px] md:text-xs ${on ? "text-primary" : "text-muted-foreground"}`}>
                    {t.label}
                  </span>
                </button>
              );
            })}
          </div>

          {tab === "filters" && (
            <div className="px-5 md:px-0 mt-4 md:mt-6 flex gap-2 md:gap-3 overflow-x-auto pb-1 [&::-webkit-scrollbar]:hidden">
              {FILTER_PRESETS.map((f) => {
                const on = f.name === filter;
                return (
                  <button
                    key={f.name}
                    onClick={() => setFilter(f.name)}
                    className="flex flex-col items-center gap-1 shrink-0"
                  >
                    <span
                      className={`w-12 h-12 md:w-14 md:h-14 rounded-xl overflow-hidden border-2 transition-smooth ${
                        on ? "border-primary shadow-glow-soft" : "border-border"
                      }`}
                    >
                      <img src={f.img} alt={f.name} className="w-full h-full object-cover" />
                    </span>
                    <span className={`text-[9px] md:text-xs ${on ? "text-primary" : "text-muted-foreground"}`}>
                      {f.name}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          <div className="px-5 md:px-0 mt-5 md:mt-8 space-y-3 md:space-y-5 pb-6">
            <Slider label="Exposure" value={exposure} min={-50} max={50} onChange={setExposure} />
            <Slider label="Contrast" value={contrast} min={-50} max={50} onChange={setContrast} />
            <Slider label="Saturation" value={saturation} min={-50} max={50} onChange={setSaturation} />
            <Slider label="Highlights" value={highlights} min={-50} max={50} onChange={setHighlights} />
          </div>
        </div>
      </div>
    </MobileShell>
  );
};

const Slider = ({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}) => {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex justify-between text-[10px] md:text-xs text-muted-foreground mb-1.5">
        <span>{label}</span>
        <span className="text-foreground tabular-nums">{value}</span>
      </div>
      <div className="relative h-1.5 rounded-full bg-secondary">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-gradient-purple"
          style={{ width: `${pct}%` }}
        />
        <div
          className="absolute -top-1.5 w-4 h-4 rounded-full bg-primary shadow-glow-soft border-2 border-background"
          style={{ left: `calc(${pct}% - 8px)` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-label={label}
        />
      </div>
    </div>
  );
};

export default Editor;
