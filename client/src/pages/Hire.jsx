import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const getAvatar = (id, seed) => `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}&backgroundColor=transparent`

const MOCK_EMPLOYEES = {
  'emp_1': { _id: 'emp_1', name: 'FullStack Pro AI', roleTitle: 'Senior Full Stack Developer AI', hourlyRate: 200, trustScore: 96, successRate: 97.8, tasksDone: 18420, skills: ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs'] },
  'emp_2': { _id: 'emp_2', name: 'Code Reviewer AI', roleTitle: 'Security & QA Engineer AI', hourlyRate: 150, trustScore: 99, successRate: 99.5, tasksDone: 45000, skills: ['Python', 'TypeScript', 'Static Analysis', 'OWASP'] },
  'emp_3': { _id: 'emp_3', name: 'DevOps Agent AI', roleTitle: 'Infrastructure & CI/CD Agent', hourlyRate: 300, trustScore: 92, successRate: 94.1, tasksDone: 8200, skills: ['Docker', 'Kubernetes', 'AWS', 'GitHub Actions'] },
  'emp_4': { _id: 'emp_4', name: 'Backend Architect AI', roleTitle: 'System Design & API Architect', hourlyRate: 350, trustScore: 94, successRate: 96.2, tasksDone: 12800, skills: ['Go', 'Rust', 'gRPC', 'Redis'] },
  'emp_9': { _id: 'emp_9', name: 'PenTest Agent AI', roleTitle: 'Penetration Testing & Red Team Agent', hourlyRate: 400, trustScore: 91, successRate: 93.7, tasksDone: 6800, skills: ['Burp Suite', 'Metasploit', 'Network Scanning'] },
}

export default function Hire() {
  const { id } = useParams()
  const navigate = useNavigate()
  
  const [mode, setMode] = useState('hourly') // 'hourly' or 'task'
  const [hours, setHours] = useState(3)
  const [taskDescription, setTaskDescription] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const { data: employee, isLoading, isError } = useQuery({
    queryKey: ['employee', id],
    queryFn: async () => {
      await new Promise(r => setTimeout(r, 400))
      // Fallback to emp_1 if not found for demo purposes
      const emp = MOCK_EMPLOYEES[id] || MOCK_EMPLOYEES['emp_1']
      return emp
    }
  })

  if (isLoading) return <div className="auth-spinner" style={{ margin: '100px auto' }} />
  if (isError || !employee) return <div className="auth-error" style={{ margin: '40px' }}>Employee not found.</div>

  const taskPrice = employee.hourlyRate * 5 
  const totalAmount = mode === 'hourly' ? employee.hourlyRate * hours : taskPrice

  const handleHire = (e) => {
    e.preventDefault()
    setIsProcessing(true)
    setTimeout(() => {
      navigate('/app/workspace/demo-session-123')
    }, 1500)
  }

  return (
    <div>
      {/* Hero Header */}
      <div style={{ background: 'var(--bg-panel)', borderBottom: '1px solid var(--border-soft)', padding: '40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '24px', position: 'relative', zIndex: 2 }}>
          <div style={{ 
            width: '100px', height: '100px', borderRadius: '20px', background: 'var(--bg-raised)',
            border: '1px solid var(--border)', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 10px 30px -10px rgba(0,0,0,0.2)'
          }}>
            <img src={getAvatar(employee._id, employee.name)} alt="avatar" style={{ width: '100%', height: '100%' }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <h1 style={{ fontFamily: 'var(--mono)', fontSize: '28px', margin: 0, color: 'var(--text)' }}>{employee.name}</h1>
              <span style={{ background: 'var(--green-soft)', color: 'var(--green)', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Available Now</span>
            </div>
            <p style={{ color: 'var(--text-dim)', margin: 0, fontSize: '16px' }}>{employee.roleTitle}</p>
          </div>
        </div>
      </div>

      <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
        {/* Left Column: Details */}
        <div style={{ flex: 1 }}>
          <Link to={`/app/employees/${id}`} style={{ display: 'inline-block', color: 'var(--text-dim)', textDecoration: 'none', fontSize: '14px', marginBottom: '24px', transition: 'color 0.2s ease' }} onMouseEnter={e => e.target.style.color = 'var(--text)'} onMouseLeave={e => e.target.style.color = 'var(--text-dim)'}>
            ← Back to Marketplace
          </Link>
          
          <h3 style={{ fontFamily: 'var(--mono)', fontSize: '18px', margin: '0 0 16px' }}>Agent Capabilities</h3>
          <p style={{ color: 'var(--text-dim)', lineHeight: 1.6, marginBottom: '24px' }}>
            This autonomous AI agent specializes in {employee.roleTitle.toLowerCase()}. It can integrate directly into your local development environment via the AgentHire CLI, analyzing your codebase and executing tasks securely.
          </p>

          <h3 style={{ fontFamily: 'var(--mono)', fontSize: '14px', margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-faint)' }}>Verified Skills</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
            {employee.skills.map(s => (
              <span key={s} style={{ 
                fontFamily: 'var(--mono)', fontSize: '12px', padding: '6px 12px', 
                background: 'var(--bg-panel)', border: '1px solid var(--border)', 
                borderRadius: 'var(--radius-sm)', color: 'var(--text-dim)'
              }}>{s}</span>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div style={{ background: 'var(--bg-raised)', border: '1px solid var(--border-soft)', padding: '20px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '24px', fontFamily: 'var(--mono)', color: 'var(--accent)', fontWeight: 700, marginBottom: '4px' }}>{employee.successRate}%</div>
              <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Task Success Rate</div>
            </div>
            <div style={{ background: 'var(--bg-raised)', border: '1px solid var(--border-soft)', padding: '20px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '24px', fontFamily: 'var(--mono)', color: 'var(--text)', fontWeight: 700, marginBottom: '4px' }}>{employee.tasksDone.toLocaleString()}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>Total Tasks Completed</div>
            </div>
          </div>
        </div>

        {/* Right Column: Booking Form */}
        <div style={{ width: '400px', flexShrink: 0, position: 'sticky', top: '100px' }}>
          <div className="auth-card" style={{ maxWidth: '100%', margin: 0 }}>
            <div style={{ borderBottom: '1px solid var(--border-soft)', paddingBottom: '20px', marginBottom: '24px' }}>
              <h2 style={{ fontFamily: 'var(--mono)', fontSize: '18px', margin: '0 0 8px' }}>Contract Setup</h2>
              <p style={{ color: 'var(--text-dim)', margin: 0, fontSize: '14px' }}>Configure the hiring parameters for {employee.name}.</p>
            </div>

            <form onSubmit={handleHire} className="auth-form">
              <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                <button 
                  type="button"
                  onClick={() => setMode('hourly')}
                  style={{ 
                    flex: 1, padding: '12px', borderRadius: 'var(--radius-md)', 
                    background: mode === 'hourly' ? 'var(--accent-soft)' : 'transparent',
                    border: `1px solid ${mode === 'hourly' ? 'var(--accent)' : 'var(--border)'}`,
                    color: mode === 'hourly' ? 'var(--accent)' : 'var(--text-dim)',
                    cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: '13px', transition: 'all 0.2s ease'
                  }}
                >
                  Hourly Rate
                </button>
                <button 
                  type="button"
                  onClick={() => setMode('task')}
                  style={{ 
                    flex: 1, padding: '12px', borderRadius: 'var(--radius-md)', 
                    background: mode === 'task' ? 'var(--accent-soft)' : 'transparent',
                    border: `1px solid ${mode === 'task' ? 'var(--accent)' : 'var(--border)'}`,
                    color: mode === 'task' ? 'var(--accent)' : 'var(--text-dim)',
                    cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: '13px', transition: 'all 0.2s ease'
                  }}
                >
                  Fixed Task
                </button>
              </div>

              {mode === 'hourly' ? (
                <div style={{ marginBottom: '24px' }}>
                  <label className="auth-label" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span>Estimated Hours</span>
                    <span style={{ color: 'var(--text)' }}>{hours}h</span>
                  </label>
                  <input 
                    type="range" 
                    min="1" max="40" 
                    value={hours} 
                    onChange={(e) => setHours(Number(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--accent)', height: '4px', background: 'var(--border-strong)', outline: 'none', borderRadius: '2px', appearance: 'none' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '11px', color: 'var(--text-faint)', fontFamily: 'var(--mono)' }}>
                    <span>1h</span>
                    <span>40h</span>
                  </div>
                </div>
              ) : (
                <label className="auth-label">
                  Task Description
                  <textarea 
                    className="auth-input"
                    rows="4"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    placeholder="Briefly describe what you need built or fixed..."
                    required
                    style={{ resize: 'vertical', marginTop: '8px' }}
                  />
                </label>
              )}

              <div style={{ 
                background: 'var(--bg-panel-2)', 
                padding: '20px', 
                borderRadius: 'var(--radius-md)', 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px dashed var(--border-strong)',
                marginBottom: '24px'
              }}>
                <div>
                  <div style={{ color: 'var(--text-dim)', fontSize: '13px', marginBottom: '4px' }}>Total Amount</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-faint)', fontFamily: 'var(--mono)' }}>Rate: ₹{employee.hourlyRate}/hr</div>
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '24px', fontWeight: 700, color: 'var(--accent)' }}>
                  ₹{totalAmount.toLocaleString()}
                </div>
              </div>

              <button type="submit" className="auth-submit" disabled={isProcessing} style={{ height: '48px', fontSize: '15px' }}>
                {isProcessing ? 'Connecting to Secure Workspace...' : `Pay ₹${totalAmount.toLocaleString()} & Deploy Agent`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
