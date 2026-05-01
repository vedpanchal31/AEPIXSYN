import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Check, Download, X } from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { findImage, isLocalImageId } from "@/data/gallery";
import { useGetPhotoQuery } from "@/services/unsplash/unsplashApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { toast } from "sonner";

const OPTS = [
  { id: "4k", name: "4K Ultra HD", res: "3840 × 2160" },
  { id: "2k", name: "2K Quad HD", res: "2560 × 1440" },
  { id: "fhd", name: "Full HD", res: "1920 × 1080" },
  { id: "web", name: "Web", res: "1280 × 720" },
];

const DownloadModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isLocal = isLocalImageId(id);
  const local = isLocal ? findImage(id) : null;
  const { data: remote } = useGetPhotoQuery(isLocal || !id ? skipToken : id);
  const img = remote
    ? {
        id: remote.id,
        title: remote.description ?? remote.alt_description ?? "Untitled",
        src: remote.urls.regular,
      }
    : local ?? findImage(undefined);
  const [picked, setPicked] = useState("4k");

  return (
    <MobileShell showNav={false} fullBleed>
      <div className="relative w-full min-h-screen">
        {/* Blurred background */}
        <img
          src={img.src}
          alt=""
          className="fixed inset-0 w-full h-full object-cover blur-xl scale-110 opacity-40"
        />
        <div className="fixed inset-0 bg-background/80" />

        {/* Modal centered */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-5 md:p-10">
          <div className="w-full max-w-md md:max-w-lg glass-strong rounded-3xl p-6 md:p-8 border border-primary/20 shadow-elegant">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-display text-lg md:text-2xl">Choose Quality</h2>
              <button
                onClick={() => navigate(-1)}
                className="w-9 h-9 rounded-full glass flex items-center justify-center hover:border-primary/40 transition-smooth"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden h-40 md:h-56 shadow-card">
              <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
            </div>

            <p className="text-[11px] md:text-sm text-muted-foreground mt-4">
              Select download quality for {img.title}.
            </p>

            <div className="mt-4 space-y-2">
              {OPTS.map((o) => {
                const on = picked === o.id;
                return (
                  <button
                    key={o.id}
                    onClick={() => setPicked(o.id)}
                    className={`w-full rounded-xl p-3 md:p-4 flex items-center justify-between text-left transition-smooth ${
                      on
                        ? "glass border border-primary/60 shadow-glow-soft"
                        : "glass border border-border/60 hover:border-primary/30"
                    }`}
                  >
                    <div>
                      <p className="text-xs md:text-sm font-medium">{o.name}</p>
                      <p className="text-[10px] md:text-xs text-muted-foreground">{o.res}</p>
                    </div>
                    <span
                      className={`w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center ${
                        on ? "bg-gradient-purple shadow-glow-soft" : "border border-border"
                      }`}
                    >
                      {on && <Check className="w-2.5 h-2.5 text-primary-foreground" strokeWidth={3} />}
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => {
                const opt = OPTS.find((o) => o.id === picked)!;
                toast.success(`Downloading ${img.title} · ${opt.name}`);
              }}
              className="mt-5 w-full py-3 md:py-4 rounded-xl bg-gradient-purple text-primary-foreground text-sm md:text-base font-medium shadow-glow flex items-center justify-center gap-2 hover:shadow-elegant transition-smooth"
            >
              <Download className="w-4 h-4" /> Download
            </button>
          </div>
        </div>
      </div>
    </MobileShell>
  );
};

export default DownloadModal;
