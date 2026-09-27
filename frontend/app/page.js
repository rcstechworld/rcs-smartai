"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const form = new FormData(event.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (mode === "signup") {
      const name = form.get("name");

      if (!name) {
        setError("Please enter your name.");
        return;
      }

      localStorage.setItem(
        "rcsSmartAIUser",
        JSON.stringify({
          name,
          email,
          createdAt: new Date().toISOString(),
        })
      );

      router.push("/setup");
      return;
    }

    localStorage.setItem(
      "rcsSmartAIUser",
      JSON.stringify({
        name: "Business Owner",
        email,
      })
    );

    router.push("/dashboard");
  }

  return (
    <main className="auth-page">
      <div className="auth-brand">
        <div className="brand-mark">R</div>
        <div>
          <strong>RCS SmartAI</strong>
          <span>Your AI Business Manager</span>
        </div>
      </div>

      <section className="auth-card">
        <div className="auth-header">
          <div className="ai-icon">✦</div>

          <h1>
            {mode === "login"
              ? "Welcome back"
              : "Create your SmartAI account"}
          </h1>

          <p>
            {mode === "login"
              ? "Sign in to manage your business with AI."
              : "Start managing your Google Business Profile with AI."}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === "signup" && (
            <label>
              Your name
              <input
                name="name"
                type="text"
                placeholder="e.g. Birender Punia"
              />
            </label>
          )}

          <label>
            Email address
            <input
              name="email"
              type="email"
              placeholder="you@business.com"
              autoComplete="email"
            />
          </label>

          <label>
            Password
            <div className="password-wrap">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          {error && <div className="error">{error}</div>}

          <button className="submit-button" type="submit">
            {mode === "login" ? "Sign in →" : "Create account →"}
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <button className="google-button" type="button">
          <span className="google-g">G</span>
          Continue with Google
        </button>

        <div className="switch-mode">
          {mode === "login" ? (
            <>
              Don't have an account?{" "}
              <button onClick={() => setMode("signup")}>
                Create one
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button onClick={() => setMode("login")}>
                Sign in
              </button>
            </>
          )}
        </div>
      </section>

      <div className="security-note">
        🔒 Your Google password is never required. Google Business Profile
        access will use secure OAuth authorization.
      </div>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
          background: #f6f7fb;
          color: #18202f;
        }

        button,
        input {
          font: inherit;
        }

        .auth-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 30px 20px;
          background:
            radial-gradient(circle at 20% 20%, #eeebff 0, transparent 30%),
            radial-gradient(circle at 80% 80%, #e9f0ff 0, transparent 30%),
            #f6f7fb;
        }

        .auth-brand {
          display: flex;
          align-items: center;
          gap: 11px;
          margin-bottom: 22px;
        }

        .brand-mark {
          width: 43px;
          height: 43px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          background: #6659e8;
          color: white;
          font-size: 22px;
          font-weight: 800;
          box-shadow: 0 8px 20px rgba(102, 89, 232, 0.25);
        }

        .auth-brand strong,
        .auth-brand span {
          display: block;
        }

        .auth-brand strong {
          font-size: 18px;
        }

        .auth-brand span {
          color: #7c8799;
          font-size: 10px;
          margin-top: 2px;
        }

        .auth-card {
          width: min(430px, 100%);
          background: white;
          border: 1px solid #e4e7ee;
          border-radius: 18px;
          padding: 32px;
          box-shadow: 0 18px 55px rgba(35, 43, 62, 0.08);
        }

        .auth-header {
          text-align: center;
          margin-bottom: 25px;
        }

        .ai-icon {
          width: 46px;
          height: 46px;
          margin: 0 auto 14px;
          display: grid;
          place-items: center;
          border-radius: 13px;
          background: #eeecff;
          color: #6559dd;
          font-size: 22px;
        }

        .auth-header h1 {
          margin: 0;
          font-size: 23px;
          letter-spacing: -0.03em;
        }

        .auth-header p {
          color: #7d8798;
          font-size: 11px;
          margin: 7px 0 0;
        }

        form {
          display: grid;
          gap: 15px;
        }

        label {
          color: #3d4657;
          font-size: 11px;
          font-weight: 700;
        }

        input {
          display: block;
          width: 100%;
          margin-top: 7px;
          border: 1px solid #dfe3ea;
          border-radius: 8px;
          padding: 11px 12px;
          outline: none;
          color: #18202f;
          background: white;
          font-size: 12px;
        }

        input:focus {
          border-color: #7166e7;
          box-shadow: 0 0 0 3px rgba(113, 102, 231, 0.1);
        }

        .password-wrap {
          position: relative;
        }

        .password-wrap input {
          padding-right: 60px;
        }

        .password-wrap button {
          position: absolute;
          right: 8px;
          top: 8px;
          border: 0;
          background: transparent;
          color: #6659dd;
          font-size: 9px;
          font-weight: 700;
          cursor: pointer;
        }

        .error {
          border-radius: 7px;
          padding: 9px 10px;
          background: #fff0f1;
          color: #c33d4e;
          font-size: 10px;
        }

        .submit-button {
          border: 0;
          border-radius: 8px;
          padding: 12px;
          background: #6559dd;
          color: white;
          font-weight: 750;
          font-size: 11px;
          cursor: pointer;
          box-shadow: 0 7px 16px rgba(101, 89, 221, 0.2);
        }

        .submit-button:hover {
          background: #574bcf;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #a0a7b4;
          font-size: 9px;
          margin: 20px 0;
        }

        .divider:before,
        .divider:after {
          content: "";
          height: 1px;
          flex: 1;
          background: #eceef2;
        }

        .google-button {
          width: 100%;
          border: 1px solid #dfe3ea;
          border-radius: 8px;
          background: white;
          color: #3e4654;
          padding: 10px;
          cursor: pointer;
          font-size: 11px;
          font-weight: 650;
        }

        .google-g {
          color: #4285f4;
          margin-right: 8px;
          font-weight: 900;
        }

        .switch-mode {
          text-align: center;
          margin-top: 21px;
          color: #858e9f;
          font-size: 10px;
        }

        .switch-mode button {
          border: 0;
          background: transparent;
          color: #6256dc;
          font-weight: 750;
          cursor: pointer;
        }

        .security-note {
          max-width: 430px;
          margin-top: 15px;
          text-align: center;
          color: #8992a1;
          font-size: 9px;
          line-height: 1.6;
        }
      `}</style>
    </main>
  );
}
