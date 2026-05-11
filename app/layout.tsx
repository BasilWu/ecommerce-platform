import './globals.css';
import Navbar from '@/components/Navbar';
import { AuthStatusProvider } from '@/components/AuthStatus';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>
        <AuthStatusProvider>
          <Navbar />
          {children}
        </AuthStatusProvider>
      </body>
    </html>
  );
}
