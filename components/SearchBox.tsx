'use client';

export default function SearchBox() {
  return (
    <div style={{ flex: 1, minWidth: 280, display: 'flex' }}>
      <input
        placeholder="搜尋商品、品牌或關鍵字"
        style={{
          flex: 1,
          padding: '14px 16px',
          border: '2px solid #ec4899',
          borderRight: 'none',
          borderRadius: '999px 0 0 999px',
          outline: 'none',
          color: '#111',
          background: '#fff',
        }}
      />
      <button
        type="button"
        style={{
          padding: '0 22px',
          border: '2px solid #ec4899',
          background: '#ec4899',
          color: '#fff',
          borderRadius: '0 999px 999px 0',
          fontWeight: 700,
        }}
      >
        搜尋
      </button>
    </div>
  );
}
