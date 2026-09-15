import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router";
import { motion } from "motion/react";
import { useHeroOverride } from "../components/useHeroOverride";
import { GlassCard } from "../components/ui/GlassCard";
import { ProductDetail } from "../components/ProductDetail";
import { Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";

// We'll import the local content as a fallback and primary source for linkage
import localContent from "../../data/localContent";

// Slugs whose prior content referenced removed products — they 404 rather than
// rendering stale /content.json data.
const BLOCKLIST = new Set([
  "lattice", "lattice-behavioral-analytics", "lattice-deployment", "lattice-threat-intelligence",
  "prism", "prism-gpt", "prism-main", "prism-digital-twin",
  "sentinel", "sentinel-audit-store", "sentinel-gateway",
  "agentic-mind", "agentverse", "shield", "phantom", "lustro",
  "agenta-campaigns", "agenta-prospecting", "agenta-pipelines", "agenta-analytics",
  "forge-studio", "clarity", "demo",
]);

export function DynamicPage() {
  const params = useParams();
  const location = useLocation();
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Determine the slug from params or URL
  // Remove trailing slash if present to avoid mismatch
  const path = location.pathname.replace(/\/$/, "");
  const slug = params.slug || params["*"] || path.substring(1);

  const slugLower = slug ? slug.toLowerCase() : "";
  const isBlocked = slug !== undefined && (BLOCKLIST.has(slugLower) || BLOCKLIST.has(slugLower.replace(/\//g, "-")));
  if (isBlocked) {
    setError(true);
    setLoading(false);
  }

  // Push dynamic hero data up to Layout's centralized hero
  useHeroOverride(
    pageData
      ? {
          title: pageData.hero?.title || pageData.title || "Untitled Page",
          subtitle: pageData.hero?.subtitle,
          image: pageData.hero?.image,
        }
      : null
  );

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      setError(false);
      setPageData(null);

      // 1. Try fetching fresh content
      try {
        const res = await fetch('/content.json');
        if (!res.ok) throw new Error("Network error");
        const data = await res.json();
        
        if (findAndSetPage(data, path, slug)) {
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn("Falling back to local static content due to:", err);
      }

      // 2. Fallback to bundled local content
      // @ts-ignore
      if (findAndSetPage(localContent, path, slug)) {
        setLoading(false);
        return;
      }

      setError(true);
      setLoading(false);
    };

    loadContent();
  }, [slug, path]);

  // Helper to search all content sources
  const findAndSetPage = (data: any, currentPath: string, currentSlug: string) => {
    if (!data) return false;

    // 1. Check pages object
    if (data.pages?.[currentSlug]) {
      setPageData(data.pages[currentSlug]);
      return true;
    }

    // 2. Check custom_pages array
    const customPage = data.custom_pages?.find((p: any) => 
      p.slug === currentSlug || p.path === currentPath
    );
    if (customPage) {
      setPageData(customPage);
      return true;
    }

    // 3. Dynamic Handler for /solutions/:serviceId and /solutions/:serviceId/:featureId
    const pathParts = currentPath.split('/').filter(Boolean); // Remove empty strings
    
    if (pathParts[0] === "solutions" && pathParts[1]) {
      const serviceId = pathParts[1];
      const service = data.services?.find((s: any) => s.id === serviceId);
      
      if (service) {
        // CASE A: Main Service Page (/solutions/lattice)
        if (pathParts.length === 2) {
            setPageData(generateServicePage(service, data, currentPath));
            return true;
        }
        
        // CASE B: Feature Sub-Page (/solutions/lattice/threat-intelligence)
        if (pathParts.length === 3) {
            const featureSlug = pathParts[2];
            setPageData(generateFeaturePage(service, featureSlug));
            return true;
        }
      }
    }

    // 4. Dynamic Handler for /industries/:industryId
    if (pathParts[0] === "industries" && pathParts[1]) {
        // Try to find a nice name from navigation if available
        const industriesNav = data.navigation?.find((n: any) => n.path === "/industries");
        const industryNav = industriesNav?.children?.find((n: any) => n.path === currentPath);
        const industryName = industryNav?.label || toTitleCase(pathParts[1]);

        setPageData(generateGenericPage(
            industryName, 
            "Industry Solutions",
            `https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200`, // Generic corporate building
            `Explore how Aurix AI transforms the ${industryName} sector with advanced data governance and agentic AI.`
        ));
        return true;
    }

    return false;
  };

  // --- Page Generators ---

  const generateServicePage = (service: any, data: any, currentPath: string) => {
    // Logic to link capabilities
    const solutionsNav = data.navigation?.find((n: any) => n.path === "/solutions");
    const serviceNav = solutionsNav?.children?.find((n: any) => n.path === currentPath);

    // Find local fallback for missing deep content
    // @ts-ignore
    const localService = localContent.services?.find((s: any) => s.id === service.id);

    // If the service has explicit content defined (e.g. from JSON), use it.
    // Otherwise, generate it from the description and features.
    let contentHtml = "";
    
    if (service.content?.html) {
        contentHtml = service.content.html;
    } else {
        const featuresHtml = `<ul class="space-y-3">
          ${service.features?.map((feature: string) => {
            // Fuzzy match feature name to nav item
            const matchedNav = serviceNav?.children?.find((child: any) => 
              child.label.toLowerCase() === feature.toLowerCase() ||
              child.label.toLowerCase().includes(feature.toLowerCase()) ||
              feature.toLowerCase().includes(child.label.toLowerCase())
            );
            const url = matchedNav?.path;
            
            return `
              <li class="flex items-start gap-2 text-sm">
                <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0"></span>
                ${url 
                  ? `<a href="${url}" class="text-sky-700 hover:text-sky-500 hover:underline transition-colors font-medium">${feature}</a>` 
                  : `<span class="text-slate-700">${feature}</span>`
                }
              </li>
            `;
          }).join('') || ''}
        </ul>`;

        contentHtml = `
          <div class="mb-8">
            <p class="text-lg text-slate-600 leading-relaxed mb-6">${service.desc}</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              ${service.features?.map((f: string) => `
                <div class="flex items-start gap-3 p-4 rounded-lg bg-slate-50 border border-slate-100">
                  <div class="mt-1 text-sky-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span class="text-slate-700 font-medium">${f}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `;
    }

    // Side panel blurb generation (keep existing logic or use override)
    const featuresListHtml = `<ul class="space-y-3">
          ${service.features?.map((feature: string) => `
              <li class="flex items-start gap-2 text-sm">
                <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-sky-500 flex-shrink-0"></span>
                <span class="text-slate-700">${feature}</span>
              </li>
            `).join('') || ''}
        </ul>`;

    return {
      hero: {
        title: service.hero?.title || service.title,
        subtitle: service.hero?.subtitle || service.desc,
        image: service.hero?.image || service.image
      },
      content: {
        html: contentHtml
      },
      side_panel_blurb: service.side_panel_blurb || {
         title: "Key Capabilities",
         content: featuresListHtml
      },
      // Pass through new fields with local fallback
      technical_detail: service.technical_detail || localService?.technical_detail,
      tables: service.tables || localService?.tables,
      gartner: service.gartner !== undefined ? service.gartner : localService?.gartner
    };
  };

  const generateFeaturePage = (service: any, featureSlug: string) => {
      const featureName = toTitleCase(featureSlug);
      
      // Look for specific feature override data if available in service.feature_details (hypothetical structure)
      // For now, we just pass what we have
      return {
          hero: {
              title: featureName,
              subtitle: `${service.title} Capability`,
              image: service.image // Inherit service image
          },
          content: {
              html: `
                <div class="space-y-6">
                    <div class="flex items-center gap-2 text-sm text-sky-600 mb-4">
                        <a href="/solutions/${service.id}" class="hover:underline flex items-center gap-1">
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                           Back to ${service.title}
                        </a>
                    </div>
                    
                    <p class="text-xl text-slate-700 font-light leading-relaxed">
                        The <strong>${featureName}</strong> module is a critical component of the ${service.title} platform.
                    </p>
                    
                    <p class="text-slate-600 leading-relaxed">
                        This capability integrates seamlessly with your existing enterprise infrastructure to deliver autonomous optimization and governance. 
                        By leveraging ${service.title}'s core AI engine, ${featureName} ensures that your data operations remain resilient, compliant, and efficient.
                    </p>

                    <div class="bg-slate-50 p-6 rounded-xl border border-slate-100 mt-8">
                        <h3 class="text-lg font-semibold text-slate-900 mb-4">Why this matters</h3>
                        <ul class="space-y-3">
                            <li class="flex items-start gap-3">
                                <div class="mt-1 text-green-500"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
                                <span class="text-slate-600">Reduced operational overhead through automation</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <div class="mt-1 text-green-500"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
                                <span class="text-slate-600">Real-time transparency and auditability</span>
                            </li>
                            <li class="flex items-start gap-3">
                                <div class="mt-1 text-green-500"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
                                <span class="text-slate-600">Seamless integration with the broader Aurix ecosystem</span>
                            </li>
                        </ul>
                    </div>
                </div>
              `
          },
          // We intentionally do not pass technical detail to feature pages to avoid duplication,
          // unless specific feature detail is added later.
      };
  }

  const generateGenericPage = (title: string, subtitle: string, image: string, desc: string) => {
      return {
          hero: { title, subtitle, image },
          content: {
              html: `<p class="text-lg text-slate-600 leading-relaxed">${desc}</p>`
          }
      };
  }

  const toTitleCase = (str: string) => {
      return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center relative">
        <Loader2 className="w-8 h-8 animate-spin text-sky-600" />
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 relative">
        <div className="text-center max-w-md">
           <h1 className="text-6xl font-bold text-slate-200 mb-4">404</h1>
           <h2 className="text-2xl font-semibold text-slate-800 mb-2">Page Not Found</h2>
           <p className="text-slate-600 mb-8">
             We couldn't find the content for <span className="font-mono text-sky-600 bg-sky-50 px-1 rounded">{path}</span>.
           </p>
           <a href="/" className="px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors">
             Return Home
           </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen relative">
      <div className="container mx-auto px-6 py-24 -mt-20 relative z-20">
        <div className={`grid grid-cols-1 ${pageData.side_panel_blurb ? 'lg:grid-cols-3 gap-8' : ''} relative`}>
          
          {/* Main Content Area */}
          <div className={`${pageData.side_panel_blurb ? 'lg:col-span-2' : 'w-full'} relative`}>
            <GlassCard className="p-8 md:p-12 bg-white border-slate-200 shadow-xl h-full relative">
              {pageData.content?.html ? (
                <div 
                  className="prose prose-slate max-w-none relative"
                  dangerouslySetInnerHTML={{ __html: pageData.content.html }} 
                />
              ) : (
                <div className="prose prose-slate max-w-none relative">
                  <p>{pageData.content?.text || pageData.body || "No content available."}</p>
                </div>
              )}
              
              {/* Product Detail Injection (Tables, Technical Specs, Gartner) */}
              <ProductDetail 
                technical_detail={pageData.technical_detail} 
                tables={pageData.tables} 
                gartner={pageData.gartner}
              />

              {/* AdSense Injection */}
              {pageData.google_adsense_id && (
                <div className="mt-8 pt-8 border-t border-slate-200">
                   <p className="text-xs text-slate-400 text-center mb-2">Advertisement</p>
                   <div className="w-full h-24 bg-slate-100 flex items-center justify-center text-slate-400 text-sm">
                     Running Google AdSense: {pageData.google_adsense_id}
                   </div>
                </div>
              )}
            </GlassCard>
          </div>

          {/* Side Panel Blurb (Optional) */}
          {pageData.side_panel_blurb && (
            <div className="lg:col-span-1 mt-8 lg:mt-0 relative">
              <div className="sticky top-24">
                <div className="relative"> {/* Added explicit relative wrapper for stability */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 100 }}
                  >
                    <GlassCard className="p-6 bg-sky-50/80 border-sky-100 shadow-lg backdrop-blur-md relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-sky-400/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110 duration-500" />
                      
                      {pageData.side_panel_blurb.title && (
                        <h3 className="text-lg font-bold text-sky-900 mb-3 pb-2 border-b border-sky-200/50 relative z-10">
                          {pageData.side_panel_blurb.title}
                        </h3>
                      )}
                      <div 
                        className="prose prose-sm prose-sky text-sky-800/80 leading-relaxed relative z-10"
                        dangerouslySetInnerHTML={{ __html: pageData.side_panel_blurb.content || pageData.side_panel_blurb.text || "" }}
                      />
                    </GlassCard>
                  </motion.div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}