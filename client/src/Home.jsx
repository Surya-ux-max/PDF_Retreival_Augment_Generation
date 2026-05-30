import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Message({ role, chunks }) {
  if (role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-xl px-4 py-3 rounded-2xl bg-white/10 text-white/90 text-sm leading-relaxed">
          {chunks}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {chunks.map((chunk, i) => (
        <div key={i} className="flex gap-3 items-start">
          <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center text-[10px] font-bold text-white">
            {i + 1}
          </span>
          <div className="flex-1 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white/80 text-sm leading-relaxed whitespace-pre-wrap">
            {chunk.content}
          </div>
        </div>
      ))}
    </div>
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
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10 shrink-0">
        <button
          onClick={() => navigate('/')}
          className="text-lg font-semibold tracking-tight hover:text-white/70 transition-colors cursor-pointer"
        >
          PDF RAG
        </button>
        <span className="text-xs text-white/30">Powered by FAISS + HuggingFace</span>
      </nav>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-8">
        <div className="max-w-2xl mx-auto flex flex-col gap-6">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-4 mt-24 text-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 blur-lg opacity-70" />
              <h2 className="text-2xl font-semibold text-white/80">What do you want to know?</h2>
              <p className="text-white/30 text-sm max-w-sm">
                Ask any question about your PDF. The top matching passages will be returned.
              </p>
            </div>
          )}

          {messages.map((msg, i) => (
            <Message key={i} role={msg.role} chunks={msg.chunks} />
          ))}

          {loading && (
            <div className="flex gap-2 items-center text-white/30 text-sm pl-1">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:0ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:150ms]" />
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:300ms]" />
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-white/10 px-4 py-4">
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
            placeholder="Ask a question about your PDF…"
            className="flex-1 resize-none bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-violet-500 transition-colors leading-relaxed"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="shrink-0 px-5 py-3 bg-violet-600 hover:bg-violet-500 disabled:opacity-30 disabled:cursor-not-allowed rounded-2xl text-sm font-medium transition-colors cursor-pointer"
          >
            Send
          </button>
        </form>
        <p className="text-center text-white/20 text-xs mt-3">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  )
}
