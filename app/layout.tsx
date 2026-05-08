import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: '電商與金流系統',
  description: '商品、會員、購物車、結帳與金流整合平台',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
