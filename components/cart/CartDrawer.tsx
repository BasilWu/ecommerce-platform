'use client';

import Link from 'next/link';
import { useCart } from './CartContext';

export default function CartDrawer() {
  const { cart, isOpen, closeCart } = useCart();

  return (
    <>
      <div
        className={`cart-drawer-backdrop ${isOpen ? 'show' : ''}`}
        onClick={closeCart}
      />

      <aside className={`cart-drawer ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
        <div className="cart-drawer-header">
          <div>
            <p className="cart-drawer-eyebrow">購物車</p>
            <h3>已加入 {cart.count} 件商品</h3>
          </div>
          <button type="button" onClick={closeCart} className="cart-drawer-close">
            ✕
          </button>
        </div>

        <div className="cart-drawer-body">
          {cart.items.length === 0 ? (
            <div className="cart-drawer-empty">
              <p>你的購物車目前沒有商品。</p>
            </div>
          ) : (
            <div className="cart-drawer-list">
              {cart.items.map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.productId}`}
                  className="cart-drawer-item"
                  onClick={closeCart}
                >
                  <div className="cart-drawer-thumb">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} />
                    ) : (
                      <div className="cart-drawer-thumb-fallback" />
                    )}
                  </div>

                  <div className="cart-drawer-item-content">
                    <p className="cart-drawer-item-title">{item.name}</p>
                    <p className="cart-drawer-item-meta">
                      {item.category} · 數量 {item.quantity}
                    </p>
                  </div>

                  <div className="cart-drawer-item-price">
                    NT$ {item.subtotal.toLocaleString()}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="cart-drawer-footer">
          <div className="cart-drawer-total">
            <span>小計</span>
            <strong>NT$ {cart.total.toLocaleString()}</strong>
          </div>

          <div className="cart-drawer-actions">
            <Link href="/cart" className="btn btn-secondary" onClick={closeCart}>
              查看購物車
            </Link>
            <Link href="/checkout" className="btn" onClick={closeCart}>
              前往結帳
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
