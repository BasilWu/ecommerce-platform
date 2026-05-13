import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import Link from 'next/link';
import ProductImage from '@/components/ProductImage';
import CartItemActions from './CartItemActions';

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

async function getUserId() {
  const token = (await cookies()).get('token')?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload.userId as string;
  } catch {
    return null;
  }
}

export default async function CartPage() {
  const userId = await getUserId();

  if (!userId) {
    return (
      <main className="container section">
        <div className="page-header">
          <h1>購物車</h1>
          <p>請先登入會員後查看購物車內容。</p>
        </div>

        <div className="card" style={{ padding: 28 }}>
          <Link href="/login" className="btn">
            前往登入
          </Link>
        </div>
      </main>
    );
  }

  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: { product: true },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  const items = cart?.items ?? [];
  const total = items.reduce((sum: number, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  return (
    <main className="container section">
      <div className="page-header">
        <h1>購物車</h1>
        <p>確認商品內容、調整數量，準備進入結帳流程。</p>
      </div>

      {items.length === 0 ? (
        <div className="card" style={{ padding: 28 }}>
          <p className="muted" style={{ marginTop: 0 }}>
            你的購物車目前是空的。
          </p>
          <Link href="/products" className="btn">
            去逛商品
          </Link>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.3fr 0.7fr',
            gap: 20,
            alignItems: 'start',
          }}
          className="cart-layout"
        >
          <div style={{ display: 'grid', gap: 16 }}>
            {items.map((item) => (
              <div
                key={item.id}
                className="card"
                style={{
                  padding: 16,
                  display: 'grid',
                  gridTemplateColumns: '112px 1fr auto',
                  gap: 16,
                  alignItems: 'center',
                }}
              >
                <Link href={`/products/${item.product.id}`}>
                  <ProductImage
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    borderRadius={18}
                  />
                </Link>

                <div>
                  <Link
                    href={`/products/${item.product.id}`}
                    style={{
                      display: 'block',
                      fontWeight: 800,
                      marginBottom: 6,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {item.product.name}
                  </Link>

                  <p style={{ margin: '0 0 6px', color: '#6c675f', fontSize: 14 }}>
                    {item.product.category}
                  </p>

                  <p style={{ margin: 0, fontWeight: 800 }}>
                    NT$ {item.product.price.toLocaleString()} × {item.quantity}
                  </p>

                  <CartItemActions itemId={item.id} quantity={item.quantity} />
                </div>

                <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: '-0.03em' }}>
                  NT$ {(item.product.price * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          <aside className="card" style={{ padding: 22, position: 'sticky', top: 110 }}>
            <h2 style={{ margin: '0 0 18px', fontSize: 22, letterSpacing: '-0.03em' }}>
              訂單摘要
            </h2>

            <div style={{ display: 'grid', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <span className="muted">商品數量</span>
                <strong>{items.length} 項</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <span className="muted">商品總額</span>
                <strong>NT$ {total.toLocaleString()}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <span className="muted">運費</span>
                <strong>NT$ 0</strong>
              </div>

              <div
                style={{
                  height: 1,
                  background: '#ece3d8',
                  margin: '4px 0',
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <span style={{ fontWeight: 700 }}>應付總額</span>
                <strong style={{ fontSize: 24, letterSpacing: '-0.03em' }}>
                  NT$ {total.toLocaleString()}
                </strong>
              </div>
            </div>

            <button
              className="btn"
              style={{ width: '100%', marginTop: 20, height: 50 }}
            >
              前往結帳
            </button>

            <Link
              href="/products"
              className="btn btn-secondary"
              style={{ width: '100%', marginTop: 10, display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}
            >
              繼續購物
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}
