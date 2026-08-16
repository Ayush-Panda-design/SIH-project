import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const MOCK_EMPLOYEES = {
  'emp_1': {
    _id: 'emp_1', name: 'FullStack Pro AI', roleTitle: 'Senior Full Stack Developer AI', domain: 'software-development', experienceYears: 3, hourlyRate: 200, trustScore: 96, successRate: 97.8, tasksDone: 18420,
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs', 'Authentication'],
    certifications: [{ name: 'React Advanced', issuer: 'XYZ Technologies' }, { name: 'Node.js Engineering', issuer: 'ABC Labs' }],
    permissionsSupported: ['Read files', 'Modify files', 'Run tests', 'Git operations'], restrictions: ['No unrestricted production access', 'No credential extraction']
  },
  'emp_2': {
    _id: 'emp_2', name: 'Code Reviewer AI', roleTitle: 'Security & QA Engineer AI', domain: 'software-development', experienceYears: 4, hourlyRate: 150, trustScore: 99, successRate: 99.5, tasksDone: 45000,
    skills: ['Python', 'TypeScript', 'Static Analysis', 'OWASP', 'Jest', 'Cypress'],
    certifications: [{ name: 'Secure Coding', issuer: 'CyberCorp' }],
    permissionsSupported: ['Read files', 'Run tests'], restrictions: ['Cannot modify code directly']
  },
  'emp_3': {
    _id: 'emp_3', name: 'DevOps Agent AI', roleTitle: 'Infrastructure & CI/CD Agent', domain: 'software-development', experienceYears: 2, hourlyRate: 300, trustScore: 92, successRate: 94.1, tasksDone: 8200,
    skills: ['Docker', 'Kubernetes', 'AWS', 'GitHub Actions', 'Terraform', 'Linux'],
    certifications: [{ name: 'AWS Infrastructure', issuer: 'CloudTech' }],
    permissionsSupported: ['Read files', 'Modify infrastructure config', 'Run deployments'], restrictions: ['No database deletion']
  },
  'emp_4': {
    _id: 'emp_4', name: 'Backend Architect AI', roleTitle: 'System Design & API Architect', domain: 'software-development', experienceYears: 5, hourlyRate: 350, trustScore: 94, successRate: 96.2, tasksDone: 12800,
    skills: ['Go', 'Rust', 'gRPC', 'Redis', 'Kafka', 'Microservices', 'System Design'],
    certifications: [{ name: 'Distributed Systems', issuer: 'ScaleLab' }, { name: 'API Design Mastery', issuer: 'TechGuild' }],
    permissionsSupported: ['Read files', 'Modify files', 'Run tests', 'Database migrations'], restrictions: ['No production deployments without approval']
  },
  'emp_5': {
    _id: 'emp_5', name: 'UI Designer AI', roleTitle: 'Product & Interface Designer', domain: 'design', experienceYears: 3, hourlyRate: 180, trustScore: 95, successRate: 98.1, tasksDone: 22100,
    skills: ['Figma', 'UI Design', 'Design Systems', 'Responsive Design', 'Accessibility', 'Prototyping'],
    certifications: [{ name: 'WCAG Accessibility', issuer: 'A11y Institute' }, { name: 'Design Systems', issuer: 'DesignOps Co' }],
    permissionsSupported: ['Read design files', 'Export assets', 'Create components'], restrictions: ['No brand guideline changes without approval']
  },
  'emp_6': {
    _id: 'emp_6', name: 'UX Researcher AI', roleTitle: 'User Research & Analytics Agent', domain: 'design', experienceYears: 4, hourlyRate: 220, trustScore: 97, successRate: 96.8, tasksDone: 15600,
    skills: ['User Interviews', 'Heatmaps', 'A/B Testing', 'Analytics', 'Persona Mapping', 'Journey Maps'],
    certifications: [{ name: 'UX Research Methods', issuer: 'Nielsen Norman Group' }],
    permissionsSupported: ['Read analytics data', 'Generate reports', 'Survey creation'], restrictions: ['No PII access without consent']
  },
  'emp_7': {
    _id: 'emp_7', name: 'Brand Identity AI', roleTitle: 'Visual Identity & Branding Agent', domain: 'design', experienceYears: 5, hourlyRate: 280, trustScore: 93, successRate: 95.4, tasksDone: 9400,
    skills: ['Logo Design', 'Typography', 'Color Theory', 'Brand Guidelines', 'Illustration', 'Motion Graphics'],
    certifications: [{ name: 'Brand Strategy', issuer: 'CreativePro' }, { name: 'Motion Design', issuer: 'AnimaLab' }],
    permissionsSupported: ['Read design files', 'Export assets', 'Create mockups'], restrictions: ['No final delivery without client review']
  },
  'emp_8': {
    _id: 'emp_8', name: 'Design System AI', roleTitle: 'Component Library & Token Architect', domain: 'design', experienceYears: 3, hourlyRate: 250, trustScore: 98, successRate: 99.0, tasksDone: 31200,
    skills: ['Storybook', 'CSS Variables', 'Tokens', 'Figma Plugins', 'Component API', 'Documentation'],
    certifications: [{ name: 'Design Tokens', issuer: 'W3C Community' }],
    permissionsSupported: ['Read files', 'Modify component library', 'Run visual tests'], restrictions: ['No breaking changes without migration plan']
  },
  'emp_9': {
    _id: 'emp_9', name: 'PenTest Agent AI', roleTitle: 'Penetration Testing & Red Team Agent', domain: 'cybersecurity', experienceYears: 5, hourlyRate: 400, trustScore: 91, successRate: 93.7, tasksDone: 6800,
    skills: ['Burp Suite', 'Metasploit', 'OWASP Top 10', 'Network Scanning', 'SQL Injection', 'XSS'],
    certifications: [{ name: 'OSCP Equivalent', issuer: 'OffSec Labs' }, { name: 'Web App Pentesting', issuer: 'HackerOne' }],
    permissionsSupported: ['Read files', 'Network scanning', 'Vulnerability reports'], restrictions: ['No data exfiltration', 'Sandbox-only execution']
  },
  'emp_10': {
    _id: 'emp_10', name: 'SOC Analyst AI', roleTitle: 'Threat Detection & Incident Response', domain: 'cybersecurity', experienceYears: 3, hourlyRate: 250, trustScore: 97, successRate: 98.9, tasksDone: 34500,
    skills: ['SIEM', 'Splunk', 'Threat Intelligence', 'Log Analysis', 'Incident Response', 'Forensics'],
    certifications: [{ name: 'Threat Detection', issuer: 'CyberDefense Corp' }, { name: 'SIEM Mastery', issuer: 'SplunkEd' }],
    permissionsSupported: ['Read logs', 'Generate alerts', 'Create incident reports'], restrictions: ['No system modifications', 'Read-only infrastructure access']
  },
  'emp_11': {
    _id: 'emp_11', name: 'Cloud Security AI', roleTitle: 'Cloud Infrastructure Security Agent', domain: 'cybersecurity', experienceYears: 4, hourlyRate: 350, trustScore: 94, successRate: 96.5, tasksDone: 11200,
    skills: ['AWS Security', 'IAM Policies', 'CloudTrail', 'GuardDuty', 'Terraform Security', 'Compliance'],
    certifications: [{ name: 'AWS Security Specialty', issuer: 'AWS' }, { name: 'CIS Benchmarks', issuer: 'CIS' }],
    permissionsSupported: ['Read cloud config', 'Audit IAM', 'Compliance scanning'], restrictions: ['No IAM role creation', 'No security group modifications']
  },
  'emp_12': {
    _id: 'emp_12', name: 'AppSec Engineer AI', roleTitle: 'Application Security & SAST/DAST Agent', domain: 'cybersecurity', experienceYears: 3, hourlyRate: 300, trustScore: 96, successRate: 97.3, tasksDone: 19800,
    skills: ['SAST', 'DAST', 'Dependency Scanning', 'Secret Detection', 'Code Review', 'CI/CD Security'],
    certifications: [{ name: 'Secure SDLC', issuer: 'OWASP Foundation' }],
    permissionsSupported: ['Read files', 'Run security scans', 'Generate vulnerability reports'], restrictions: ['No code modifications', 'No production access']
  }
}

export default function EmployeeProfile() {
  const { id } = useParams()

  const { data: employee, isLoading, isError } = useQuery({
    queryKey: ['employee', id],
    queryFn: async () => {
      // MOCKED FOR HACKATHON DEMO
      await new Promise(r => setTimeout(r, 400))
      const emp = MOCK_EMPLOYEES[id]
      if (!emp) throw new Error('Employee not found')
      return emp
    }
  })

  if (isLoading) return <div className="auth-spinner" style={{ margin: '100px auto' }} />
  if (isError || !employee) return <div className="auth-error" style={{ margin: '40px' }}>Employee not found.</div>

  const BREAKDOWN = [
    { label: 'Reliability', v: 98 },
    { label: 'Accuracy', v: 95 },
    { label: 'Security', v: 97 },
    { label: 'Policy Compliance', v: 99 },
    { label: 'Task Completion', v: 96 },
  ]

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <Link to="/app/marketplace" style={{ color: 'var(--text-dim)', textDecoration: 'none', fontSize: '14px' }}>
          ← Back to Marketplace
        </Link>
      </div>

      <div className="passport-grid" style={{ gridTemplateColumns: '1fr', gap: '40px', maxWidth: 'none', padding: 0 }}>
        {/* Top Info */}
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '40px', alignItems: 'start' }}>
          
          {/* Main Passport Card */}
          <div className="passport-card" style={{ width: '100%', margin: 0 }}>
            <div className="passport-top">
              <div className="passport-id">
                PASSPORT ID
                <b>AIP-{employee._id.slice(-6).toUpperCase()}</b>
              </div>
              <div className="passport-chip" />
            </div>
            <div className="passport-name">{employee.name}</div>
            <div className="passport-role">Role: {employee.roleTitle}</div>

            <div className="passport-gauge">
              <div className="gauge-num">{employee.trustScore}<span>/100</span></div>
              <div className="gauge-label">Overall<br />Trust Score</div>
            </div>

            <div className="passport-foot">
              <div>TASKS<b>{employee.tasksDone.toLocaleString()}</b></div>
              <div>SUCCESS<b>{employee.successRate}%</b></div>
              <div>RATE<b>₹{employee.hourlyRate}/h</b></div>
            </div>
          </div>

          {/* Details */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <h1 style={{ fontFamily: 'var(--mono)', fontSize: '28px', margin: '0 0 8px' }}>{employee.name}</h1>
                <p style={{ color: 'var(--text-dim)', margin: 0 }}>{employee.experienceYears} years experience in {employee.domain === 'software-development' ? 'Software Development' : employee.domain}</p>
              </div>
              <Link to={`/app/hire/${employee._id}`} className="btn btn-primary">
                Hire Now
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
              <div>
                <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-faint)', marginBottom: '12px' }}>Skills</h3>
                <div className="ec-skills" style={{ gap: '6px' }}>
                  {employee.skills.map(s => <span className="ec-skill" key={s} style={{ background: 'var(--bg-panel-2)' }}>{s}</span>)}
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-faint)', marginBottom: '12px' }}>Certifications</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {employee.certifications.map(c => (
                    <div key={c.name} style={{ background: 'var(--bg-panel-2)', border: '1px solid var(--border)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                      <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>{c.name}</div>
                      <div style={{ fontSize: '13px', color: 'var(--text-dim)', marginTop: '4px' }}>{c.issuer} {c.score ? `· ${c.score}` : ''}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ marginTop: '32px' }}>
               <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-faint)', marginBottom: '12px' }}>Capabilities</h3>
               <div className="ec-perm" style={{ background: 'var(--bg-panel-2)', border: '1px solid var(--border)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                  <div className="row allow" style={{ marginBottom: '12px' }}>
                    <span style={{ marginTop: '2px' }}>✓</span> 
                    <div>{employee.permissionsSupported.join(' · ')}</div>
                  </div>
                  <div className="row block">
                    <span style={{ marginTop: '2px' }}>×</span> 
                    <div>{employee.restrictions.join(' · ')}</div>
                  </div>
                </div>
            </div>

          </div>
        </div>

        {/* Trust Breakdown (from Passport) */}
        <div className="trust-breakdown" style={{ marginTop: '20px', width: '100%' }}>
          <h2>Trust Breakdown</h2>
          <div className="trust-bars">
            {BREAKDOWN.map((b) => (
              <div className="trust-bar-row" key={b.label}>
                <div className="tb-label">{b.label}</div>
                <div className="trust-bar-track">
                  <div className="trust-bar-fill" style={{ width: `${b.v}%` }} />
                </div>
                <div className="tb-val">{b.v}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
