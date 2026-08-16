import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Generate a random avatar from Unsplash or Dicebear based on ID
const getAvatar = (id, seed) => `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}&backgroundColor=transparent`

function MarketplaceCard({ employee }) {
  const STATS = [
    { label: 'Trust', end: employee.trustScore, suffix: '' },
    { label: 'Success', end: employee.successRate, suffix: '%', decimals: 1 },
    { label: 'Tasks', end: employee.tasksDone >= 1000 ? (employee.tasksDone/1000).toFixed(1) + 'k' : employee.tasksDone, suffix: '' },
    { label: 'Certs', end: employee.certifications?.length || 0, suffix: '' },
  ]

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', height: '100%',
      background: 'var(--bg-raised)', border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)', padding: '24px', transition: 'all 0.2s ease',
      boxShadow: '0 4px 20px -10px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden'
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-4px)'
      e.currentTarget.style.borderColor = 'var(--accent-line)'
      e.currentTarget.style.boxShadow = '0 12px 40px -12px rgba(0,0,0,0.1)'
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)'
      e.currentTarget.style.borderColor = 'var(--border)'
      e.currentTarget.style.boxShadow = '0 4px 20px -10px rgba(0,0,0,0.05)'
    }}>
      {/* Decorative gradient corner */}
      <div style={{ position: 'absolute', top: 0, right: 0, width: '100px', height: '100px', background: 'radial-gradient(circle at top right, var(--accent-soft), transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'center' }}>
        <div style={{ 
          width: '56px', height: '56px', borderRadius: '12px', background: 'var(--bg-panel)',
          border: '1px solid var(--border-soft)', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <img src={getAvatar(employee._id, employee.name)} alt="avatar" style={{ width: '100%', height: '100%' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '16px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>{employee.name}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-dim)' }}>
            {{'software-development': 'Software Dev', 'design': 'Design', 'cybersecurity': 'Cybersecurity'}[employee.domain] || employee.domain} · {employee.experienceYears} yrs
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: '18px', fontWeight: 700, color: 'var(--accent)' }}>₹{employee.hourlyRate}</div>
          <div style={{ fontSize: '10px', color: 'var(--text-faint)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>/hour</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '24px', paddingBottom: '20px', borderBottom: '1px dashed var(--border-soft)' }}>
        {STATS.map((s) => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '15px', fontWeight: 600, color: 'var(--text)' }}>{s.end}{s.suffix}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-faint)' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
        {employee.skills.slice(0, 4).map((s) => (
          <span key={s} style={{ 
            fontFamily: 'var(--mono)', fontSize: '10px', padding: '4px 8px', 
            background: 'var(--bg-panel)', border: '1px solid var(--border-soft)', 
            borderRadius: 'var(--radius-sm)', color: 'var(--text-dim)'
          }}>{s}</span>
        ))}
        {employee.skills.length > 4 && (
          <span style={{ 
            fontFamily: 'var(--mono)', fontSize: '10px', padding: '4px 8px', 
            background: 'transparent', color: 'var(--text-faint)'
          }}>+{employee.skills.length - 4}</span>
        )}
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', gap: '12px' }}>
        <Link to={`/app/employees/${employee._id}`} className="btn" style={{ flex: 1, justifyContent: 'center', padding: '12px', fontSize: '13px' }}>
          Passport
        </Link>
        <Link to={`/app/hire/${employee._id}`} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '12px', fontSize: '13px' }}>
          Hire Agent
        </Link>
      </div>
    </div>
  )
}

const MOCK_EMPLOYEES = [
  // ─── Software Development ───
  {
    _id: 'emp_1', name: 'FullStack Pro AI', roleTitle: 'Senior Full Stack Developer AI',
    domain: 'software-development', experienceYears: 3, hourlyRate: 200, trustScore: 96, successRate: 97.8, tasksDone: 18420,
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs'],
    certifications: [{ name: 'React Advanced', issuer: 'XYZ Technologies' }],
    permissionsSupported: ['Read files', 'Modify files', 'Run tests', 'Git operations'],
    restrictions: ['No unrestricted production access', 'No credential extraction']
  },
  {
    _id: 'emp_2', name: 'Code Reviewer AI', roleTitle: 'Security & QA Engineer AI',
    domain: 'software-development', experienceYears: 4, hourlyRate: 150, trustScore: 99, successRate: 99.5, tasksDone: 45000,
    skills: ['Python', 'TypeScript', 'Static Analysis', 'OWASP', 'Jest', 'Cypress'],
    certifications: [{ name: 'Secure Coding', issuer: 'CyberCorp' }],
    permissionsSupported: ['Read files', 'Run tests'],
    restrictions: ['Cannot modify code directly']
  },
  {
    _id: 'emp_3', name: 'DevOps Agent AI', roleTitle: 'Infrastructure & CI/CD Agent',
    domain: 'software-development', experienceYears: 2, hourlyRate: 300, trustScore: 92, successRate: 94.1, tasksDone: 8200,
    skills: ['Docker', 'Kubernetes', 'AWS', 'GitHub Actions', 'Terraform', 'Linux'],
    certifications: [{ name: 'AWS Infrastructure', issuer: 'CloudTech' }],
    permissionsSupported: ['Read files', 'Modify infrastructure config', 'Run deployments'],
    restrictions: ['No database deletion']
  },
  {
    _id: 'emp_4', name: 'Backend Architect AI', roleTitle: 'System Design & API Architect',
    domain: 'software-development', experienceYears: 5, hourlyRate: 350, trustScore: 94, successRate: 96.2, tasksDone: 12800,
    skills: ['Go', 'Rust', 'gRPC', 'Redis', 'Kafka', 'Microservices'],
    certifications: [{ name: 'Distributed Systems', issuer: 'ScaleLab' }],
    permissionsSupported: ['Read files', 'Modify files', 'Database migrations'],
    restrictions: ['No production deployments without approval']
  },
  // ─── Design ───
  {
    _id: 'emp_5', name: 'UI Designer AI', roleTitle: 'Product & Interface Designer',
    domain: 'design', experienceYears: 3, hourlyRate: 180, trustScore: 95, successRate: 98.1, tasksDone: 22100,
    skills: ['Figma', 'UI Design', 'Design Systems', 'Responsive Design', 'Accessibility'],
    certifications: [{ name: 'WCAG Accessibility', issuer: 'A11y Institute' }],
    permissionsSupported: ['Read design files', 'Export assets', 'Create components'],
    restrictions: ['No brand guideline changes without approval']
  },
  {
    _id: 'emp_6', name: 'UX Researcher AI', roleTitle: 'User Research & Analytics Agent',
    domain: 'design', experienceYears: 4, hourlyRate: 220, trustScore: 97, successRate: 96.8, tasksDone: 15600,
    skills: ['User Interviews', 'Heatmaps', 'A/B Testing', 'Analytics', 'Persona Mapping'],
    certifications: [{ name: 'UX Research Methods', issuer: 'Nielsen Norman Group' }],
    permissionsSupported: ['Read analytics data', 'Generate reports'],
    restrictions: ['No PII access without consent']
  },
  {
    _id: 'emp_7', name: 'Brand Identity AI', roleTitle: 'Visual Identity & Branding Agent',
    domain: 'design', experienceYears: 5, hourlyRate: 280, trustScore: 93, successRate: 95.4, tasksDone: 9400,
    skills: ['Logo Design', 'Typography', 'Color Theory', 'Brand Guidelines', 'Illustration'],
    certifications: [{ name: 'Brand Strategy', issuer: 'CreativePro' }],
    permissionsSupported: ['Read design files', 'Export assets', 'Create mockups'],
    restrictions: ['No final delivery without client review']
  },
  {
    _id: 'emp_8', name: 'Design System AI', roleTitle: 'Component Library & Token Architect',
    domain: 'design', experienceYears: 3, hourlyRate: 250, trustScore: 98, successRate: 99.0, tasksDone: 31200,
    skills: ['Storybook', 'CSS Variables', 'Tokens', 'Figma Plugins', 'Component API'],
    certifications: [{ name: 'Design Tokens', issuer: 'W3C Community' }],
    permissionsSupported: ['Read files', 'Modify component library', 'Run visual tests'],
    restrictions: ['No breaking changes without migration plan']
  },
  // ─── Cybersecurity ───
  {
    _id: 'emp_9', name: 'PenTest Agent AI', roleTitle: 'Penetration Testing & Red Team Agent',
    domain: 'cybersecurity', experienceYears: 5, hourlyRate: 400, trustScore: 91, successRate: 93.7, tasksDone: 6800,
    skills: ['Burp Suite', 'Metasploit', 'OWASP Top 10', 'Network Scanning', 'SQL Injection'],
    certifications: [{ name: 'OSCP Equivalent', issuer: 'OffSec Labs' }],
    permissionsSupported: ['Read files', 'Network scanning', 'Vulnerability reports'],
    restrictions: ['No data exfiltration', 'Sandbox-only execution']
  },
  {
    _id: 'emp_10', name: 'SOC Analyst AI', roleTitle: 'Threat Detection & Incident Response',
    domain: 'cybersecurity', experienceYears: 3, hourlyRate: 250, trustScore: 97, successRate: 98.9, tasksDone: 34500,
    skills: ['SIEM', 'Splunk', 'Threat Intelligence', 'Log Analysis', 'Incident Response'],
    certifications: [{ name: 'Threat Detection', issuer: 'CyberDefense Corp' }],
    permissionsSupported: ['Read logs', 'Generate alerts', 'Create incident reports'],
    restrictions: ['No system modifications', 'Read-only infrastructure access']
  },
  {
    _id: 'emp_11', name: 'Cloud Security AI', roleTitle: 'Cloud Infrastructure Security Agent',
    domain: 'cybersecurity', experienceYears: 4, hourlyRate: 350, trustScore: 94, successRate: 96.5, tasksDone: 11200,
    skills: ['AWS Security', 'IAM Policies', 'CloudTrail', 'GuardDuty', 'Terraform Security'],
    certifications: [{ name: 'AWS Security Specialty', issuer: 'AWS' }],
    permissionsSupported: ['Read cloud config', 'Audit IAM', 'Compliance scanning'],
    restrictions: ['No IAM role creation', 'No security group modifications']
  },
  {
    _id: 'emp_12', name: 'AppSec Engineer AI', roleTitle: 'Application Security & SAST/DAST Agent',
    domain: 'cybersecurity', experienceYears: 3, hourlyRate: 300, trustScore: 96, successRate: 97.3, tasksDone: 19800,
    skills: ['SAST', 'DAST', 'Dependency Scanning', 'Secret Detection', 'Code Review'],
    certifications: [{ name: 'Secure SDLC', issuer: 'OWASP Foundation' }],
    permissionsSupported: ['Read files', 'Run security scans', 'Generate vulnerability reports'],
    restrictions: ['No code modifications', 'No production access']
  }
]

export default function Marketplace() {
  const [search, setSearch] = useState('')
  const [activeDomain, setActiveDomain] = useState('software-development')

  const DOMAINS = [
    { key: 'software-development', label: '💻 Software Development' },
    { key: 'design', label: '🎨 UI/UX Design' },
    { key: 'cybersecurity', label: '🛡️ Cybersecurity' },
  ]

  const { data: employees, isLoading, isError } = useQuery({
    queryKey: ['employees', activeDomain, search],
    queryFn: async () => {
      // MOCKED FOR HACKATHON DEMO
      await new Promise(r => setTimeout(r, 600)) // network delay
      let filtered = MOCK_EMPLOYEES.filter(emp => emp.domain === activeDomain)
      if (search) {
        const s = search.toLowerCase()
        filtered = filtered.filter(emp => 
          emp.name.toLowerCase().includes(s) || 
          emp.skills.some(skill => skill.toLowerCase().includes(s))
        )
      }
      return filtered
    }
  })

  return (
    <div>
      {/* Hero Banner */}
      <div style={{ background: 'var(--bg-panel)', borderBottom: '1px solid var(--border-soft)', padding: '60px 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '40px', position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '540px' }}>
            <h1 style={{ fontFamily: 'var(--mono)', fontSize: '40px', margin: '0 0 16px', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--text)' }}>
              AI Employee Marketplace
            </h1>
            <p style={{ color: 'var(--text-dim)', fontSize: '16px', lineHeight: 1.6, margin: 0 }}>
              Discover, interview, and hire specialized AI agents for your engineering, design, and security teams. They work autonomously in your local environment.
            </p>
          </div>
          <div style={{ flexShrink: 0, borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 20px 40px -20px rgba(0,0,0,0.15)', transform: 'rotate(1deg)' }}>
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&h=200&q=80" 
              alt="Cyber Abstract" 
              style={{ display: 'block', width: '400px', height: '200px', objectFit: 'cover' }}
            />
          </div>
        </div>
      </div>

      <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '40px' }}>
          {/* Sidebar Filters */}
          <div style={{ width: '260px', flexShrink: 0 }}>
            <div style={{ marginBottom: '24px', position: 'sticky', top: '88px' }}>
              <input 
                type="text" 
                placeholder="Search by name or skill..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="auth-input"
                style={{ width: '100%', marginBottom: '24px' }}
              />

              <div>
                <h3 style={{ fontSize: '12px', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-faint)', marginBottom: '16px' }}>Domains</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {DOMAINS.map(d => (
                    <button 
                      key={d.key}
                      onClick={() => setActiveDomain(d.key)}
                      style={{ 
                        textAlign: 'left', 
                        padding: '12px 16px', 
                        background: activeDomain === d.key ? 'var(--bg-raised)' : 'transparent',
                        border: '1px solid',
                        borderColor: activeDomain === d.key ? 'var(--border-strong)' : 'transparent',
                        borderRadius: 'var(--radius-md)',
                        color: activeDomain === d.key ? 'var(--text)' : 'var(--text-dim)',
                        cursor: 'pointer',
                        fontFamily: 'var(--sans)',
                        fontSize: '14px',
                        fontWeight: activeDomain === d.key ? 600 : 400,
                        transition: 'all 0.2s ease',
                        boxShadow: activeDomain === d.key ? '0 4px 12px rgba(0,0,0,0.05)' : 'none'
                      }}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div style={{ flex: 1 }}>
            {isLoading && <div className="auth-spinner" style={{ margin: '60px auto' }} />}
            {isError && <div className="auth-error">Error loading marketplace.</div>}
            
            {employees && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '24px' }}>
                {employees.length === 0 ? (
                  <div style={{ color: 'var(--text-dim)', padding: '40px', background: 'var(--bg-panel)', borderRadius: '12px', border: '1px dashed var(--border)' }}>
                    No employees found matching your criteria. Try adjusting your search.
                  </div>
                ) : (
                  employees.map(emp => (
                    <MarketplaceCard key={emp._id} employee={emp} />
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
