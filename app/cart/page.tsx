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
        <h1 style={{ marginBottom: 16 }}>購物車</h1>
        <p className="muted">請先登入會員後查看購物車。</p>
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
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <main className="container section" style={{ maxWidth: 960 }}>
      <h1 style={{ marginBottom: 24 }}>購物車</h1>

      {items.length === 0 ? (
        <div className="card" style={{ padding: 24 }}>
          <p className="muted" style={{ marginBottom: 16 }}>你的購物車目前是空的。</p>
          <Link href="/products" className="btn" style={{ background: '#ec4899', color: '#fff' }}>
            去逛商品
          </Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 16 }}>
          {items.map((item) => (
            <div
              key={item.id}
              className="card"
              style={{ padding: 16, display: 'grid', gridTemplateColumns: '96px 1fr auto', gap: 16, alignItems: 'center' }}
            >
              <ProductImage src={item.product.imageUrl} alt={item.product.name} borderRadius={14} />
              <div>
                <h3 style={{ margin: '0 0 6px' }}>{item.product.name}</h3>
                <p style={{ margin: '0 0 4px', color: '#666', fontSize: 14 }}>{item.product.category}</p>
                <p style={{ margin: 0, color: '#111', fontWeight: 700 }}>
                  NT$ {item.product.price.toLocaleString()} × {item.quantity}
                </p>
              </div>
              <div style={{ fontWeight: 800 }}>
                NT$ {(item.product.price * item.quantity).toLocaleString()}
              </div>
              <CartItemActions itemId={item.id} quantity={item.quantity} />
            </div>
          ))}

          <div className="card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>總金額</span>
              <span style={{ fontSize: 24, fontWeight: 900 }}>NT$ {total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
