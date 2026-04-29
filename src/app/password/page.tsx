"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PasswordPage() {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === "AMPUnity2026") {
      localStorage.setItem("site_auth", "granted");
      router.replace("/");
    } else {
      setError(true);
      setValue("");
    }
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={value}
            onChange={(e) => { setValue(e.target.value); setError(false); }}
            placeholder="Password"
            autoFocus
            className="font-mono text-sm border border-black/20 px-4 py-3 bg-white text-black placeholder:text-black/30 outline-none focus:border-black transition-colors"
          />
          {error && (
            <p className="font-mono text-xs text-[#e63329] uppercase tracking-widest">
              Incorrect password
            </p>
          )}
          <button
            type="submit"
            className="font-mono text-xs uppercase tracking-widest bg-black text-white px-5 py-3 hover:bg-[#e63329] transition-colors"
          >
            Enter
          </button>
        </form>
      </div>
    </main>
  );
}
