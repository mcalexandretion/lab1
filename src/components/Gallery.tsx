interface Props {
  images: string[];
}

const Gallery = ({ images }: Props) => (
  <div style={{ display: 'flex', gap: 10 }}>
    {images.map((src, i) => (
      <img key={i} src={src} alt={`img-${i}`} width={150} />
    ))}
  </div>
);

export default Gallery;
