import { useState } from 'react';
import './Navbar.css';
import logo from './logo.png';
const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Weather', href: '#weather' },
  { label: 'Contact', href: '#contact' },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`navbar ${menuOpen ? 'navbar-open' : ''}`}>
      <button
        type="button"
        className="nav-backdrop"
        aria-label="Close navigation menu"
        onClick={closeMenu}
      />

      <div className="navbar-brand">
        <img 
    src={logo} 
    alt="Logo" 
    style={{ 
      width: '60px',   // Pehle se kam kar ke 30px kar dein
      height: '60px',  // Proportional rakhne ke liye height bhi 30px karein
      objectFit: 'contain' // Logo kharab na dikhe isliye zaroori ha
    }} 
  />
        <div>
          <strong>TALHA-thewebcrafts</strong>
          <small>Weather Forecast</small>
        </div>
      </div>

      <button
        type="button"
        className="menu-toggle"
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className="navbar-menu">
        <div className="drawer-brand">
          <img src={logo} alt="Logo" />
          <div>
            <strong>TALHA-thewebcrafts</strong>
            <small>Weather Forecast</small>
          </div>
        </div>

        <ul className="nav-links">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} onClick={closeMenu}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
