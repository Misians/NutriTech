// src/components/Menu.jsx
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react'; // Import useState and useEffect
import './Menu.css';

// Import all necessary icons from react-icons/fa
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
  FaSun,    // For light mode icon
  FaMoon,   // For dark mode icon
  FaSignOutAlt
} from 'react-icons/fa';

// Define your menu items in an array
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
  // 1. Theme State
  const [theme, setTheme] = useState(() => {
    // Initialize theme from localStorage or default to 'light'
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  // 2. Apply/Save Theme to Body and localStorage
  useEffect(() => {
    // Apply the theme class to the body element
    document.body.className = theme + '-mode'; // e.g., 'light-mode' or 'dark-mode'
    // Save the theme preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]); // Rerun whenever the theme state changes

  // 3. Toggle Theme Function
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <nav className="main-menu">
      <ul className="menu-list-top">
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive ? 'menu-item active-link' : 'menu-item'
              }
              end={item.end}
            >
              <item.icon className="menu-icon" /> {item.name}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="menu-bottom-section">
        <div className='darkmode' onClick={toggleTheme}> {/* Add onClick handler */}
          {theme === 'light' ? (
            <FaSun className="menu-icon" /> // Show sun icon for light mode
          ) : (
            <FaMoon className="menu-icon" /> // Show moon icon for dark mode
          )}{' '}
          {theme === 'light' ? 'Light' : 'Dark'} mode {/* Dynamic text */}
        </div>
        <div className="logout">
          <FaSignOutAlt className="menu-icon" /> logout
        </div>
      </div>
    </nav>
  );
}

export default Menu;