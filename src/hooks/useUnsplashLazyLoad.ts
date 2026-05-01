import { useEffect, useMemo, useRef, useState } from "react";
import { useLazySearchPhotosQuery } from "@/services/unsplash/unsplashApi";
import type { UnsplashPhoto, UnsplashSearchParams } from "@/services/unsplash/types";

type Params = Pick<UnsplashSearchParams, "query" | "orientation" | "color" | "orderBy" | "perPage">;

type Result = {
  photos: UnsplashPhoto[];
  total: number;
  totalPages: number;
  isLoading: boolean;
  isLoadingMore: boolean;
  isError: boolean;
  errorText: string;
  canLoadMore: boolean;
  loadMore: () => void;
  reset: () => void;
};

const toErrorText = (err: unknown) => {
  const e = err as { data?: unknown; error?: unknown; message?: string } | undefined;
  if (typeof e?.data === "string") return e.data;
  if (e?.data) return JSON.stringify(e.data);
  if (typeof e?.message === "string") return e.message;
  return "Unknown error";
};

export const useUnsplashLazyLoad = ({ query, perPage = 28, orientation, color, orderBy = "relevant" }: Params): Result => {
  const [trigger, { isFetching, isError, error }] = useLazySearchPhotosQuery();
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const key = useMemo(() => JSON.stringify({ query, perPage, orientation, color, orderBy }), [query, perPage, orientation, color, orderBy]);
  const lastKeyRef = useRef<string>("");

  const reset = () => {
    setPhotos([]);
    setPage(1);
    setTotal(0);
    setTotalPages(0);
    setIsLoadingMore(false);
  };

  useEffect(() => {
    if (!query.trim()) return;
    if (lastKeyRef.current === key) return;
    lastKeyRef.current = key;
    reset();
    trigger({ query, perPage, page: 1, orientation, color, orderBy })
      .unwrap()
      .then((res) => {
        setPhotos(res.results);
        setTotal(res.total);
        setTotalPages(res.total_pages);
        setPage(1);
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, trigger]);

  const canLoadMore = photos.length > 0 && page < totalPages && !isFetching;

  const loadMore = () => {
    if (!canLoadMore) return;
    const nextPage = page + 1;
    setIsLoadingMore(true);
    trigger({ query, perPage, page: nextPage, orientation, color, orderBy })
      .unwrap()
      .then((res) => {
        setPhotos((prev) => {
          const seen = new Set(prev.map((p) => p.id));
          const next = res.results.filter((p) => !seen.has(p.id));
          return prev.concat(next);
        });
        setTotal(res.total);
        setTotalPages(res.total_pages);
        setPage(nextPage);
      })
      .finally(() => setIsLoadingMore(false));
  };

  const isLoading = isFetching && photos.length === 0;
  const errorText = isError ? toErrorText(error) : "";

  return {
    photos,
    total,
    totalPages,
    isLoading,
    isLoadingMore,
    isError,
    errorText,
    canLoadMore,
    loadMore,
    reset,
  };
};

