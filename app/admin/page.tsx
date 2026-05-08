type Props = {  params: { id: string }};

export default function AdminPage({ params }: Props) {
  return (
    <main className="container section">
      <h1>管理後台</h1>
      <p className="muted">這裡之後會放訂單管理、商品管理、用戶管理等功能。</p>
    </main>
  );
}