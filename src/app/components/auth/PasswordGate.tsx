import React, { useState, useEffect } from "react";
import { GlassCard } from "../ui/GlassCard";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Lock, ArrowRight, AlertCircle } from "lucide-react";

export function PasswordGate({ children }: { children: React.ReactNode }) {
  const [isProtected, setIsProtected] = useState<boolean | null>(null); // null = loading
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    sessionStorage.removeItem("site_access_granted_v2");

    const checkProtection = async () => {
      try {
        const res = await fetch('/content.json');
        if (res.ok) {
          const data = await res.json();
          const enabled = !!data.site_settings?.password_protection?.enabled;
          setIsProtected(enabled);
          return;
        }
      } catch {
        // No local content.json — default to not protected
      }
      setIsProtected(false);
    };

    checkProtection();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "donotfearai") {
      // We deliberately do NOT write to sessionStorage here so that every
      // page load / refresh requires the password again while testing.
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (isProtected === null) {
    // Loading state
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isProtected || isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1920')] opacity-10 mix-blend-overlay bg-cover bg-center" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-600/10 rounded-full blur-[120px]" />

      <GlassCard className="max-w-md w-full p-8 border-white/10 bg-slate-800/50 backdrop-blur-xl relative z-10 shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-sky-500/10 flex items-center justify-center border border-sky-500/20 shadow-[0_0_15px_rgba(14,165,233,0.3)]">
            <Lock className="w-8 h-8 text-sky-400" />
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Restricted Access</h2>
          <p className="text-slate-400">
            This site is currently in private preview. <br/> Please enter the access password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input 
              type="password" 
              placeholder="Enter password" 
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              className={`bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-600 focus:border-sky-500 focus:ring-sky-500/20 ${error ? "border-rose-500 focus:border-rose-500" : ""}`}
              autoFocus
            />
            {error && (
              <div className="flex items-center gap-2 text-rose-400 text-sm animate-in fade-in slide-in-from-top-1">
                <AlertCircle className="w-4 h-4" />
                <span>Incorrect password</span>
              </div>
            )}
          </div>
          
          <Button type="submit" className="w-full bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-900/20">
            Access Site <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-medium">
            Aurix AI Solutions
          </p>
        </div>
      </GlassCard>
    </div>
  );
}