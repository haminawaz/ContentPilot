import { Metadata } from "next";
import HomeClient from "../components/home/HomeClient";

export const metadata: Metadata = {
  title: "ContentPilot | AI SEO & Structural Content Strategy",
  description:
    "The structural integrity of SEO. Scale your organic reach with ContentPilot's AI-powered engine. Built for performance and precision. Explore our Search Labs and Structural Pilot.",
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ContentPilot",
    url: "https://contentpilot.ai",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://contentpilot.ai/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ContentPilot",
    url: "https://contentpilot.ai",
    logo: "https://contentpilot.ai/logo.png",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "",
      contactType: "customer service",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <HomeClient />
    </>
  );
}
