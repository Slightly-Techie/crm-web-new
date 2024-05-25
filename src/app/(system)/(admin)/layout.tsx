import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <h1>Admin page</h1>
      {children}
    </main>
  );
}
