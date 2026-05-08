type Props = {
  params: { id: string };
};

export default function OrdersPage({ params }: Props) {
  return (
    <main className="container section">
      <h1>訂單管理</h1>
      <p className="muted">這裡之後會放訂單列表、訂單詳情等功能。</p>
    </main>
  );
}