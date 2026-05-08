type Props = {
  params: { id: string };
};

export default function RegisterPage({ params }: Props) {
  return (
    <main className="container section">
      <h1>註冊頁面</h1>
      <p className="muted">這裡之後會放註冊表單、驗證等功能。</p>
    </main>
  );
}