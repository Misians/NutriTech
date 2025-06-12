import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Menu.css';

import {
  FaTachometerAlt,
  FaUserInjured,
  FaUtensils,
  FaRunning,
  FaChartBar,
  FaHeart,
  FaCalculator,
  FaInfoCircle,
  FaEnvelope,
  FaHome,
  FaSun,
  FaMoon,
  FaSignOutAlt,
  FaBars, // Import hamburger icon
  FaTimes // Import close (X) icon
} from 'react-icons/fa';

const menuItems = [
  {
    name: 'Dashboard',
    icon: FaHome,
    path: '/',
    end: true
  },
  {
    name: 'Pacientes',
    icon: FaUserInjured,
    path: '/patients'
  },
  {
    name: 'Planos Alimentares',
    icon: FaUtensils,
    path: '/meal-plans'
  },
  {
    name: 'Perfil de Atividade Física',
    icon: FaRunning,
    path: '/physical-activity-profile'
  },
  {
    name: 'Relatórios',
    icon: FaChartBar,
    path: '/reports'
  },
  {
    name: 'Preferencias Alimentares',
    icon: FaHeart,
    path: '/food-preferences'
  },
  {
    name: 'Calculadoras',
    icon: FaCalculator,
    path: '/calculators'
  },
  {
    name: 'About',
    icon: FaInfoCircle,
    path: '/about'
  },
  {
    name: 'Contact',
    icon: FaEnvelope,
    path: '/contact'
  },
];

function Menu() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  // State for controlling menu visibility on mobile, default to open
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  useEffect(() => {
    document.body.className = theme + '-mode';
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Handle screen resize to close menu if resized to desktop from mobile,
  // or open if resized to mobile from desktop (or keep open if already open)
  useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth > 768) {
      // Always open on desktop
      setIsMenuOpen(true);
    } else {
      // On mobile, if it's currently open, close it.
      // This ensures that if you resize from desktop to mobile,
      // the menu doesn't remain open by default.
      setIsMenuOpen(false); // Changed this to explicitly close on mobile resize
    }
  };

  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Hamburger icon for mobile, hidden on desktop */}
      <div className="menu-toggle" onClick={toggleMenu}>
        <FaBars />
      </div>

      <nav className={`main-menu ${isMenuOpen ? 'open' : ''}`}> {/* Apply 'open' class conditionally */}
        {/* Close icon for mobile, inside the menu */}
       

        <ul className="menu-list-top">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  isActive ? 'menu-item active-link' : 'menu-item'
                }
                end={item.end}
                // Close menu on item click if on mobile
                onClick={() => window.innerWidth <= 768 && setIsMenuOpen(false)}
              >
                <item.icon className="menu-icon" /> {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="menu-bottom-section">
          <div className='darkmode' onClick={toggleTheme}>
            {theme === 'light' ? (
              <FaSun className="menu-icon" />
            ) : (
              <FaMoon className="menu-icon" />
            )}{' '}
            {theme === 'light' ? 'Light' : 'Dark'} mode
          </div>
          <div className="logout">
            <FaSignOutAlt className="menu-icon" /> logout
          </div>
        </div>
      </nav>
    </>
  );
}

export default Menu;