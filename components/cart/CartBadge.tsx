'use client';

import { useCart } from './CartContext';

export default function CartBadge() {
  const { cart, openCart } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      className="cart-badge-button"
      aria-label={`購物車，目前 ${cart.count} 件商品`}
    >
      <span>購物車</span>
      <span className={`cart-badge-count ${cart.count > 0 ? 'has-items' : ''}`}>
        {cart.count > 99 ? '99+' : cart.count}
      </span>
    </button>
  );
}
