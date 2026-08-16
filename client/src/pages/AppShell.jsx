import { Link, Outlet } from 'react-router-dom'
import useAuthStore from '../stores/useAuthStore'
import ThemeToggle from '../components/ThemeToggle'

export default function AppShell() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  return (
    <div className="app-shell">
      <nav className="app-shell-nav">
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link to="/" className="auth-logo" style={{ marginBottom: 0, textDecoration: 'none' }}>
            <span className="mark" />
            AGENTHIRE
          </Link>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link to="/app/marketplace" style={{ color: 'var(--text)', fontSize: '14px', textDecoration: 'none', fontWeight: 500 }}>
              Marketplace
            </Link>
            <Link to="/app/guidance" style={{ color: 'var(--text)', fontSize: '14px', textDecoration: 'none', fontWeight: 500 }}>
              Guidance
            </Link>
            <span style={{ color: 'var(--text-faint)', fontSize: '14px', cursor: 'not-allowed' }}>
              Workspace (Soon)
            </span>
            <Link to="/app/cli" style={{ color: 'var(--text)', fontSize: '14px', textDecoration: 'none', fontWeight: 500 }}>
              CLI Connect
            </Link>
          </div>
        </div>
        <div className="app-shell-user" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <ThemeToggle />
          <span className="app-shell-name">{user?.name}</span>
          <button onClick={logout} className="app-shell-logout">Sign out</button>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
