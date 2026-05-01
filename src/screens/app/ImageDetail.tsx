import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  Heart,
  MoreVertical,
  Download,
  Edit3,
  Share2,
  Bookmark,
  Info,
} from "lucide-react";
import { MobileShell } from "@/components/MobileShell";
import { findImage, isLocalImageId } from "@/data/gallery";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetPhotoQuery } from "@/services/unsplash/unsplashApi";
import { ThemeLoader } from "@/components/ThemeLoader";

type DetailImage = {
  id: string;
  title: string;
  description?: string | null;
  creator: string;
  src: string;
  res: string;
};

const ImageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isLocal = isLocalImageId(id);
  const local = isLocal ? findImage(id) : null;
  const isRemote = !isLocal && !!id;
  const { data: remote, isFetching } = useGetPhotoQuery(!isRemote ? skipToken : id);

  const img: DetailImage | null = isLocal
    ? (local ?? findImage(undefined))
    : remote
      ? {
          id: remote.id,
          title: remote.alt_description ?? "Untitled",
          description: remote.description,
          creator: remote.user.name,
          src: remote.urls.regular,
          res: `${remote.width} × ${remote.height}`,
        }
      : null;
  const [liked, setLiked] = useState(true);
  const [saved, setSaved] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const showLoader = isFetching || (img !== null && !imgLoaded);

  useEffect(() => {
    setImgLoaded(false);
  }, [id]);

  return (
    <MobileShell showNav={false} fullBleed>
      {img === null ? (
        <div className="min-h-screen flex items-center justify-center relative">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 w-9 h-9 rounded-full glass flex items-center justify-center"
            aria-label="Back"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="w-full max-w-5xl px-6">
            <div className="relative h-[60vh] rounded-3xl glass border border-border overflow-hidden">
              <ThemeLoader overlay label="Loading image…" variant="bare" size={56} showLabel={false} />
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Mobile: immersive overlay layout */}
          <div className="md:hidden relative w-full min-h-screen">
            <img
              src={img.src}
              alt={img.title}
              className="absolute inset-0 w-full h-full object-cover"
              onLoad={() => setImgLoaded(true)}
            />
            {showLoader && (
              <ThemeLoader overlay label="Loading image…" variant="bare" size={56} showLabel={false} />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/95" />

            <div className="absolute top-4 inset-x-0 px-4 flex items-center justify-between z-20">
              <button
                onClick={() => navigate(-1)}
                className="w-9 h-9 rounded-full glass flex items-center justify-center"
                aria-label="Back"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setLiked((v) => !v)}
                  className="w-9 h-9 rounded-full glass flex items-center justify-center"
                  aria-label="Favorite"
                >
                  <Heart
                    className={`w-4 h-4 ${liked ? "text-primary" : "text-muted-foreground"}`}
                    fill={liked ? "currentColor" : "none"}
                  />
                </button>
                <button className="w-9 h-9 rounded-full glass flex items-center justify-center">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="absolute bottom-20 inset-x-0 z-20 p-4">
              <DetailPanel img={img} liked={liked} saved={saved} setLiked={setLiked} setSaved={setSaved} />
            </div>
          </div>

          {/* Desktop: split layout */}
          <div className="hidden md:grid grid-cols-2 gap-10 p-8 min-h-[calc(100vh-80px)] items-center">
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-purple opacity-30 blur-3xl rounded-[2rem]" />
              <div className="relative rounded-3xl overflow-hidden shadow-elegant aspect-[4/5]">
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover"
                  onLoad={() => setImgLoaded(true)}
                />
                {showLoader && (
                  <ThemeLoader overlay label="Loading image…" variant="bare" size={56} showLabel={false} />
                )}
              </div>
            </div>
            <div>
              <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mb-6"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <DetailPanel img={img} liked={liked} saved={saved} setLiked={setLiked} setSaved={setSaved} desktop />
            </div>
          </div>
        </>
      )}
    </MobileShell>
  );
};

const DetailPanel = ({
  img,
  liked,
  saved,
  setLiked,
  setSaved,
  desktop = false,
}: {
  img: DetailImage;
  liked: boolean;
  saved: boolean;
  setLiked: (fn: (v: boolean) => boolean) => void;
  setSaved: (fn: (v: boolean) => boolean) => void;
  desktop?: boolean;
}) => (
  <div className={desktop ? "" : "glass-strong rounded-3xl p-5 space-y-4 border border-primary/20"}>
    <div className="flex items-start justify-between gap-2">
      <div>
        <h1 className={`${desktop ? "font-display text-5xl font-light" : "font-display text-xl font-light"} line-clamp-2`}>
          {img.title}
        </h1>
        <p className={desktop ? "text-sm text-muted-foreground mt-2" : "text-[11px] text-muted-foreground"}>
          by {img.creator}
        </p>
      </div>
      <span className={`glass rounded-full text-primary border border-primary/30 whitespace-nowrap ${
        desktop ? "px-3 py-1.5 text-xs" : "text-[9px] px-2 py-1"
      }`}>
        {img.res}
      </span>
    </div>

    {desktop && (
      <p className="text-muted-foreground leading-relaxed mt-6 max-w-md line-clamp-2">
        {img.description?.trim() ? img.description : "Ultra HD imagery captured for creators who refuse the ordinary."}
      </p>
    )}

    <div className={`flex gap-2 md:gap-3 ${desktop ? "mt-8" : ""}`}>
      <Link
        to={`/download/${img.id}`}
        className={`flex-1 rounded-xl bg-gradient-purple text-primary-foreground font-medium shadow-glow flex items-center justify-center gap-1.5 hover:shadow-elegant transition-smooth ${
          desktop ? "py-4 text-sm" : "py-2.5 text-xs"
        }`}
      >
        <Download className={desktop ? "w-4 h-4" : "w-3.5 h-3.5"} /> Download
      </Link>
      <Link
        to={`/edit/${img.id}`}
        className={`flex-1 rounded-xl glass font-medium flex items-center justify-center gap-1.5 border border-border hover:border-primary/40 transition-smooth ${
          desktop ? "py-4 text-sm" : "py-2.5 text-xs"
        }`}
      >
        <Edit3 className={desktop ? "w-4 h-4" : "w-3.5 h-3.5"} /> Edit
      </Link>
    </div>

    <div className={`flex justify-between text-muted-foreground pt-1 ${desktop ? "text-sm pt-6 max-w-md" : "text-[10px]"}`}>
      <button onClick={() => setLiked((v) => !v)} className="flex items-center gap-1.5">
        <Heart className={`${desktop ? "w-4 h-4" : "w-3.5 h-3.5"} ${liked ? "text-primary" : ""}`} fill={liked ? "currentColor" : "none"} /> Like
      </button>
      <button onClick={() => setSaved((v) => !v)} className="flex items-center gap-1.5">
        <Bookmark className={`${desktop ? "w-4 h-4" : "w-3.5 h-3.5"} ${saved ? "text-primary" : ""}`} fill={saved ? "currentColor" : "none"} /> Save
      </button>
      <button className="flex items-center gap-1.5">
        <Share2 className={desktop ? "w-4 h-4" : "w-3.5 h-3.5"} /> Share
      </button>
      <button className="flex items-center gap-1.5">
        <Info className={desktop ? "w-4 h-4" : "w-3.5 h-3.5"} /> Info
      </button>
    </div>
  </div>
);

export default ImageDetail;
