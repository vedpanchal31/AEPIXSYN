import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Field, Divider, SocialRow } from "./SignIn";

const SignUp = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden flex items-center justify-center px-5 py-10">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-15%] right-[5%] w-[600px] h-[600px] rounded-full bg-primary/20 blur-[160px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[520px] h-[520px] rounded-full bg-[hsl(200_90%_55%)]/15 blur-[160px]" />
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
              Create your <span className="text-gradient">account</span>.
            </h1>
            <p className="text-sm text-muted-foreground">Join creators elevating every pixel.</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <Field
              icon={<User className="w-4 h-4" />}
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={setName}
              label="Name"
              required
            />
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
              placeholder="At least 8 characters"
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

            <label className="flex items-start gap-2 text-xs text-muted-foreground cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="accent-primary mt-0.5"
                required
              />
              <span>
                I agree to the{" "}
                <Link to="/" className="text-primary hover:underline">Terms</Link> and{" "}
                <Link to="/" className="text-primary hover:underline">Privacy Policy</Link>.
              </span>
            </label>

            <button
              type="submit"
              className="w-full mt-2 py-3.5 rounded-2xl bg-gradient-purple text-primary-foreground text-sm font-medium shadow-glow-soft hover:shadow-glow transition-smooth inline-flex items-center justify-center gap-2"
            >
              Create account <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <Divider />
          <SocialRow />

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link to="/signin" className="text-primary hover:underline">
              Sign in
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

export default SignUp;
