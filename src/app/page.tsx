"use client";

import { useState } from "react";

export default function FunnelIA() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<{ title: string; subtitle: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const generateLandingPage = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-zinc-700 font-sans">
      {/* Barre de navigation minimaliste */}
      <nav className="p-6 border-b border-white/5 flex justify-between items-center">
        <div className="text-sm font-bold tracking-widest uppercase">Funnel.IA</div>
        <div className="text-[10px] text-zinc-500 uppercase tracking-widest border border-zinc-800 px-2 py-1 rounded">Beta Access</div>
      </nav>

      <main className="max-w-4xl mx-auto pt-24 px-6 pb-20">
        {/* Section Entrée */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
            Transformez votre idée en <br />
            <span className="text-zinc-500">landing page haute performance.</span>
          </h1>
          <p className="text-zinc-400 text-sm max-w-md mx-auto">
            Décrivez votre service en une phrase, l'IA s'occupe du design et de la persuasion.
          </p>
        </div>

        <div className="relative group">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ex: Un service de conciergerie de luxe pour villas..."
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-6 py-5 outline-none focus:border-zinc-500 transition-all text-lg placeholder:text-zinc-700 shadow-2xl"
          />
          <button
            onClick={generateLandingPage}
            disabled={loading}
            className="absolute right-3 top-3 bottom-3 px-8 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors disabled:bg-zinc-800 disabled:text-zinc-500"
          >
            {loading ? "Génération..." : "Générer"}
          </button>
        </div>

        {/* Section Résultat (Aperçu de la page) */}
        {result && (
          <div className="mt-20 border border-zinc-800 bg-zinc-900/20 rounded-2xl overflow-hidden shadow-[0_0_50px_-12px_rgba(255,255,255,0.05)]">
            <div className="p-4 border-b border-zinc-800 flex gap-2">
              <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
              <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
              <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
            </div>
            <div className="p-12 md:p-20 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
                {result.title}
              </h2>
              <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                {result.subtitle}
              </p>
              <div className="mt-10">
                <button className="px-8 py-4 bg-white text-black font-bold rounded-full">
                  Démarrer maintenant
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}