type Props = {
  params: { id: string };
};

export default function ProductDetailPage({ params }: Props) {
  return (
    <main className="container section">
      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', alignItems: 'start', gap: 32 }}>
        <div className="card" style={{ minHeight: 520, background: '#1a1a1a' }} />
        <div>
          <p className="muted">商品 ID：{params.id}</p>
          <h1 style={{ marginTop: 8 }}>商品名稱 {params.id}</h1>
          <p className="muted" style={{ lineHeight: 1.8 }}>
            這裡之後會放商品描述、規格、庫存、價格與加入購物車按鈕。正式案通常還會加圖片輪播、配送方式、評價區塊與推薦商品。
          </p>

          <div style={{ margin: '24px 0', fontSize: 24, fontWeight: 800 }}>
            NT$ 1,280
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn">加入購物車</button>
            <button className="btn" style={{ background: 'transparent' }}>立即購買</button>
          </div>
        </div>
      </div>
    </main>
  );
}
