import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  const router = useRouter();
  const isActive = router.pathname === href

  return (
    <Link
      href={href}
      className={`block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        isActive ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
      }`}
    >
      {children}
    </Link>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-56 bg-gray-900 p-4 flex flex-col gap-1">
        <Link href="/" className="text-white font-bold text-lg px-4 py-3 mb-4">
          Birl
        </Link>
        <NavLink href="/orders">Orders</NavLink>
        <NavLink href="/customers">Customers</NavLink>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
