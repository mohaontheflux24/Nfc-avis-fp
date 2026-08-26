"use client";

import { useState } from "react";

export type MerchantSettings = {
  name: string;
  logoUrl: string | null;
  googleReviewUrl: string | null;
  whatsappNumber: string | null;
  contactEmail: string | null;
  primaryColor: string;
  accentColor: string;
};

export default function SettingsForm({
  initial,
  onSaved,
}: {
  initial: MerchantSettings;
  onSaved?: (m: MerchantSettings) => void;
}) {
  const [form, setForm] = useState<MerchantSettings>(initial);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function set<K extends keyof MerchantSettings>(key: K, value: MerchantSettings[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const res = await fetch("/api/dashboard/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setMessage("Paramètres enregistrés.");
      onSaved?.(form);
    } catch {
      setMessage("Erreur lors de l'enregistrement.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card-surface space-y-5 p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block font-sans text-sm font-medium text-ink-800">
            Nom du commerce
          </label>
          <input
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            className="input-field"
            required
          />
        </div>
        <div>
          <label className="mb-1.5 block font-sans text-sm font-medium text-ink-800">
            URL du logo
          </label>
          <input
            value={form.logoUrl ?? ""}
            onChange={(e) => set("logoUrl", e.target.value)}
            className="input-field"
            placeholder="https://…"
          />
        </div>
      </div>

      <div>
        <label className="mb-1.5 block font-sans text-sm font-medium text-ink-800">
          Lien Google Avis
        </label>
        <input
          value={form.googleReviewUrl ?? ""}
          onChange={(e) => set("googleReviewUrl", e.target.value)}
          className="input-field"
          placeholder="https://g.page/r/votre-commerce/review"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block font-sans text-sm font-medium text-ink-800">
            Numéro WhatsApp
          </label>
          <input
            value={form.whatsappNumber ?? ""}
            onChange={(e) => set("whatsappNumber", e.target.value)}
            className="input-field"
            placeholder="+33612345678"
          />
        </div>
        <div>
          <label className="mb-1.5 block font-sans text-sm font-medium text-ink-800">
            E-mail de contact
          </label>
          <input
            value={form.contactEmail ?? ""}
            onChange={(e) => set("contactEmail", e.target.value)}
            type="email"
            className="input-field"
            placeholder="contact@moncommerce.fr"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block font-sans text-sm font-medium text-ink-800">
            Couleur principale
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={form.primaryColor}
              onChange={(e) => set("primaryColor", e.target.value)}
              className="h-11 w-14 cursor-pointer rounded-lg border border-ink-800/10"
            />
            <input
              value={form.primaryColor}
              onChange={(e) => set("primaryColor", e.target.value)}
              className="input-field"
            />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block font-sans text-sm font-medium text-ink-800">
            Couleur d&apos;accent
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={form.accentColor}
              onChange={(e) => set("accentColor", e.target.value)}
              className="h-11 w-14 cursor-pointer rounded-lg border border-ink-800/10"
            />
            <input
              value={form.accentColor}
              onChange={(e) => set("accentColor", e.target.value)}
              className="input-field"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-1">
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? "Enregistrement…" : "Enregistrer les modifications"}
        </button>
        {message && <p className="font-sans text-sm text-slate-450">{message}</p>}
      </div>
    </form>
  );
}
