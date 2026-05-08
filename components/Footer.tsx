export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #262626', marginTop: 72 }}>
      <div className="container" style={{ padding: '32px 0', color: '#a3a3a3', display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <p style={{ margin: 0 }}>© 2026 Ecommerce Platform</p>
        <p style={{ margin: 0 }}>商品、會員、訂單、金流整合系統</p>
      </div>
    </footer>
  );
}
