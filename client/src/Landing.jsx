import { useNavigate } from 'react-router-dom'

const FEATURES = [
  {
    title: 'Vector Search',
    desc: 'FAISS-powered semantic similarity search across every page of the book.',
    gradient: 'from-green-600 to-emerald-700',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
      </svg>
    ),
  },
  {
    title: 'Local Embeddings',
    desc: 'HuggingFace sentence-transformers run entirely on your machine. No data leaves.',
    gradient: 'from-emerald-600 to-teal-700',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'No API Key',
    desc: 'Fully offline. No OpenAI, no cloud calls, no cost per query.',
    gradient: 'from-teal-600 to-green-800',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    title: 'Instant Retrieval',
    desc: 'Top-3 most relevant passages returned in milliseconds from the indexed book.',
    gradient: 'from-green-700 to-emerald-500',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="h-screen overflow-hidden bg-[#0a1f0f] text-white flex flex-col font-sans">

      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 shrink-0">
        <span className="text-base font-semibold tracking-tight text-green-400/70">
          Survex
        </span>
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate('/home')}
            className="text-sm text-green-400/60 hover:text-green-300 transition-colors cursor-pointer"
          >
            App
          </button>
          <button
            onClick={() => navigate('/home')}
            className="text-sm font-semibold px-5 py-2 rounded-full bg-green-500 text-[#0a1f0f] hover:bg-green-400 active:scale-95 transition-all cursor-pointer"
          >
            Get started
          </button>
        </div>
      </nav>

      {/* Main — scrollable */}
      <main className="flex-1 overflow-y-auto">

        {/* Hero */}
        <section className="flex flex-col items-center text-center px-6 pt-16 pb-12 gap-5">
          <p className="text-xs font-semibold text-green-500/70 tracking-widest uppercase">
            Retrieval-Augmented Generation
          </p>

          <h1 className="text-7xl sm:text-8xl font-black tracking-tighter leading-none">
            Survex
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-300 to-teal-400">
              {' '}RAG
            </span>
          </h1>

          <p className="text-green-200/40 text-lg max-w-lg leading-relaxed">
            Ask anything about your indexed book. Semantic search powered by FAISS and HuggingFace — running entirely on your machine.
          </p>

          <button
            onClick={() => navigate('/home')}
            className="mt-2 group flex items-center gap-2 px-7 py-3.5 bg-green-500 text-[#0a1f0f] text-sm font-bold rounded-full hover:bg-green-400 active:scale-95 transition-all cursor-pointer shadow-lg shadow-green-900/50"
          >
            Start querying
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </button>
        </section>

        {/* Featured book card */}
        <section className="flex justify-center px-6 pb-12">
          <div
            onClick={() => navigate('/home')}
            className="group flex flex-col sm:flex-row items-center gap-8 max-w-2xl w-full bg-[#0f2d17] hover:bg-[#122e19] border border-green-900/60 rounded-3xl p-8 cursor-pointer transition-all hover:shadow-xl hover:shadow-green-950/60"
          >
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-green-500 to-emerald-700 opacity-30 blur-xl scale-110" />
              <img
                src="/book.png"
                alt="Principles of Building AI Agents"
                className="relative w-28 rounded-xl shadow-lg border border-green-900/40 group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex flex-col gap-3 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-xs font-semibold">Index ready · 135 pages</span>
              </div>
              <h2 className="text-xl font-bold text-white leading-snug">
                Principles of Building AI Agents
              </h2>
              <p className="text-green-200/40 text-sm leading-relaxed">
                Sam Bhagwat · 3rd Edition — The complete guide to building production AI agents. Ask any question and get the most relevant passages instantly.
              </p>
              <span className="text-sm font-semibold text-green-400 group-hover:underline">
                Start asking →
              </span>
            </div>
          </div>
        </section>

        {/* Feature cards grid */}
        <section className="px-6 pb-16 max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-green-500/40 uppercase tracking-widest mb-6 text-center">
            How it works
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="flex flex-col bg-[#0f2d17] border border-green-900/50 rounded-2xl overflow-hidden hover:border-green-700/60 hover:shadow-lg hover:shadow-green-950/50 transition-all"
              >
                <div className={`h-20 bg-gradient-to-br ${f.gradient} flex items-center justify-center`}>
                  {f.icon}
                </div>
                <div className="px-4 py-4 flex flex-col gap-1.5">
                  <p className="text-sm font-bold text-green-100">{f.title}</p>
                  <p className="text-xs text-green-200/40 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="shrink-0 border-t border-green-900/40 px-8 py-4 flex items-center justify-between">
        <span className="text-xs text-green-500/30">© 2025 Survex RAG</span>
        <span className="text-xs text-green-500/30">Powered by FAISS · HuggingFace · FastAPI</span>
      </footer>
    </div>
  )
}
