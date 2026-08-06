# Deploy — THPARFUMS

Two parts: **Supabase** (database) and **Vercel** (hosting). ~10 minutes.

---

## 1) Supabase

### a. Create the project (dashboard — one-time)
1. https://supabase.com/dashboard → **New project**. Pick a name + region (São Paulo)
   and set a **database password** (save it).
2. After it provisions, grab from **Project Settings → API**:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (secret!)

### b. Load schema + seed (pick ONE)

**Option A — psql CLI (recommended).** Connection string is in
**Project Settings → Database → Connection string → URI** (use the value, with your
password). Then from the project folder:

```bash
psql "postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres" \
  -f supabase/schema.sql -f supabase/seed.sql
```

**Option B — SQL editor (no tools).** Dashboard → **SQL Editor** → paste
`supabase/schema.sql`, Run → then paste `supabase/seed.sql`, Run.

### c. Create your admin user
Dashboard → **Authentication → Users → Add user** → email + password (this email goes
in `ADMIN_EMAILS`). You'll log in with it at `/admin`.

---

## 2) Vercel

```bash
npm i -g vercel        # if not installed
vercel login           # opens browser (you do this)
cd C:/Gusta/claudeops/mvp-thparfums
vercel link            # create/link a project (accept defaults)
```

### Add environment variables
Either in the dashboard (Project → Settings → Environment Variables) or via CLI
(`vercel env add <NAME> production`, then paste the value):

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | from Supabase API settings |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | from Supabase API settings |
| `SUPABASE_SERVICE_ROLE_KEY` | from Supabase API settings (secret) |
| `ADMIN_EMAILS` | your admin email |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `5554920004118` |

### Ship
```bash
vercel --prod
```

You get `https://<project>.vercel.app` — works on phone + desktop. Open it, then test
`/admin` with your Supabase user. Add a custom domain later in Vercel → Domains.

> Tip: if you push this folder to GitHub and import it in Vercel, every `git push`
> auto-deploys. Set the same env vars in the Vercel project either way.
