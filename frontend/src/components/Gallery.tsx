import { useState } from 'react';

interface Props {
  images: string[];
}

const Gallery = ({ images }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="Gallery" >
      <button onClick={prevImage}>←</button>
      <img
        src={images[currentIndex]}
        alt={`img-${currentIndex}`}

      />
      <button onClick={nextImage}>→</button>
    </div>
  );
};

export default Gallery;
