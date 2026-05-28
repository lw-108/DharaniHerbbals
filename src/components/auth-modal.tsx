import * as React from "react";
import { Eye, EyeOff, Leaf, Loader2, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultMode?: "signin" | "signup";
  onSuccess: (user: { name: string; email: string; avatarUrl?: string }) => void;
}

export function AuthModal({ open, onOpenChange, defaultMode = "signin", onSuccess }: AuthModalProps) {
  const [mode, setMode] = React.useState<"signin" | "signup">(defaultMode);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState("");

  // Sync defaultMode when modal opens
  React.useEffect(() => {
    if (open) {
      setMode(defaultMode);
      setError("");
      setSuccess(false);
      setName("");
      setEmail("");
      setMobile("");
      setPassword("");
    }
  }, [open, defaultMode]);

  const isSignUp = mode === "signup";

  const validate = () => {
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    if (isSignUp && !name.trim()) {
      setError("Please enter your full name.");
      return false;
    }
    if (isSignUp && !mobile.trim()) {
      setError("Please enter your mobile number.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    setLoading(true);
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSuccess(true);

    await new Promise((r) => setTimeout(r, 700));
    onSuccess({
      name: isSignUp ? name.trim() : email.split("@")[0],
      email: email.trim(),
      ...(isSignUp && { mobile: mobile.trim() }),
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden rounded-2xl border border-border/60 shadow-2xl bg-card">
        {/* Top accent strip */}
        <div className="h-1.5 w-full bg-gradient-to-r from-primary via-teal-400 to-emerald-500" />

        <div className="px-8 pb-8 pt-6">
          {/* Brand mark */}
          <div className="flex items-center gap-2.5 mb-6">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Leaf className="size-5 text-primary" />
            </div>
            <div className="leading-tight">
              <p className="text-xs text-muted-foreground font-medium">Dharani</p>
              <p className="text-sm font-extrabold text-primary font-serif leading-none">Herbbals</p>
            </div>
          </div>

          {/* Title */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground tracking-tight">
              {isSignUp ? "Create your account" : "Welcome back"}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {isSignUp
                ? "Join thousands who trust pure Ayurvedic wellness."
                : "Sign in to access your orders and wishlist."}
            </p>
          </div>

          {/* Tab Toggle */}
          <div className="flex bg-muted rounded-xl p-1 mb-6">
            {(["signin", "signup"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => { setMode(m); setError(""); }}
                className={cn(
                  "flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200",
                  mode === m
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {m === "signin" ? "Sign In" : "Sign Up"}
              </button>
            ))}
          </div>

          {/* Form */}
          {success ? (
            <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
              <CheckCircle2 className="size-14 text-primary animate-in zoom-in-50 duration-300" />
              <p className="text-base font-bold text-foreground">
                {isSignUp ? "Account created!" : "Signed in!"}
              </p>
              <p className="text-sm text-muted-foreground">Redirecting you now…</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {isSignUp && (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="auth-name" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Full Name
                  </Label>
                  <Input
                    id="auth-name"
                    type="text"
                    placeholder="e.g. Priya Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 rounded-xl border-border/60 bg-background/60 focus-visible:ring-primary/40 text-sm"
                    autoComplete="name"
                  />
                  <Input
                    id="auth-mobile"
                    type="tel"
                    placeholder="e.g. +91-9876543210"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="h-11 rounded-xl border-border/60 bg-background/60 focus-visible:ring-primary/40 text-sm"
                    autoComplete="tel"
                  />
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="auth-email" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Email Address
                </Label>
                <Input
                  id="auth-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 rounded-xl border-border/60 bg-background/60 focus-visible:ring-primary/40 text-sm"
                  autoComplete="email"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="auth-password" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="auth-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 rounded-xl border-border/60 bg-background/60 focus-visible:ring-primary/40 text-sm pr-11"
                    autoComplete={isSignUp ? "new-password" : "current-password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <p className="text-xs text-destructive font-medium bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              {/* Submit */}
              <Button
                type="submit"
                disabled={loading}
                className="h-11 mt-1 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm w-full shadow-lg shadow-primary/20 transition-all duration-200 hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" />
                    {isSignUp ? "Creating account…" : "Signing in…"}
                  </span>
                ) : (
                  isSignUp ? "Create Account" : "Sign In"
                )}
              </Button>

              {/* Switch mode link */}
              <p className="text-center text-xs text-muted-foreground mt-1">
                {isSignUp ? "Already have an account?" : "New to Dharani Herbbals?"}{" "}
                <button
                  type="button"
                  onClick={() => { setMode(isSignUp ? "signin" : "signup"); setError(""); }}
                  className="text-primary font-semibold hover:underline underline-offset-2"
                >
                  {isSignUp ? "Sign in" : "Create account"}
                </button>
              </p>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
