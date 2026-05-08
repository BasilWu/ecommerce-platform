type Props = {
    params: { id: string };
};

export default function MemberPage({ params }: Props) {
    return (
        <main className="container section">
            <h1>會員中心</h1>
            <p className="muted">這裡之後會放會員資料、訂單紀錄、地址管理等功能。</p>
        </main>
    );
}