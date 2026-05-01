import purpleMajesty from "@/assets/purple-majesty.jpg";
import heroMountain from "@/assets/hero-mountain.jpg";
import catNature from "@/assets/cat-nature.jpg";
import catCity from "@/assets/cat-city.jpg";
import catMinimal from "@/assets/cat-minimal.jpg";
import catAbstract from "@/assets/cat-abstract.jpg";
import catAnimals from "@/assets/cat-animals.jpg";
import catDark from "@/assets/cat-dark.jpg";
import catArch from "@/assets/cat-arch.jpg";
import catSwirl from "@/assets/cat-swirl.jpg";
import catRoad from "@/assets/cat-road.jpg";
import { assetSrc } from "@/lib/assetSrc";

export type Image = {
  id: string;
  title: string;
  creator: string;
  category: string;
  src: string;
  res: string;
};

export const IMAGES: Image[] = [
  { id: "purple-majesty", title: "Purple Majesty", creator: "Aepixsyn", category: "Nature", src: assetSrc(purpleMajesty), res: "4K Ultra HD" },
  { id: "hero-mountain", title: "Violet Peaks", creator: "Aepixsyn", category: "Nature", src: assetSrc(heroMountain), res: "4K Ultra HD" },
  { id: "cat-dark", title: "Midnight Tower", creator: "Studio Dark", category: "Dark", src: assetSrc(catDark), res: "4K Ultra HD" },
  { id: "cat-city", title: "Neon Skyline", creator: "Urban Lab", category: "Architecture", src: assetSrc(catCity), res: "4K Ultra HD" },
  { id: "cat-swirl", title: "Neon Flux", creator: "Aepixsyn", category: "Abstract", src: assetSrc(catSwirl), res: "4K Ultra HD" },
  { id: "cat-animals", title: "Wild Stare", creator: "Wild Co.", category: "Nature", src: assetSrc(catAnimals), res: "4K Ultra HD" },
  { id: "cat-minimal", title: "Pure Form", creator: "Minimal+", category: "Minimal", src: assetSrc(catMinimal), res: "4K Ultra HD" },
  { id: "cat-arch", title: "Concrete Cube", creator: "Arc Studio", category: "Architecture", src: assetSrc(catArch), res: "4K Ultra HD" },
  { id: "cat-nature", title: "Quiet Lake", creator: "Aepixsyn", category: "Nature", src: assetSrc(catNature), res: "4K Ultra HD" },
  { id: "cat-abstract", title: "Liquid Light", creator: "Aepixsyn", category: "Abstract", src: assetSrc(catAbstract), res: "4K Ultra HD" },
  { id: "cat-road", title: "Dawn Highway", creator: "Roadlight", category: "Minimal", src: assetSrc(catRoad), res: "4K Ultra HD" },
];

export const findImage = (id?: string) =>
  IMAGES.find((i) => i.id === id) ?? IMAGES[0];

export const isLocalImageId = (id?: string) => IMAGES.some((i) => i.id === id);

export const COLLECTIONS = [
  { id: "mountain-views", name: "Mountain Views", count: 128, cover: assetSrc(heroMountain) },
  { id: "dark-aesthetic", name: "Dark Aesthetic", count: 96, cover: assetSrc(catDark) },
  { id: "abstract-life", name: "Abstract Life", count: 74, cover: assetSrc(catSwirl) },
  { id: "architecture", name: "Architecture", count: 112, cover: assetSrc(catArch) },
  { id: "nature-love", name: "Nature Love", count: 87, cover: assetSrc(catNature) },
];

export const CATEGORIES = ["All", "Nature", "Abstract", "Dark", "Minimal", "Architecture"];
