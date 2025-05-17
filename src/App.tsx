import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CatalogPage from './pages/CatalogPage';
import FurnitureDetailPage from './pages/FurnitureDetailPage';
import FurnitureConstructorPage from './pages/FurnitureConstructorPage';
import Header from './components/Header';
import ConstructorPage from './pages/ConstructorPage'; // новый пустой конструктор
import ConstructedModelsPage from './pages/ConstructedModelsPage'; // новый список собранных моделей

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<CatalogPage />} />
      <Route path="/furniture/:id" element={<FurnitureDetailPage />} />
      <Route path="/furniture/:id/constructor" element={<FurnitureConstructorPage />} />
      <Route path="/constructor" element={<ConstructorPage />} />
      <Route path="/constructed" element={<ConstructedModelsPage />} />
    </Routes>
  </Router>
);

export default App;
