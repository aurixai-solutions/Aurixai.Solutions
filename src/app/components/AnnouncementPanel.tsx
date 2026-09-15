import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";

const SESSION_KEY = "aurix_announcement_collapsed";
const SESSION_DURATION = 10 * 60 * 1000; // 10 minutes

interface AnnouncementData {
  content: string;
  timestamp?: number;
}

export function AnnouncementPanel() {
  const [content, setContent] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSessionState, setHasSessionState] = useState(false);
  const sessionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Load announcement content from server
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/content.json");
        if (res.ok) {
          const data = await res.json();
          const announcement = data?.announcement;
          if (announcement?.content?.trim()) {
            setContent(announcement.content);
          }
        }
      } catch (err) {
        console.log("[AnnouncementPanel] Failed to load announcement:", err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // Load session state on mount
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.collapsed !== undefined && Date.now() - parsed.timestamp < SESSION_DURATION) {
          setIsCollapsed(parsed.collapsed);
          setHasSessionState(true);
        } else {
          // Session expired, clear it
          sessionStorage.removeItem(SESSION_KEY);
        }
      }
    } catch {
      // Invalid session data, ignore
    }
  }, []);

  // Auto-open 0.5s after load if no session state exists
  useEffect(() => {
    if (!isLoading && content.trim() && !hasSessionState) {
      const timer = setTimeout(() => {
        setIsCollapsed(false);
        updateSessionState(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoading, content, hasSessionState]);

  // Save session state when collapsed state changes
  const updateSessionState = (collapsed: boolean) => {
    try {
      sessionStorage.setItem(
        SESSION_KEY,
        JSON.stringify({ collapsed, timestamp: Date.now() })
      );
      
      // Clear existing timer
      if (sessionTimerRef.current) {
        clearTimeout(sessionTimerRef.current);
      }
      
      // Set new timer to clear session after 10 minutes
      sessionTimerRef.current = setTimeout(() => {
        sessionStorage.removeItem(SESSION_KEY);
      }, SESSION_DURATION);
    } catch {
      // SessionStorage might be unavailable
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (sessionTimerRef.current) {
        clearTimeout(sessionTimerRef.current);
      }
    };
  }, []);

  const handleToggle = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    updateSessionState(newState);
  };

  // Don't render if still loading or no content
  if (isLoading || !content.trim()) {
    return null;
  }

  return (
    <div className="relative w-full z-[50]" style={{ background: "transparent" }}>
      {/* Announcement Content Panel */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="relative mx-auto px-6 py-6 overflow-hidden"
              style={{
                minHeight: "100px",
                maxHeight: "200px",
                background: "rgba(241, 245, 249, 0.65)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.5), inset 0 -1px 2px rgba(0, 0, 0, 0.05)",
                borderTop: "1px solid rgba(255, 140, 66, 0.15)",
                borderLeft: "1px solid rgba(255, 255, 255, 0.3)",
                borderRight: "1px solid rgba(255, 255, 255, 0.3)",
              }}
            >
              {/* Decorative gradient overlay */}
              <div
                className="absolute top-0 left-0 right-0 h-12 pointer-events-none"
                style={{
                  background: "linear-gradient(180deg, rgba(255, 140, 66, 0.08) 0%, transparent 100%)",
                }}
              />

              {/* Content */}
              <div
                className="relative text-slate-700 text-sm md:text-base leading-relaxed overflow-y-auto"
                style={{
                  maxHeight: "176px",
                }}
              >
                <div className="prose prose-sm max-w-none prose-slate">
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tab at bottom */}
      <div className="absolute left-0 right-0 z-[50]" style={{ top: "100%", background: "transparent" }}>
        {/* Orange line — always visible, stays with the tab */}
        <div className="w-full h-[3px] bg-[#FF8C42]" />
        {/* Tab button centered below line */}
        <div className="flex justify-center" style={{ background: "transparent" }}>
          <motion.button
            onClick={handleToggle}
            className="relative z-20 flex items-center justify-center cursor-pointer transition-all duration-250 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-[#FF8C42]/50 focus:ring-offset-2"
            style={{
              width: "42px",
              height: "24px",
              background: "linear-gradient(135deg, #FF8C42 0%, #FF7A2E 100%)",
              boxShadow: "0 4px 12px rgba(255, 140, 66, 0.3)",
              borderRadius: "0 0 12px 12px",
            }}
            aria-label={isCollapsed ? "Expand announcement" : "Collapse announcement"}
            aria-expanded={!isCollapsed}
          >
            {/* Left concave corner */}
            <span
              className="absolute pointer-events-none"
              style={{
                top: "-3px",
                right: "100%",
                width: "10px",
                height: "13px",
                background: "transparent",
                borderTopRightRadius: "10px",
                boxShadow: "4px 0 0 0 #FF8C42",
              }}
            />
            {/* Right concave corner */}
            <span
              className="absolute pointer-events-none"
              style={{
                top: "-3px",
                left: "100%",
                width: "10px",
                height: "13px",
                background: "transparent",
                borderTopLeftRadius: "10px",
                boxShadow: "-4px 0 0 0 #FF8C42",
              }}
            />
            {isCollapsed ? (
              <ChevronDown className="w-4 h-4 text-white" />
            ) : (
              <ChevronUp className="w-4 h-4 text-white" />
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}