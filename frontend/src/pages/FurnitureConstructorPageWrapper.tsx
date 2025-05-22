import { useParams } from 'react-router-dom';
import FurnitureConstructorPage from './FurnitureConstructorPage';

const FurnitureConstructorPageWrapper = ({ source }: { source: 'original' | 'constructed' }) => {
  const { id } = useParams<{ id: string }>();
  return <FurnitureConstructorPage source={source} id={id!} />;
};

export default FurnitureConstructorPageWrapper;
