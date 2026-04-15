import { useEffect, useState } from "react";
import { apiUrl } from "@/lib/api";

// All images are stored in Cloudinary + MongoDB
// These are the permanent Cloudinary URLs (no local fallbacks needed)
const CLOUDINARY: Record<string, string> = {
  aboutTeam:      "https://res.cloudinary.com/djjimbk12/image/upload/speshway/assets/about-team.jpg",
  webShowcase:    "https://res.cloudinary.com/djjimbk12/image/upload/speshway/assets/web-showcase.png",
  logo:           "https://res.cloudinary.com/djjimbk12/image/upload/speshway/assets/logo-speshway.png",
  heroSlide1:     "https://res.cloudinary.com/djjimbk12/image/upload/speshway/carousel/hero-slide-1.jpg",
  heroSlide2:     "https://res.cloudinary.com/djjimbk12/image/upload/speshway/carousel/hero-slide-2.jpg",
  heroSlide3:     "https://res.cloudinary.com/djjimbk12/image/upload/speshway/carousel/hero-slide-3.jpg",
  heroBg:         "https://res.cloudinary.com/djjimbk12/image/upload/speshway/assets/hero-bg.jpg",
  mobileShowcase: "https://res.cloudinary.com/djjimbk12/image/upload/speshway/assets/mobile-showcase.png",
  phoneEcommerce: "https://res.cloudinary.com/djjimbk12/image/upload/speshway/phones/phone-ecommerce.png",
  phoneFintech:   "https://res.cloudinary.com/djjimbk12/image/upload/speshway/phones/phone-fintech.png",
  phoneFitness:   "https://res.cloudinary.com/djjimbk12/image/upload/speshway/phones/phone-fitness.png",
  phoneFood:      "https://res.cloudinary.com/djjimbk12/image/upload/speshway/phones/phone-food.png",
  phoneHealth:    "https://res.cloudinary.com/djjimbk12/image/upload/speshway/phones/phone-health.png",
  phoneSocial:    "https://res.cloudinary.com/djjimbk12/image/upload/speshway/phones/phone-social.png",
};

export interface Assets {
  aboutTeam: string; webShowcase: string; logo: string;
  heroSlide1: string; heroSlide2: string; heroSlide3: string;
  heroBg: string; mobileShowcase: string;
  phoneEcommerce: string; phoneFintech: string; phoneFitness: string;
  phoneFood: string; phoneHealth: string; phoneSocial: string;
}

let cached: Assets | null = null;

// Allow cache to be cleared from outside (e.g. after admin uploads new logo)
if (typeof window !== "undefined") {
  Object.defineProperty(window, "__assetsCache", {
    get: () => cached,
    set: (v) => { cached = v; },
    configurable: true,
  });
}

export const useAssets = (): Assets => {
  const [assets, setAssets] = useState<Assets>(cached || (CLOUDINARY as unknown as Assets));

  useEffect(() => {
    // Always re-fetch — don't use cache so logo updates reflect immediately
    fetch(apiUrl("/api/assets"))
      .then(r => r.json())
      .then((data: Record<string, string>) => {
        const resolved: Assets = {
          aboutTeam:      data.asset_about_team      || CLOUDINARY.aboutTeam,
          webShowcase:    data.asset_web_showcase    || CLOUDINARY.webShowcase,
          logo:           data.asset_logo            || CLOUDINARY.logo,
          heroSlide1:     data.asset_hero_slide_1    || CLOUDINARY.heroSlide1,
          heroSlide2:     data.asset_hero_slide_2    || CLOUDINARY.heroSlide2,
          heroSlide3:     data.asset_hero_slide_3    || CLOUDINARY.heroSlide3,
          heroBg:         data.asset_hero_bg         || CLOUDINARY.heroBg,
          mobileShowcase: data.asset_mobile_showcase || CLOUDINARY.mobileShowcase,
          phoneEcommerce: data.asset_phone_ecommerce || CLOUDINARY.phoneEcommerce,
          phoneFintech:   data.asset_phone_fintech   || CLOUDINARY.phoneFintech,
          phoneFitness:   data.asset_phone_fitness   || CLOUDINARY.phoneFitness,
          phoneFood:      data.asset_phone_food      || CLOUDINARY.phoneFood,
          phoneHealth:    data.asset_phone_health    || CLOUDINARY.phoneHealth,
          phoneSocial:    data.asset_phone_social    || CLOUDINARY.phoneSocial,
        };
        cached = resolved;
        setAssets(resolved);
      })
      .catch(() => {});
  }, []);

  return assets;
};
