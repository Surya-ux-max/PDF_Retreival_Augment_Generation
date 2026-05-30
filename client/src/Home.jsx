import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Message({ role, chunks }) {
  if (role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-xl px-4 py-3 rounded-2xl bg-green-500 text-[#0a1f0f] text-sm font-medium leading-relaxed">
          {chunks}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {chunks.map((chunk, i) => (
        <div key={i} className="flex gap-3 items-start">
          <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-[10px] font-bold text-[#0a1f0f]">
            {i + 1}
          </span>
          <div className="flex-1 px-4 py-3 rounded-2xl bg-[#0f2d17] border border-green-900/50 text-green-100/80 text-sm leading-relaxed whitespace-pre-wrap">
            {chunk.content}
          </div>
        </div>
      ))}
    </div>
  )
}

function BookPanel() {
  return (
    <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-green-900/40 bg-[#0c2410] p-6 gap-5 overflow-y-auto">

      <p className="text-[10px] font-bold text-green-500/40 uppercase tracking-widest">Source document</p>

      <div className="relative flex items-center justify-center py-2">
        <div className="absolute w-32 h-32 rounded-full bg-green-600/20 blur-2xl" />
        <img
          src="/book.png"
          alt="Principles of Building AI Agents"
          className="relative w-28 rounded-xl shadow-lg shadow-green-950/60 border border-green-900/40"
        />
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-green-100 text-sm font-bold leading-snug">
          Principles of Building AI Agents
        </p>
        <p className="text-green-400/40 text-xs">Sam Bhagwat · 3rd Edition</p>
      </div>

      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-green-950/60 border border-green-800/40">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
        <span className="text-green-400 text-xs font-semibold">Index ready · 135 pages</span>
      </div>

      <div className="border-t border-green-900/40" />

      <div className="flex flex-col gap-2">
        <p className="text-[10px] font-bold text-green-500/40 uppercase tracking-widest">Try asking</p>
        {[
          'What are the key building blocks of AI agents?',
          'How does memory work in agents?',
          'What is agentic workflow?',
        ].map((q) => (
          <p key={q} className="text-green-300/40 text-xs leading-relaxed bg-[#0a1f0f] rounded-xl px-3 py-2.5 border border-green-900/40">
            "{q}"
          </p>
        ))}
      </div>
    </aside>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  async function handleSubmit(e) {
    e.preventDefault()
    const question = input.trim()
    if (!question || loading) return

    setMessages((prev) => [...prev, { role: 'user', chunks: question }])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      })
      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'assistant', chunks: data.results }])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', chunks: [{ content: 'Error: could not reach the backend. Make sure the API server is running.' }] },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen overflow-hidden bg-[#0a1f0f] text-white flex flex-col font-sans">

      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-green-900/40 bg-[#0c2410] shrink-0">
        <button
          onClick={() => navigate('/')}
          className="text-lg font-black tracking-tight hover:opacity-70 transition-opacity cursor-pointer"
        >
          Survex
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300"> RAG</span>
        </button>

        <div className="flex lg:hidden items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a1f0f] border border-green-900/40">
          <img src="/book.png" alt="" className="w-4 h-5 rounded object-cover" />
          <span className="text-green-400/50 text-xs font-medium">Principles of Building AI Agents</span>
        </div>

        <span className="hidden lg:block text-xs text-green-500/30 font-medium">FAISS · HuggingFace · FastAPI</span>
      </nav>

      {/* Body */}
      <div className="flex flex-1 min-h-0">
        <BookPanel />

        <div className="flex flex-col flex-1 min-h-0">

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-8">
            <div className="max-w-2xl mx-auto flex flex-col gap-6">

              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center gap-6 mt-10 text-center">
                  <div className="relative">
                    <div className="absolute inset-0 rounded-2xl bg-green-600/20 blur-2xl scale-125" />
                    <img
                      src="/book.png"
                      alt="Book"
                      className="relative w-24 rounded-2xl shadow-xl shadow-green-950/60 border border-green-900/40"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-black text-white">What do you want to know?</h2>
                    <p className="text-green-200/40 text-sm max-w-sm leading-relaxed">
                      Ask anything about{' '}
                      <span className="font-semibold text-green-400">Principles of Building AI Agents</span>.
                      The top matching passages will be returned.
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2">
                    {[
                      'Key building blocks of AI agents?',
                      'How does memory work?',
                      'What is agentic workflow?',
                    ].map((q) => (
                      <button
                        key={q}
                        onClick={() => setInput(q)}
                        className="px-4 py-2 rounded-full bg-[#0f2d17] border border-green-900/50 text-xs text-green-300/60 font-medium hover:border-green-500/60 hover:text-green-300 hover:bg-[#122e19] transition-all cursor-pointer"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, i) => (
                <Message key={i} role={msg.role} chunks={msg.chunks} />
              ))}

              {loading && (
                <div className="flex gap-1.5 items-center pl-9">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-bounce [animation-delay:0ms]" />
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-bounce [animation-delay:300ms]" />
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          </div>

          {/* Input bar */}
          <div className="shrink-0 border-t border-green-900/40 bg-[#0c2410] px-4 py-4">
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex gap-3 items-end">
              <textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    handleSubmit(e)
                  }
                }}
                placeholder="Ask a question about the book…"
                className="flex-1 resize-none bg-[#0a1f0f] border border-green-900/50 rounded-2xl px-4 py-3 text-sm text-green-100 placeholder-green-500/30 focus:outline-none focus:border-green-500/70 focus:ring-2 focus:ring-green-900/50 transition-all leading-relaxed"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="shrink-0 px-5 py-3 bg-green-500 hover:bg-green-400 disabled:opacity-25 disabled:cursor-not-allowed rounded-2xl text-sm font-bold text-[#0a1f0f] transition-colors cursor-pointer"
              >
                Send
              </button>
            </form>
            <p className="text-center text-green-500/25 text-xs mt-3">
              Enter to send · Shift+Enter for new line
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
