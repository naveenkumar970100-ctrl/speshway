import { useEffect, useState } from "react";
import { apiUrl } from "@/lib/api";
import { optimizeImage } from "@/lib/cloudinary";

// Cloudinary base URLs — permanent fallbacks
const CLOUDINARY: Record<string, string> = {
  aboutTeam:      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
  webShowcase:    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  logo:           "https://www.speshway.com/logo.png",
  heroSlide1:     "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80",
  heroSlide2:     "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1600&q=80",
  heroSlide3:     "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80",
  heroBg:         "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80",
  mobileShowcase: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80",
  phoneEcommerce: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80",
  phoneFintech:   "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80",
  phoneFitness:   "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
  phoneFood:      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80",
  phoneHealth:    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80",
  phoneSocial:    "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=400&q=80",
};

export interface Assets {
  aboutTeam: string; webShowcase: string; logo: string;
  heroSlide1: string; heroSlide2: string; heroSlide3: string;
  heroBg: string; mobileShowcase: string;
  phoneEcommerce: string; phoneFintech: string; phoneFitness: string;
  phoneFood: string; phoneHealth: string; phoneSocial: string;
}

const defaults = CLOUDINARY as unknown as Assets;

export const useAssets = (): Assets => {
  const [assets, setAssets] = useState<Assets>(defaults);

  useEffect(() => {
    fetch(apiUrl("/api/assets"))
      .then(r => r.json())
      .then((data: Record<string, string>) => {
        setAssets({
          aboutTeam:      optimizeImage(data.asset_about_team      || CLOUDINARY.aboutTeam, 800),
          webShowcase:    optimizeImage(data.asset_web_showcase    || CLOUDINARY.webShowcase, 1200),
          logo:           data.asset_logo            || CLOUDINARY.logo,
          heroSlide1:     optimizeImage(data.asset_hero_slide_1    || CLOUDINARY.heroSlide1, 1920),
          heroSlide2:     optimizeImage(data.asset_hero_slide_2    || CLOUDINARY.heroSlide2, 1920),
          heroSlide3:     optimizeImage(data.asset_hero_slide_3    || CLOUDINARY.heroSlide3, 1920),
          heroBg:         optimizeImage(data.asset_hero_bg         || CLOUDINARY.heroBg, 1920),
          mobileShowcase: optimizeImage(data.asset_mobile_showcase || CLOUDINARY.mobileShowcase, 800),
          phoneEcommerce: optimizeImage(data.asset_phone_ecommerce || CLOUDINARY.phoneEcommerce, 400),
          phoneFintech:   optimizeImage(data.asset_phone_fintech   || CLOUDINARY.phoneFintech, 400),
          phoneFitness:   optimizeImage(data.asset_phone_fitness   || CLOUDINARY.phoneFitness, 400),
          phoneFood:      optimizeImage(data.asset_phone_food      || CLOUDINARY.phoneFood, 400),
          phoneHealth:    optimizeImage(data.asset_phone_health    || CLOUDINARY.phoneHealth, 400),
          phoneSocial:    optimizeImage(data.asset_phone_social    || CLOUDINARY.phoneSocial, 400),
        });
      })
      .catch(() => {});
  }, []);

  return assets;
};
