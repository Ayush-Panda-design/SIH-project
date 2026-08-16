import { useState, useRef, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function Workspace() {
  const { sessionId } = useParams()
  const [activeTab, setActiveTab] = useState('chat') // 'chat' or 'knowledge'
  
  // Fake chat state
  const [messages, setMessages] = useState([
    { id: 1, role: 'system', content: 'Secure workspace tunnel established. Agent is online.' }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef(null)

  // Fake terminal state
  const [logs, setLogs] = useState([
    { id: 1, time: new Date().toLocaleTimeString(), text: 'AgentHire Sandbox initialized.' },
    { id: 2, time: new Date().toLocaleTimeString(), text: 'Listening on ws://localhost:3000/agent' }
  ])
  const terminalEndRef = useRef(null)

  // Fake Knowledge state
  const [docs, setDocs] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [activeFile, setActiveFile] = useState('src/middleware/requireAuth.js')

  // Auto-scroll chat and terminal
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])
  useEffect(() => { terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [logs])

  const appendLog = (text) => {
    setLogs(prev => [...prev, { id: Date.now(), time: new Date().toLocaleTimeString(), text }])
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMsg = inputValue.trim()
    setMessages(prev => [...prev, { id: Date.now(), role: 'user', content: userMsg }])
    setInputValue('')
    setIsTyping(true)
    appendLog(`> Executing instruction from user`)

    // Fake AI Response logic for demo
    setTimeout(() => {
      appendLog('> Analyzing project structure...')
      setTimeout(() => {
        appendLog('> Modifying src/middleware/requireAuth.js')
        appendLog('> Running linter...')
        appendLog('> Commit created: "fix: update jwt parsing"')
        
        setMessages(prev => [...prev, { 
          id: Date.now(), 
          role: 'assistant', 
          content: 'I have modified `requireAuth.js` to correctly extract the JWT from the cookies instead of the Authorization header. I ran the linter and pushed the changes to the `fix-auth` branch.' 
        }])
        setIsTyping(false)
      }, 1500)
    }, 1000)
  }

  const handleFakeUpload = () => {
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)
      setDocs(prev => [...prev, { name: 'architecture-v2.pdf', date: new Date().toLocaleDateString() }])
    }, 2000)
  }

  const MOCK_FILES = ['src/index.js', 'src/App.jsx', 'src/middleware/requireAuth.js', 'package.json', '.env']
  
  const CODE_SNIPPET = `import jwt from 'jsonwebtoken'

export const requireAuth = (req, res, next) => {
  // Agent changed this to read from cookies
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 65px)', background: 'var(--bg-panel-2)' }}>
      {/* Workspace Header */}
      <div style={{ padding: '12px 24px', borderBottom: '1px solid var(--border)', background: 'var(--bg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div>
            <h2 style={{ margin: '0 0 4px', fontSize: '15px', fontFamily: 'var(--mono)', color: 'var(--text)' }}>Workspace: {sessionId}</h2>
            <div style={{ fontSize: '12px', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', background: 'var(--green)', borderRadius: '50%', boxShadow: '0 0 8px var(--green)' }} />
              Agent is active and connected
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setActiveTab('chat')}
            className={activeTab === 'chat' ? 'btn btn-primary' : 'btn'}
            style={{ padding: '8px 16px', fontSize: '12px' }}
          >
            IDE View
          </button>
          <button 
            onClick={() => setActiveTab('knowledge')}
            className={activeTab === 'knowledge' ? 'btn btn-primary' : 'btn'}
            style={{ padding: '8px 16px', fontSize: '12px', background: activeTab === 'knowledge' ? 'var(--accent)' : 'transparent', color: activeTab === 'knowledge' ? '#0a0a0a' : 'var(--text)' }}
          >
            Knowledge Base
          </button>
        </div>
      </div>

      {activeTab === 'chat' ? (
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Left: Mock File Explorer */}
          <div style={{ width: '220px', background: 'var(--bg-raised)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '12px', fontSize: '11px', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-faint)', borderBottom: '1px solid var(--border-soft)' }}>
              Explorer
            </div>
            <div style={{ padding: '8px 0', overflowY: 'auto' }}>
              {MOCK_FILES.map(f => (
                <div 
                  key={f}
                  onClick={() => setActiveFile(f)}
                  style={{ 
                    padding: '6px 12px', 
                    fontSize: '13px', 
                    fontFamily: 'var(--mono)', 
                    cursor: 'pointer',
                    color: activeFile === f ? 'var(--accent)' : 'var(--text-dim)',
                    background: activeFile === f ? 'var(--accent-soft)' : 'transparent',
                    borderLeft: `2px solid ${activeFile === f ? 'var(--accent)' : 'transparent'}`
                  }}
                >
                  {f.split('/').pop()}
                </div>
              ))}
            </div>
          </div>

          {/* Middle: Code Editor */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg-panel-2)' }}>
            <div style={{ display: 'flex', background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
              <div style={{ padding: '10px 20px', background: 'var(--bg-panel-2)', borderRight: '1px solid var(--border)', borderTop: '2px solid var(--accent)', color: 'var(--accent)', fontFamily: 'var(--mono)', fontSize: '13px' }}>
                {activeFile}
              </div>
            </div>
            <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
              <pre style={{ margin: 0, fontFamily: 'var(--mono)', fontSize: '14px', lineHeight: '1.6', color: 'var(--text-dim)' }}>
                {CODE_SNIPPET.split('\n').map((line, i) => (
                  <div key={i} style={{ display: 'flex' }}>
                    <span style={{ width: '30px', color: 'var(--border-strong)', userSelect: 'none' }}>{i + 1}</span>
                    <span style={{ color: line.includes('//') ? 'var(--green)' : 'inherit' }}>{line}</span>
                  </div>
                ))}
              </pre>
            </div>
            {/* Terminal at bottom of editor */}
            <div style={{ height: '200px', borderTop: '1px solid var(--border)', background: 'var(--bg-raised)', display: 'flex', flexDirection: 'column' }}>
               <div style={{ padding: '8px 16px', borderBottom: '1px solid var(--border-soft)', fontSize: '11px', fontFamily: 'var(--mono)', textTransform: 'uppercase', color: 'var(--text-faint)' }}>
                Terminal (agenthire sandbox)
               </div>
               <div style={{ flex: 1, padding: '12px 16px', overflowY: 'auto', fontFamily: 'var(--mono)', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {logs.map(log => (
                  <div key={log.id} style={{ display: 'flex', gap: '12px' }}>
                    <span style={{ color: 'var(--text-faint)' }}>[{log.time}]</span>
                    <span style={{ color: 'var(--text-dim)' }}>{log.text}</span>
                  </div>
                ))}
                <div ref={terminalEndRef} />
               </div>
            </div>
          </div>

          {/* Right: AI Chat */}
          <div style={{ width: '340px', background: 'var(--bg-raised)', borderLeft: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '12px 16px', fontSize: '12px', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-faint)', borderBottom: '1px solid var(--border-soft)' }}>
              Agent Chat
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {messages.map(m => (
                <div key={m.id} style={{ 
                  alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                  background: m.role === 'user' ? 'var(--accent)' : 'var(--bg-panel)',
                  border: m.role === 'system' ? 'none' : (m.role === 'user' ? 'none' : '1px solid var(--border)'),
                  padding: m.role === 'system' ? '8px' : '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  maxWidth: '85%',
                  color: m.role === 'user' ? '#0a0a0a' : (m.role === 'system' ? 'var(--text-faint)' : 'var(--text)'),
                  fontSize: '13px',
                  lineHeight: '1.5',
                  fontFamily: m.role === 'system' ? 'var(--mono)' : 'var(--sans)'
                }}>
                  {m.content}
                </div>
              ))}
              {isTyping && (
                <div style={{ alignSelf: 'flex-start', padding: '12px 16px', fontSize: '13px', color: 'var(--text-dim)', fontFamily: 'var(--mono)' }}>
                  <span className="cursor">█</span> Thinking...
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            
            <div style={{ padding: '12px', borderTop: '1px solid var(--border)', background: 'var(--bg)' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                <span onClick={() => setInputValue('Fix authentication bug')} style={{ cursor: 'pointer', fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--text-dim)', padding: '4px 8px', background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: '4px', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color='var(--accent)'} onMouseLeave={e => e.target.style.color='var(--text-dim)'}>Fix auth bug</span>
                <span onClick={() => setInputValue('Run linter on src/')} style={{ cursor: 'pointer', fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--text-dim)', padding: '4px 8px', background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: '4px', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color='var(--accent)'} onMouseLeave={e => e.target.style.color='var(--text-dim)'}>Run linter</span>
                <span onClick={() => setInputValue('Write unit tests')} style={{ cursor: 'pointer', fontSize: '11px', fontFamily: 'var(--mono)', color: 'var(--text-dim)', padding: '4px 8px', background: 'var(--bg-raised)', border: '1px solid var(--border)', borderRadius: '4px', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color='var(--accent)'} onMouseLeave={e => e.target.style.color='var(--text-dim)'}>Write unit tests</span>
              </div>
              <form onSubmit={handleSendMessage} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <textarea 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask the agent to implement a feature..."
                  className="auth-input"
                  style={{ width: '100%', resize: 'none', height: '60px', padding: '10px', fontSize: '13px' }}
                  disabled={isTyping}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                />
                <button type="submit" className="btn btn-primary" disabled={isTyping} style={{ padding: '8px', fontSize: '12px', justifyContent: 'center' }}>Send Instruction</button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        /* Knowledge Tab */
        <div style={{ flex: 1, padding: '40px', background: 'var(--bg)', overflowY: 'auto' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h3 style={{ fontFamily: 'var(--mono)', fontSize: '18px', marginBottom: '16px' }}>Project Knowledge</h3>
            <p style={{ color: 'var(--text-dim)', fontSize: '14px', marginBottom: '24px' }}>
              Upload documentation, API specs, or design files. The AI will chunk and embed these to use as context during the session.
            </p>

            <div 
              style={{ 
                border: '1px dashed var(--border-strong)', 
                borderRadius: 'var(--radius-lg)', 
                padding: '40px', 
                textAlign: 'center',
                background: 'var(--bg-raised)',
                marginBottom: '32px',
                transition: 'border-color 0.2s ease'
              }}
            >
              {isUploading ? (
                <div>
                  <div className="auth-spinner" style={{ margin: '0 auto 16px' }} />
                  <p style={{ color: 'var(--accent)', fontFamily: 'var(--mono)', margin: 0 }}>Chunking and Embedding document...</p>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: '32px', marginBottom: '16px' }}>📄</div>
                  <button onClick={handleFakeUpload} className="btn" style={{ background: 'var(--bg-panel)', border: '1px solid var(--border-strong)' }}>Upload Document (PDF, MD, TXT)</button>
                </div>
              )}
            </div>

            <div>
              <h4 style={{ fontSize: '12px', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-faint)', marginBottom: '12px' }}>Indexed Documents</h4>
              {docs.length === 0 ? (
                <div style={{ padding: '24px', background: 'var(--bg-panel-2)', borderRadius: 'var(--radius-md)', color: 'var(--text-dim)', textAlign: 'center', fontSize: '14px', border: '1px solid var(--border)' }}>
                  No documents uploaded yet.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {docs.map((d, i) => (
                    <div key={i} style={{ padding: '16px', background: 'var(--bg-panel)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text)', fontWeight: 500, fontSize: '14px' }}>{d.name}</span>
                      <span style={{ color: 'var(--text-dim)', fontSize: '13px' }}>{d.date}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
