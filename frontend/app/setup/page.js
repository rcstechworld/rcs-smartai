"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SetupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    businessName: "",
    category: "",
    location: "",
    website: "",
    description: "",
    services: "",
    products: "",
    hours: "",
    customers: "",
    tone: "Professional & Friendly",
    offers: "",
    restrictions: "",
  });

  const [consent, setConsent] = useState({
    terms: false,
    ai: false,
    approval: true,
  });
const [saving, setSaving] = useState(false);
const [error, setError] = useState("");

  function update(name, value) {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  async function submit(event) {
    event.preventDefault();

    console.log("SUBMIT CLICKED", form);

    if (!form.businessName || !form.category || !form.location) {
      alert("Please complete Business Name, Category and Location.");
      return;
    }

    if (!consent.terms || !consent.ai) {
      alert("Please accept the required consent options.");
      return;
    }

    setSaving(true);
    setError("");

    const payload = {
      userId: "11111111-1111-1111-1111-111111111111",

      businessName: form.businessName,
      category: form.category,
      location: form.location,
      website: form.website || null,
      description: form.description || null,
      services: form.services || null,
      products: form.products || null,

      businessHours: form.hours || null,
      targetCustomers: form.customers || null,
      aiTone: form.tone || null,
      offers: form.offers || null,
      aiMustNotClaim: form.restrictions || null,

      termsPrivacyConsent: consent.terms,
      aiSuggestionsConsent: consent.ai,
      humanApprovalBeforePublishing: consent.approval,
    };

    try {
      console.log("CALLING BACKEND API", payload);

      const response = await fetch("http://localhost:5000/api/businesses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("BACKEND RESPONSE", response.status);

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Unable to save business.");
      }

      const business = await response.json();

      console.log("BUSINESS CREATED", business);

      localStorage.setItem(
        "rcsSmartAIBusiness",
        JSON.stringify({
          ...form,
          consent,
          businessId: business.id,
          savedAt: new Date().toISOString(),
        })
      );

      router.push("/dashboard");
    } catch (err) {
      console.error("Business Brain save failed:", err);

      setError(
        err.message ||
          "Unable to save your business. Please check that the backend is running."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="setup-page">
      <header className="setup-header">
        <div className="setup-brand">
          <div>R</div>
          <strong>RCS SmartAI</strong>
        </div>

        <div className="step">
          <span>STEP 1 OF 2</span>
          <strong>Business Brain</strong>
        </div>
      </header>

      <section className="setup-card">
        <div className="intro">
          <div className="intro-icon">✦</div>
          <span className="kicker">BUSINESS BRAIN</span>
          <h1>Tell AI about your business</h1>
          <p>
            The better SmartAI understands your business, the more accurate
            your review replies and growth posts will be.
          </p>
        </div>

        <form onSubmit={submit}>
          <div className="section-title">Basic business information</div>

          <div className="form-grid">
            <Field
              label="Business name *"
              value={form.businessName}
              placeholder="e.g. RCS Tech World"
              onChange={(value) => update("businessName", value)}
            />

            <Field
              label="Business category *"
              value={form.category}
              placeholder="e.g. Computer Store"
              onChange={(value) => update("category", value)}
            />

            <Field
              label="Business location *"
              value={form.location}
              placeholder="City, State"
              onChange={(value) => update("location", value)}
            />

            <Field
              label="Website"
              value={form.website}
              placeholder="https://example.com"
              onChange={(value) => update("website", value)}
            />
          </div>

          <Field
            label="Business description"
            value={form.description}
            placeholder="What does your business do?"
            multiline
            onChange={(value) => update("description", value)}
          />

          <div className="form-grid">
            <Field
              label="Services"
              value={form.services}
              placeholder="Repair, installation, consulting..."
              multiline
              onChange={(value) => update("services", value)}
            />

            <Field
              label="Products"
              value={form.products}
              placeholder="Laptops, accessories..."
              multiline
              onChange={(value) => update("products", value)}
            />
          </div>

          <div className="form-grid">
            <Field
              label="Business hours"
              value={form.hours}
              placeholder="Mon-Sat, 10 AM - 8 PM"
              onChange={(value) => update("hours", value)}
            />

            <Field
              label="Target customers"
              value={form.customers}
              placeholder="Students, families, local businesses..."
              onChange={(value) => update("customers", value)}
            />
          </div>

          <div className="section-title">AI preferences</div>

          <label className="normal-label">
            AI communication tone
            <select
              value={form.tone}
              onChange={(e) => update("tone", e.target.value)}
            >
              <option>Professional & Friendly</option>
              <option>Friendly & Casual</option>
              <option>Professional & Formal</option>
              <option>Warm & Personal</option>
            </select>
          </label>

          <Field
            label="Current offers or promotions"
            value={form.offers}
            placeholder="Only enter offers that are currently valid."
            multiline
            onChange={(value) => update("offers", value)}
          />

          <div className="warning-box">
            <strong>🚫 Things AI must NOT claim</strong>
            <p>
              Tell SmartAI anything it must never invent or promise—for
              example prices, discounts, warranty terms, stock availability or
              services you don't provide.
            </p>

            <textarea
              value={form.restrictions}
              placeholder="Example: Never promise same-day delivery. Never invent prices."
              onChange={(e) => update("restrictions", e.target.value)}
            />
          </div>

          <div className="section-title">Permissions & consent</div>

          <label className="check-row">
            <input
              type="checkbox"
              checked={consent.terms}
              onChange={(e) =>
                setConsent({ ...consent, terms: e.target.checked })
              }
            />
            <span>
              I agree to the RCS SmartAI Terms & Privacy Policy.
            </span>
          </label>

          <label className="check-row">
            <input
              type="checkbox"
              checked={consent.ai}
              onChange={(e) =>
                setConsent({ ...consent, ai: e.target.checked })
              }
            />
            <span>
              I allow RCS SmartAI to generate AI suggestions for my business.
            </span>
          </label>

          <label className="check-row">
            <input
              type="checkbox"
              checked={consent.approval}
              onChange={(e) =>
                setConsent({ ...consent, approval: e.target.checked })
              }
            />
            <span>
              <strong>Ask me before publishing anything</strong> — recommended
              for the trial.
            </span>
          </label>
{error && (
  <div
    style={{
      marginTop: "20px",
      padding: "12px 14px",
      borderRadius: "10px",
      background: "#fff1f1",
      border: "1px solid #ffd2d2",
      color: "#c0392b",
      fontSize: "11px",
      lineHeight: 1.5,
    }}
  >
    {error}
  </div>
)}

          <div className="actions">
            <button
              type="button"
              className="back-button"
              onClick={() => router.push("/")}
            >
              ← Back
            </button>

            <button
  type="submit"
  className="continue-button"
  disabled={saving}
>
  {saving ? "Saving..." : "Save & Continue →"}
</button>
          </div>
        </form>
      </section>

      <p className="footer-note">
        You can update or disconnect your business information later.
      </p>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #f6f7fb;
          color: #18202f;
          font-family:
            Inter,
            ui-sans-serif,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        }

        button,
        input,
        textarea,
        select {
          font: inherit;
        }

        .setup-page {
          min-height: 100vh;
          padding-bottom: 40px;
        }

        .setup-header {
          height: 70px;
          padding: 0 7%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: white;
          border-bottom: 1px solid #e8eaf0;
        }

        .setup-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 15px;
        }

        .setup-brand div {
          width: 34px;
          height: 34px;
          display: grid;
          place-items: center;
          background: #6559dd;
          color: white;
          border-radius: 9px;
          font-weight: 800;
        }

        .step {
          text-align: right;
        }

        .step span,
        .step strong {
          display: block;
        }

        .step span {
          color: #929aaa;
          font-size: 8px;
          letter-spacing: .1em;
          font-weight: 800;
        }

        .step strong {
          color: #4e5666;
          font-size: 10px;
          margin-top: 3px;
        }

        .setup-card {
          width: min(850px, calc(100% - 30px));
          margin: 30px auto 0;
          background: white;
          border: 1px solid #e3e6ed;
          border-radius: 17px;
          padding: 34px 40px;
          box-shadow: 0 15px 45px rgba(30, 39, 58, .06);
        }

        .intro {
          text-align: center;
          max-width: 600px;
          margin: 0 auto 30px;
        }

        .intro-icon {
          width: 46px;
          height: 46px;
          display: grid;
          place-items: center;
          margin: 0 auto 12px;
          border-radius: 13px;
          background: #eeecff;
          color: #6559dd;
          font-size: 22px;
        }

        .kicker {
          color: #8b94a5;
          font-size: 9px;
          letter-spacing: .12em;
          font-weight: 800;
        }

        .intro h1 {
          margin: 6px 0;
          font-size: 25px;
        }

        .intro p {
          margin: 0;
          color: #7b8597;
          font-size: 11px;
          line-height: 1.65;
        }

        .section-title {
          border-top: 1px solid #edf0f4;
          padding-top: 22px;
          margin: 25px 0 15px;
          font-size: 13px;
          font-weight: 800;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 15px;
        }

        label {
          display: block;
        }

        .normal-label {
          color: #3d4657;
          font-size: 10px;
          font-weight: 700;
          margin-bottom: 15px;
        }

        input:not([type="checkbox"]),
        textarea,
        select {
          width: 100%;
          border: 1px solid #dfe3ea;
          border-radius: 8px;
          margin-top: 7px;
          padding: 10px 11px;
          color: #202838;
          background: white;
          outline: none;
          font-size: 11px;
        }

        textarea {
          min-height: 80px;
          resize: vertical;
          line-height: 1.5;
        }

        input:focus,
        textarea:focus,
        select:focus {
          border-color: #7065e3;
          box-shadow: 0 0 0 3px rgba(112, 101, 227, .09);
        }

        .warning-box {
          background: #fffaf0;
          border: 1px solid #f3e3b8;
          border-radius: 10px;
          padding: 14px;
          margin-top: 15px;
        }

        .warning-box strong {
          color: #6b5318;
          font-size: 11px;
        }

        .warning-box p {
          color: #88754a;
          font-size: 9px;
          line-height: 1.6;
          margin: 5px 0;
        }

        .warning-box textarea {
          background: #fff;
        }

        .check-row {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          color: #687284;
          font-size: 10px;
          line-height: 1.5;
          margin: 11px 0;
        }

        .check-row input {
          margin: 2px 0 0;
          accent-color: #6559dd;
        }

        .actions {
          display: flex;
          justify-content: space-between;
          margin-top: 28px;
          padding-top: 20px;
          border-top: 1px solid #edf0f4;
        }

        .back-button,
        .continue-button {
          border-radius: 8px;
          padding: 10px 15px;
          cursor: pointer;
          font-size: 10px;
          font-weight: 750;
        }

        .back-button {
          border: 1px solid #dfe3ea;
          background: white;
          color: #657083;
        }

        .continue-button {
          border: 0;
          background: #6559dd;
          color: white;
        }

        .footer-note {
          text-align: center;
          color: #969eac;
          font-size: 9px;
          margin: 15px;
        }

        @media (max-width: 650px) {
          .setup-header {
            padding: 0 20px;
          }

          .setup-card {
            padding: 25px 20px;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}

function Field({ label, value, placeholder, onChange, multiline = false }) {
  return (
    <label className="normal-label">
      {label}
      {multiline ? (
        <textarea
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  );
}
