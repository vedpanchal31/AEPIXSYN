import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";

const SignIn = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // UI-only: route into the app after submit
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden flex items-center justify-center px-5 py-10">
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-15%] left-[10%] w-[600px] h-[600px] rounded-full bg-primary/20 blur-[160px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[520px] h-[520px] rounded-full bg-[hsl(280_90%_60%)]/15 blur-[160px]" />
      </div>

      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link to="/" aria-label="Aepixsyn home">
            <Logo size={40} />
          </Link>
        </div>

        <div className="glass-strong rounded-3xl p-8 md:p-10 shadow-elegant border border-border/60">
          <div className="space-y-2 text-center mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-light">
              Welcome <span className="text-gradient">back</span>.
            </h1>
            <p className="text-sm text-muted-foreground">Sign in to continue creating.</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <Field
              icon={<Mail className="w-4 h-4" />}
              type="email"
              placeholder="you@aepixsyn.com"
              value={email}
              onChange={setEmail}
              label="Email"
              required
            />
            <Field
              icon={<Lock className="w-4 h-4" />}
              type={show ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={setPassword}
              label="Password"
              required
              trailing={
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  className="text-muted-foreground hover:text-foreground transition-smooth"
                  aria-label={show ? "Hide password" : "Show password"}
                >
                  {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-muted-foreground cursor-pointer">
                <input type="checkbox" className="accent-primary" />
                Remember me
              </label>
              <Link to="/forgot" className="text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3.5 rounded-2xl bg-gradient-purple text-primary-foreground text-sm font-medium shadow-glow-soft hover:shadow-glow transition-smooth inline-flex items-center justify-center gap-2"
            >
              Sign in <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <Divider />

          <SocialRow />

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              Create one
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-[10px] tracking-[0.3em] text-muted-foreground">
          AEPIXSYN · WHERE PIXELS MEET INTELLIGENCE
        </p>
      </div>
    </div>
  );
};

export const Field = ({
  icon,
  type,
  placeholder,
  value,
  onChange,
  label,
  required,
  trailing,
}: {
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  label: string;
  required?: boolean;
  trailing?: React.ReactNode;
}) => (
  <div className="space-y-1.5">
    <label className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">{label}</label>
    <div className="glass rounded-2xl px-4 py-1 flex items-center gap-3 border border-border/60 focus-within:border-primary/60 focus-within:shadow-glow-soft transition-smooth">
      <span className="text-muted-foreground">{icon}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-transparent outline-none w-full py-3 text-sm placeholder:text-muted-foreground"
      />
      {trailing}
    </div>
  </div>
);

export const Divider = () => (
  <div className="my-6 flex items-center gap-3 text-[10px] tracking-[0.3em] text-muted-foreground">
    <div className="flex-1 h-px bg-border" />
    OR CONTINUE WITH
    <div className="flex-1 h-px bg-border" />
  </div>
);

export const SocialRow = () => (
  <div className="grid grid-cols-3 gap-3">
    {["Google", "Apple", "GitHub"].map((p) => (
      <button
        key={p}
        type="button"
        className="glass rounded-2xl py-3 text-xs text-muted-foreground hover:text-foreground hover:border-primary/40 border border-border/60 transition-smooth"
      >
        {p}
      </button>
    ))}
  </div>
);

export default SignIn;
