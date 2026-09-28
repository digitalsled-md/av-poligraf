import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://av-poligraf.vercel.app";
  const locales = ["ru", "ro"];
  const pages = ["", "/services", "/portfolio", "/about", "/contact"];

  return locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${base}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1 : 0.8,
    }))
  );
}
