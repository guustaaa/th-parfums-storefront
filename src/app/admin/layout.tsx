import Link from "next/link";
import { LayoutGrid, LogOut, Package, Settings } from "lucide-react";
import { isSupabaseConfigured } from "@/lib/env";
import { getServerUser } from "@/lib/auth";
import { isAdminEmail } from "@/lib/env";
import { Logo } from "@/components/site/logo";
import { signOutAction } from "./actions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured) {
    return <SetupNotice />;
  }

  const user = await getServerUser();

  // Not logged in → render the page as-is (the login screen). Middleware
  // already redirects protected admin routes here.
  if (!user) return <>{children}</>;

  if (!isAdminEmail(user.email)) {
    return (
      <div className="container-page flex min-h-dvh flex-col items-center justify-center gap-4 text-center">
        <h1 className="font-display text-2xl">Sem permissão</h1>
        <p className="max-w-md text-sm text-muted">
          A conta <span className="text-foreground">{user.email}</span> não está
          na lista de administradores (<code>ADMIN_EMAILS</code>).
        </p>
        <form action={signOutAction}>
          <button className="text-sm text-silver underline">Sair</button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-bg md:flex-row">
      <aside className="flex shrink-0 flex-col gap-1 border-b border-border bg-surface p-4 md:w-60 md:border-b-0 md:border-r">
        <div className="mb-4 px-2 pt-1">
          <Logo variant="horizontal" wordClassName="text-base" />
          <p className="mt-1 text-[0.65rem] uppercase tracking-wider text-faint">
            Painel
          </p>
        </div>
        <NavLink href="/admin" icon={<LayoutGrid className="h-4 w-4" />}>
          Produtos
        </NavLink>
        <NavLink
          href="/admin/products/new"
          icon={<Package className="h-4 w-4" />}
        >
          Novo produto
        </NavLink>
        <NavLink href="/admin/settings" icon={<Settings className="h-4 w-4" />}>
          Configurações
        </NavLink>
        <div className="mt-auto space-y-1 pt-4">
          <Link
            href="/"
            className="block rounded-lg px-3 py-2 text-sm text-muted hover:bg-surface-2 hover:text-foreground"
          >
            Ver site →
          </Link>
          <form action={signOutAction}>
            <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted hover:bg-surface-2 hover:text-foreground cursor-pointer">
              <LogOut className="h-4 w-4" /> Sair
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 p-5 md:p-8">{children}</main>
    </div>
  );
}

function NavLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
    >
      {icon}
      {children}
    </Link>
  );
}

function SetupNotice() {
  return (
    <div className="container-page flex min-h-dvh flex-col items-center justify-center gap-4 text-center">
      <Logo variant="stacked" />
      <h1 className="mt-4 font-display text-2xl">Configure o Supabase</h1>
      <p className="max-w-md text-sm text-muted">
        O painel administrativo precisa do Supabase. Crie um projeto gratuito,
        rode <code>supabase/schema.sql</code> e adicione as variáveis{" "}
        <code>NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
        <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>,{" "}
        <code>SUPABASE_SERVICE_ROLE_KEY</code> e <code>ADMIN_EMAILS</code> no{" "}
        <code>.env.local</code>.
      </p>
      <Link href="/" className="text-sm text-silver underline">
        ← Voltar para a loja
      </Link>
    </div>
  );
}
