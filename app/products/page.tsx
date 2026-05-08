import ProductCard from '../../components/ProductCard';

const products = [
  { id: 1, name: '商品 1', price: 1000, tag: '熱銷' },
  { id: 2, name: '商品 2', price: 1300, tag: '新上架' },
  { id: 3, name: '商品 3', price: 1600, tag: '推薦' },
  { id: 4, name: '商品 4', price: 1900 },
  { id: 5, name: '商品 5', price: 2200 },
  { id: 6, name: '商品 6', price: 2500 },
];

export default function ProductsPage() {
  return (
    <main className="container section">
      <h1>商品列表</h1>
      <p className="muted">先用靜態資料建立出可提案的展示頁。</p>

      <div className="grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', marginTop: 20 }}>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </main>
  );
}
