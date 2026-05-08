import Link from 'next/link';

type ProductCardProps = {
  id: number;
  name: string;
  price: number;
  tag?: string;
};

export default function ProductCard({ id, name, price, tag }: ProductCardProps) {
  return (
    <Link href={`/products/${id}`} className="card" style={{ padding: 20, display: 'block' }}>
      <div style={{ height: 180, borderRadius: 12, background: '#1f1f1f', marginBottom: 16 }} />
      {tag ? <p className="muted" style={{ margin: 0 }}>{tag}</p> : null}
      <h3 style={{ margin: '12px 0 8px' }}>{name}</h3>
      <p style={{ margin: 0, fontWeight: 700 }}>NT$ {price.toLocaleString()}</p>
    </Link>
  );
}
