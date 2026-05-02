import { Metadata } from "next";
import HomeClient from "../components/home/HomeClient";

export const metadata: Metadata = {
  title: "ContentPilot | AI SEO & Structural Content Strategy",
  description:
    "ContentPilot is an AI-assisted SEO content platform. Turn a single topic into a publish-ready package — long-form Markdown article, SEO title and meta, target keywords, internal and external link ideas, and an intent-driven FAQ, all shaped by live SERP analysis.",
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
