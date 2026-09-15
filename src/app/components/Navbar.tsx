import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Link, useLocation } from "react-router";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown, ChevronRight, ChevronUp, ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./ui/button";
const logoImg = "/SiteMedia/logo.png";
import localContent from "../../data/localContent";
import industriesData from "../../data/industries.json";
import complianceData from "../../data/compliance.json";
import { useGlassPanel } from "./GlassPanelContext";

const ARROW_BAR_HEIGHT = 48;
const ARROW_PROXIMITY = 30;
const CLOSE_DELAY_MS = 600;

interface ScrollableMenuProps {
  items: any[];
  setHoveredSubLink: (v: string | null) => void;
  hoveredSubLink: string | null;
  setHoveredLink: (v: string | null) => void;
  onNearArrowsChange?: (near: boolean) => void;
  knownTopPx?: number;
}

function ScrollableMenu({
  items,
  setHoveredSubLink,
  hoveredSubLink,
  setHoveredLink,
  onNearArrowsChange,
  knownTopPx,
}: ScrollableMenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef     = useRef<HTMLDivElement>(null);

  const [needsScroll, setNeedsScroll] = useState(false);
  const [scrollMaxH, setScrollMaxH]   = useState<number>(400);
  const [showUp,   setShowUp]   = useState(false);
  const [showDown, setShowDown] = useState(false);

  const [flyoutPos,  setFlyoutPos]  = useState<{ top: number; left: number } | null>(null);
  const subLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearSubTimer = () => {
    if (subLeaveTimer.current) { clearTimeout(subLeaveTimer.current); subLeaveTimer.current = null; }
  };

  const handleSubEnter = (label: string, el: HTMLElement) => {
    clearSubTimer();
    const rect = el.getBoundingClientRect();

    const child = items.find((c: any) => c.label === label);
    const childCount = child?.children?.length ?? 0;
    const estimatedH = childCount * 40 + 20;
    let top = rect.top;
    if (top + estimatedH > window.innerHeight - 16) {
      top = Math.max(16, window.innerHeight - estimatedH - 16);
    }

    const flyoutW = 224;
    const spaceRight = window.innerWidth - rect.right - 6;
    const left = spaceRight >= flyoutW ? rect.right + 6 : rect.left - flyoutW - 6;

    setHoveredSubLink(label);
    setFlyoutPos({ top, left });
  };

  const handleSubLeave = () => {
    subLeaveTimer.current = setTimeout(() => {
      setHoveredSubLink(null);
      setFlyoutPos(null);
    }, CLOSE_DELAY_MS);
  };

  const handleFlyoutEnter = () => clearSubTimer();
  const handleFlyoutLeave = () => {
    subLeaveTimer.current = setTimeout(() => {
      setHoveredSubLink(null);
      setFlyoutPos(null);
    }, CLOSE_DELAY_MS);
  };

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current || !listRef.current) return;
      const topPx = knownTopPx != null
        ? knownTopPx
        : containerRef.current.getBoundingClientRect().top;
      const available = Math.max(180, window.innerHeight - topPx - 24);
      const naturalH = listRef.current.scrollHeight;
      const overflows = naturalH > available;
      setNeedsScroll(overflows);
      if (overflows) {
        setScrollMaxH(available);
        setShowDown(true);
        setShowUp(false);
      } else {
        setShowDown(false);
        setShowUp(false);
      }
    };
    const t = setTimeout(measure, 60);
    window.addEventListener("resize", measure);
    return () => { clearTimeout(t); window.removeEventListener("resize", measure); }
  }, [items, knownTopPx]);

  const scrollAreaMaxH = needsScroll
    ? scrollMaxH
        - (showUp   ? ARROW_BAR_HEIGHT : 0)
        - (showDown ? ARROW_BAR_HEIGHT : 0)
    : undefined;

  const handleScroll = () => {
    if (!listRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    setShowUp(scrollTop > 2);
    setShowDown(scrollTop + clientHeight < scrollHeight - 2);
  };

  const scrollBy = (dir: "up" | "down") => {
    listRef.current?.scrollBy({ top: dir === "up" ? -150 : 150, behavior: "smooth" });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !onNearArrowsChange) return;
    const rect  = containerRef.current.getBoundingClientRect();
    const relY  = e.clientY - rect.top;
    const h     = rect.height;
    const nearTop    = showUp   && relY < ARROW_BAR_HEIGHT + ARROW_PROXIMITY;
    const nearBottom = showDown && relY > h - ARROW_BAR_HEIGHT - ARROW_PROXIMITY;
    onNearArrowsChange(nearTop || nearBottom);
  };

  const hoveredChild = items.find((c: any) => c.label === hoveredSubLink);

  return (
    <>
      <div
        ref={containerRef}
        className="flex flex-col rounded-xl"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => onNearArrowsChange?.(false)}
      >
        {showUp && (
          <button
            className="flex-shrink-0 flex items-center justify-center bg-white border-b border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer rounded-t-xl"
            style={{ height: ARROW_BAR_HEIGHT }}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); scrollBy("up"); }}
          >
            <ChevronUp className="w-5 h-5 text-slate-500" />
          </button>
        )}

        <div
          ref={listRef}
          onScroll={handleScroll}
          style={{
            maxHeight:      scrollAreaMaxH != null ? `${scrollAreaMaxH}px` : undefined,
            overflowY:      scrollAreaMaxH != null ? "auto" : "visible",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingTop:    "0.5rem",
            paddingBottom: "0.5rem",
            paddingLeft:   "0.5rem",
            paddingRight:  "0.5rem",
          }}
        >
          <style>{`.scr-hide::-webkit-scrollbar{display:none}`}</style>

          {items.map((child: any) => (
            <div
              key={child.label}
              onMouseEnter={(e) => handleSubEnter(child.label, e.currentTarget)}
              onMouseLeave={handleSubLeave}
            >
              {child.external ? (
                <a
                  href={child.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors w-full"
                  onClick={() => setHoveredLink(null)}
                >
                  <span>{child.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
                </a>
              ) : (
                <Link
                  to={child.path}
                  className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors w-full"
                  onClick={() => { if (!child.children) setHoveredLink(null); }}
                >
                  <span>{child.label}</span>
                  {child.children && (
                    <ChevronRight className="w-3 h-3 text-slate-500" />
                  )}
                </Link>
              )}
            </div>
          ))}
        </div>

        {showDown && (
          <button
            className="flex-shrink-0 flex items-center justify-center bg-white border-t border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer rounded-b-xl"
            style={{ height: ARROW_BAR_HEIGHT }}
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); scrollBy("down"); }}
          >
            <ChevronDown className="w-5 h-5 text-slate-500" />
          </button>
        )}
      </div>

      {hoveredChild?.children && flyoutPos && createPortal(
        <div
          style={{ position: "fixed", top: flyoutPos.top, left: flyoutPos.left, zIndex: 10020 }}
          className="w-56 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl p-2"
          onMouseEnter={handleFlyoutEnter}
          onMouseLeave={handleFlyoutLeave}
        >
          <div className="flex flex-col gap-1">
            {hoveredChild.children.map((sub: any) => (
              <div key={sub.label} className="relative group/level4">
                <Link
                  to={sub.path}
                  className="flex items-center justify-between px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors w-full"
                  onClick={() => { setHoveredLink(null); setHoveredSubLink(null); setFlyoutPos(null); }}
                >
                  <span>{sub.label}</span>
                  {sub.children && <ChevronRight className="w-3 h-3 text-slate-500 group-hover/level4:text-white" />}
                </Link>
                {sub.children && (
                  <div className="absolute left-full top: 0 ml-2 w-56 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl overflow-hidden p-2 z-[10020] opacity-0 invisible group-hover/level4:opacity-100 group-hover/level4:visible transition-all duration-200">
                    <div className="flex flex-col gap-1">
                      {sub.children.map((ss: any) => (
                        <Link
                          key={ss.label}
                          to={ss.path}
                          className="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                          onClick={() => { setHoveredLink(null); setHoveredSubLink(null); setFlyoutPos(null); }}
                        >
                          {ss.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

export function Navbar() {
  const [isOpen,        setIsOpen]        = useState(false);
  const [scrolled,      setScrolled]      = useState(false);
  const [hoveredLink,   setHoveredLink]   = useState<string | null>(null);
  const [hoveredSubLink,setHoveredSubLink]= useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<Record<string, boolean>>({});
  const location = useLocation();
  const glassPanel = useGlassPanel();

  const nearArrowsRef    = useRef(false);
  const collapseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navItemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [dropdownRect, setDropdownRect] = useState<{ top: number; centerX: number } | null>(null);

  const titleRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const [subLetterSpacing, setSubLetterSpacing] = useState<string>("0px");

  const measureSubtitleSpacing = useCallback(() => {
    if (!titleRef.current || !subtitleRef.current) return;
    const titleW = titleRef.current.getBoundingClientRect().width;
    subtitleRef.current.style.letterSpacing = "0px";
    const naturalW = subtitleRef.current.getBoundingClientRect().width;
    const text = subtitleRef.current.textContent || "";
    const charCount = text.length;
    if (charCount <= 1) return;
    const extraSpace = titleW + 4 - naturalW;
    const spacing = extraSpace / charCount;
    const px = `${Math.max(0, spacing)}px`;
    setSubLetterSpacing(px);
    subtitleRef.current.style.letterSpacing = px;
  }, []);

  useEffect(() => {
    measureSubtitleSpacing();
    window.addEventListener("resize", measureSubtitleSpacing);
    return () => window.removeEventListener("resize", measureSubtitleSpacing);
  }, [measureSubtitleSpacing]);

  const clearCollapse = () => {
    if (collapseTimerRef.current) { clearTimeout(collapseTimerRef.current); collapseTimerRef.current = null; }
  };

  const handleNavMouseLeave = () => {
    clearCollapse();
    collapseTimerRef.current = setTimeout(() => {
      nearArrowsRef.current = false;
      setHoveredLink(null);
      setHoveredSubLink(null);
    }, CLOSE_DELAY_MS);
  };

  const handleNavMouseEnter = () => clearCollapse();

  useEffect(() => {
    if (hoveredLink && navItemRefs.current[hoveredLink]) {
      const rect = navItemRefs.current[hoveredLink]!.getBoundingClientRect();
      setDropdownRect({ top: rect.bottom + 8, centerX: rect.left + rect.width / 2 });
    } else {
      setDropdownRect(null);
    }
  }, [hoveredLink]);

  const STATIC_NAV = [
    { label: "Home", path: "/" },
    {
      label: "Solutions", path: "/solutions",
      children: [
        { label: "NavTrax", path: "/solutions/navtrax" },
        { label: "Defog Fluidity", path: "/solutions/defog-fluidity" },
        { label: "Defog Shield", path: "/solutions/defog-shield" },
        { label: "Skylane.One Engineering", path: "/solutions/skylane-one" },
        { label: "Agenta.Red", path: "/solutions/agenta" },
        {
          label: "Resources", path: "/start-here",
          children: [
            { label: "Start Here",         path: "/start-here" },
            { label: "Data Landscape",     path: "/learn/data-landscape" },
            { label: "Data Governance",    path: "/learn/what-is-data-governance" },
            { label: "Data Quality",       path: "/learn/what-is-data-quality" },
            { label: "Step-by-Step",       path: "/learn/step-by-step" },
            { label: "Data Sovereignty",   path: "/solutions/data-sovereignty" },
            { label: "Hallucination Guard",path: "/solutions/hallucination-mitigation" },
          ],
        },
      ],
    },
    { label: "Industries", path: "/industries" },
    {
      label: "Compliance", path: "/regulatory-compliance",
      children: [
        // populated dynamically from complianceData below
      ],
    },
    {
      label: "About", path: "/about",
      children: [
        { label: "Explainability", path: "/about/explainability" },
        { label: "Contact", path: "/contact" },
      ],
    },
  ];

  const [navItems] = useState<any[]>(STATIC_NAV);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const displayItems = useMemo(() => {
    let items = [...navItems];

    const indIdx = items.findIndex(i => i.label === "Industries");
    const indChildren = industriesData.map(ind => ({ label: ind.title, path: `/industries/${ind.slug}` }));
    if (indIdx !== -1) items[indIdx] = { ...items[indIdx], children: indChildren };
    else items.push({ label: "Industries", path: "/industries", children: indChildren });

    const compItem = {
      label: "Compliance",
      path: "/regulatory-compliance",
      children: complianceData.map(c => ({ label: c.title, path: `/compliance/${c.slug}` })),
    };
    const compIdx = items.findIndex(i => i.label === "Compliance");
    if (compIdx !== -1) {
      items[compIdx] = compItem;
    } else {
      const after = items.findIndex(i => i.label === "Industries");
      if (after !== -1) items.splice(after + 1, 0, compItem);
      else items.push(compItem);
    }

    return items;
  }, [navItems]);

  useEffect(() => { setIsOpen(false); setHoveredLink(null); setMobileExpanded({}); }, [location]);

  const hoveredItem = useMemo(() => {
    if (!hoveredLink) return null;
    return displayItems.find(i => i.label === hoveredLink) ?? null;
  }, [hoveredLink, displayItems]);

  return (
    <>
    <nav
      className={cn(
        "z-[9999] transition-all duration-300 border-b border-transparent",
        glassPanel
          ? "sticky top-0"
          : "fixed top-0 left-0 right-0",
        scrolled
          ? "bg-slate-900 backdrop-blur-md shadow-lg border-white/10 py-3"
          : "bg-slate-900/90 backdrop-blur-md py-5"
      )}
      onMouseLeave={handleNavMouseLeave}
      onMouseEnter={handleNavMouseEnter}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "-36px -10% -18px -10%",
          background: "radial-gradient(ellipse 70% 100% at 50% 50%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 45%, transparent 75%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="container mx-auto px-6 flex items-center justify-between relative z-10">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center">
            <img
              src={logoImg} alt="AURIX AI"
              className="h-[60px] w-auto object-contain relative z-10"
            />
          </div>
          <div className="flex flex-col items-start leading-none">
            <span ref={titleRef} className="text-4xl font-bold tracking-tight text-white drop-shadow-sm whitespace-nowrap">
              AURIX <span className="text-sky-400">AI</span>
            </span>
            <span
              ref={subtitleRef}
              className="text-[11px] font-normal text-slate-300 whitespace-nowrap block"
              style={{ letterSpacing: subLetterSpacing, marginLeft: '-1px' }}
            >
              SOLUTIONS, LLC
            </span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {displayItems.map((item) => (
            <div
              key={item.label}
              ref={(el) => { navItemRefs.current[item.label] = el; }}
              className="relative py-2"
              onMouseEnter={() => setHoveredLink(item.label)}
            >
              <Link
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-sky-400 flex items-center gap-1 relative",
                  location.pathname === item.path ? "text-sky-400 font-semibold" : "text-slate-200"
                )}
              >
                {item.label}
                {item.children && (
                  <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", hoveredLink === item.label ? "rotate-180" : "")} />
                )}
                {location.pathname === item.path && !item.children && (
                  <motion.div layoutId="underline" className="absolute left-0 right-0 -bottom-1 h-0.5 bg-sky-500 rounded-full" />
                )}
              </Link>
            </div>
          ))}
        </div>

        <div className="flex md:hidden items-center gap-2">
          <button className="p-2 text-slate-200 hover:text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-slate-700"
          style={{ overflowY: "auto", maxHeight: "calc(100dvh - 72px)", WebkitOverflowScrolling: "touch" }}
        >
          <div className="container mx-auto px-6 py-6 flex flex-col gap-1">
            {displayItems.map((item) => {
              const isExpanded = !!mobileExpanded[item.label];
              const hasChildren = item.children && item.children.length > 0;
              return (
                <div key={item.label} className="flex flex-col">
                  <div className="flex items-center">
                    <Link
                      to={item.path}
                      className="flex-1 text-lg font-medium text-slate-200 hover:text-sky-400 py-3"
                      onClick={() => { if (!hasChildren) setIsOpen(false); }}
                    >
                      {item.label}
                    </Link>
                    {hasChildren && (
                      <button
                        className="p-3 -mr-2 text-slate-400 hover:text-white transition-colors"
                        onClick={() => setMobileExpanded(prev => ({ ...prev, [item.label]: !prev[item.label] }))}
                        aria-label={isExpanded ? `Collapse ${item.label}` : `Expand ${item.label}`}
                      >
                        <ChevronDown className={cn("w-5 h-5 transition-transform duration-200", isExpanded && "rotate-180")} />
                      </button>
                    )}
                  </div>
                  <AnimatePresence initial={false}>
                    {hasChildren && isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 flex flex-col gap-1 mb-2 border-l border-slate-700 ml-2">
                          {item.children.map((child: any) => {
                            const childKey = `${item.label}/${child.label}`;
                            const childExpanded = !!mobileExpanded[childKey];
                            const childHasChildren = child.children && child.children.length > 0;
                            return (
                              <div key={child.label} className="flex flex-col">
                                <div className="flex items-center">
                                  <Link
                                    to={child.path}
                                    className="flex-1 text-sm text-slate-400 hover:text-sky-300 py-2"
                                    onClick={() => { if (!childHasChildren) setIsOpen(false); }}
                                  >
                                    {child.label}
                                  </Link>
                                  {childHasChildren && (
                                    <button
                                      className="p-2 -mr-1 text-slate-500 hover:text-white transition-colors"
                                      onClick={() => setMobileExpanded(prev => ({ ...prev, [childKey]: !prev[childKey] }))}
                                      aria-label={childExpanded ? `Collapse ${child.label}` : `Expand ${child.label}`}
                                    >
                                      <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", childExpanded && "rotate-180")} />
                                    </button>
                                  )}
                                </div>
                                <AnimatePresence initial={false}>
                                  {childHasChildren && childExpanded && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: "auto", opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="overflow-hidden"
                                    >
                                      <div className="pl-3 flex flex-col gap-1 border-l border-slate-700/50 ml-1">
                                        {child.children.map((sub: any) => (
                                          <Link
                                            key={sub.label}
                                            to={sub.path}
                                            className="text-xs text-slate-500 hover:text-sky-300 py-1.5"
                                            onClick={() => setIsOpen(false)}
                                          >
                                            {sub.label}
                                          </Link>
                                        ))}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
            <Link to="/contact" className="w-full mt-4">
              <Button className="w-full" variant="glass">Get Started</Button>
            </Link>
          </div>
        </motion.div>
      )}
    </nav>

    {hoveredItem?.children && dropdownRect && createPortal(
      <div
        style={{
          position: "fixed",
          top: dropdownRect.top,
          left: dropdownRect.centerX - 128,
          zIndex: 10020,
        }}
        onMouseEnter={handleNavMouseEnter}
        onMouseLeave={handleNavMouseLeave}
      >
        <AnimatePresence>
          <motion.div
            key={hoveredItem.label}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-64 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl"
          >
            <ScrollableMenu
              items={hoveredItem.children}
              setHoveredSubLink={setHoveredSubLink}
              hoveredSubLink={hoveredSubLink}
              setHoveredLink={setHoveredLink}
              onNearArrowsChange={(near) => { nearArrowsRef.current = near; }}
              knownTopPx={dropdownRect.top}
            />
          </motion.div>
        </AnimatePresence>
      </div>,
      document.body
    )}
    </>
  );
}
