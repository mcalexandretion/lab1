import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => (
  <header>
    <nav>
      <Link to="/">
        Каталог мебели
      </Link>
      <Link to="/constructor">
        Конструктор
      </Link>
      <Link to="/constructed">
        Собранные модели
      </Link>
    </nav>
  </header>
);

export default Header;
