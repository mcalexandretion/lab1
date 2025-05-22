import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CatalogPage from './pages/CatalogPage';
import FurnitureDetailPage from './pages/FurnitureDetailPage';
import ConstructorPage from './pages/ConstructorPage';
import ConstructedModelsPage from './pages/ConstructedModelsPage';
import Header from './components/Header';
import FurnitureConstructorPageWrapper from './pages/FurnitureConstructorPageWrapper';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<CatalogPage />} />
      <Route path="/furniture/:id" element={<FurnitureDetailPage />} />
      <Route path="/furniture/:id/constructor" element={<FurnitureConstructorPageWrapper source="original" />} />
      <Route path="/constructed" element={<ConstructedModelsPage />} />
      <Route path="/constructed/:id/constructor" element={<FurnitureConstructorPageWrapper source="constructed" />} />
      <Route path="/constructor" element={<ConstructorPage />} />
    </Routes>
  </Router>
);

export default App;
