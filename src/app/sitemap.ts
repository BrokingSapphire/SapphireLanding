import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://www.sapphirebroking.com";
  const currentDate = new Date();

  // Static homepage
  const staticRoutes = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
  ];

  // Category & product routes
  const categoryPages = [
    "about",
    "product",
    "pricing",
    "contact",
    "signup",
    "login",
    "open-an-account",
    "support-portal",
  ];
  const productPages = [
    "product/trading-terminal",
    "product/partners-platform",
    "product/partners-terminal",
    "calculators/brokerage",
    "calculators/margin",
    "calculators/sip",
    "calculators/investment",
  ];
  const legalPages = [
    "terms-and-conditions",
    "privacy-policy",
    "risk-management-policy",
    "investor-charter",
    "investor-attention",
    "aadhar-consent",
    "dos-and-donts",
    "rights-of-investors",
    "responsibilities-of-investors",
    "code-of-conduct",
  ];
  const accountPages = [
    "bank-details",
    "account-closure",
    "collateral-haircut",
    "risk-disclosure",
  ];

  // Combine all non-static routes into one array
  const allOtherPages = [...categoryPages, ...productPages, ...legalPages, ...accountPages];

  const allRoutes = allOtherPages.map((path) => ({
    url: `${baseUrl}/${path}`,
    lastModified: currentDate,
    changeFrequency: "monthly" as const,
    priority: path.startsWith("product") ? 0.7 : 0.6,
  }));

  return [...staticRoutes, ...allRoutes];
}
