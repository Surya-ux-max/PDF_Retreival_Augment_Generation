import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <span className="text-lg font-semibold tracking-tight">PDF RAG</span>
        <button
          onClick={() => navigate('/home')}
          className="text-sm text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          Sign in
        </button>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 gap-8">
        <div className="flex flex-col items-center gap-6 max-w-3xl">
          {/* Glow orb */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 blur-xl opacity-80" />

          <h1 className="text-5xl sm:text-6xl font-semibold tracking-tight leading-tight">
            Ask anything about
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
              your PDF
            </span>
          </h1>

          <p className="text-white/50 text-lg max-w-xl leading-relaxed">
            Upload any PDF, build a local vector index, and query it with natural
            language — no API keys, no cloud, everything runs on your machine.
          </p>

          <button
            onClick={() => navigate('/home')}
            className="mt-2 px-8 py-3.5 bg-white text-black text-sm font-medium rounded-full hover:bg-white/90 active:scale-95 transition-all cursor-pointer"
          >
            Get started
          </button>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {['FAISS vector search', 'HuggingFace embeddings', '100% local', 'No API key needed'].map((f) => (
            <span
              key={f}
              className="px-4 py-1.5 rounded-full border border-white/10 text-white/40 text-xs"
            >
              {f}
            </span>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-white/20 text-xs border-t border-white/10">
        PDF RAG — Retrieval-Augmented Generation
      </footer>
    </div>
  )
}
