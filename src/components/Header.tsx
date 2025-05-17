import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => (
  <header style={styles.header}>
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>
        Каталог мебели
      </Link>
      <Link to="/constructor" style={styles.link}>
        Конструктор
      </Link>
      <Link to="/constructed" style={styles.link}>
        Собранные модели
      </Link>
    </nav>
  </header>
);

const styles: Record<string, React.CSSProperties> = {
  header: {
    backgroundColor: '#222',
    padding: '10px 20px',
  },
  nav: {
    display: 'flex',
    gap: 20,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default Header;
