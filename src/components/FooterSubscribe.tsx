"use client";

import { useState } from "react";

/**
 * Footer newsletter signup form.
 *
 * Lives as its own Client Component because the Footer is otherwise a
 * mostly-static block; isolating the form keeps state local and avoids
 * pulling form logic into the parent. POSTs to /api/subscribe with a
 * `source: "footer"` tag so MailerLite can attribute where each
 * subscriber came from.
 *
 * On submit failure we still show the success state would feel wrong
 * here (unlike the exit-intent popup, the footer is a quieter context)
 * so we surface a small inline error and let the user retry.
 */
export default function FooterSubscribe() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });
      if (!res.ok) throw new Error("subscribe failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  // Success state replaces the entire form so the visitor sees the
  // confirmation immediately, with a hint about the MAGICTEN code.
  if (status === "success") {
    return (
      <div className="bg-surface border border-accent p-5">
        <p className="font-serif text-base text-primary">Check your inbox 👑</p>
        <p className="font-sans text-xs text-primary/70 mt-1">
          Your MAGICTEN code is on its way.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
        className="w-full bg-surface border border-surface px-5 py-4 text-sm focus:outline-none focus:border-accent focus:bg-white transition-colors duration-300"
        required
        disabled={status === "loading"}
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-primary text-white px-5 py-4 text-sm font-semibold tracking-widest uppercase hover:bg-accent transition-colors duration-300 disabled:opacity-60"
      >
        {status === "loading" ? "Sending..." : "Subscribe"}
      </button>
      {status === "error" && (
        <p className="text-xs text-red-400">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
