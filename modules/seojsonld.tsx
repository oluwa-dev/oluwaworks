/** @format */

import Script from "next/script";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BuildwithAyo",
    url: "https://buildwithayo.com",
    // logo: "https://buildwithayo.com/logo.png",
    sameAs: [
      "https://github.com/ayetch00",
      "https://www.linkedin.com/in/faseesin-ayokunumi",
    ],
  };
  return (
    <Script
      id="org-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function PersonJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Faseesin Ayokunumi Toluwani",
    url: "https://buildwithayo.com",
    jobTitle: "Full-stack Developer",
    worksFor: { "@type": "Organization", name: "BuildwithAyo" },
    sameAs: [
      "https://github.com/aytech00",
      "https://www.linkedin.com/in/faseesin-ayokunumi",
    ],
  };
  return (
    <Script
      id="person-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function WebSiteSearchJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://buildwithayo.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://buildwithayo.com/search?q={query}",
      "query-input": "required name=query",
    },
  };
  return (
    <Script
      id="site-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
