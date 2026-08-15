export default function Navbar() {
  return (
    <nav className="nav">
      <div className="nav-inner">
        <a href="#top" className="logo">
          <span className="mark" />
          AGENTHIRE
        </a>
        <div className="nav-links">
          <a href="#problems">Problems</a>
          <a href="#how">How it works</a>
          <a href="#employees">Marketplace</a>
          <a href="#passport">Passport</a>
          <a href="#pricing">Pricing</a>
        </div>
        <a href="#pricing" className="btn btn-primary">Hire an AI →</a>
      </div>
    </nav>
  )
}
