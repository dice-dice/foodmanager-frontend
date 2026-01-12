import { ReactNode } from 'react';
import { Navbar } from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Navbar />
      <main className="container py-4 flex-grow-1">{children}</main>
      <footer className="bg-light py-3 mt-auto">
        <div className="container text-center text-muted">
          <small>Food Manager v2</small>
        </div>
      </footer>
    </div>
  );
}
