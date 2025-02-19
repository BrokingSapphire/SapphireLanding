import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://sapphirebroking.com";
  const currentDate = new Date();

  // Static routes
  const staticRoutes = [
    { url: "/", priority: 1.0 },
  ];

  // Sidebar category routes (From your sidebarItems)
  const categoryRoutes = [
    "about",
    "product",
    "pricing",
    "contact",
  ].map((category) => ({
    url: `${baseUrl}/${category}`,
    lastModified: currentDate,
    priority: 0.9,
  }));

  // Combine all routes
  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route.url}`,
      lastModified: currentDate,
      priority: route.priority,
    })),
    ...categoryRoutes,
  ];
}
