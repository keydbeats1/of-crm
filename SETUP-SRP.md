# OF-CRM - Instrukcije za postavku (Srpski)

## 🚀 Brza Instalacija

### 1. Instaliranje dependencies

```bash
npm install
```

### 2. Kreiranje Supabase projekta

1. Idite na [Supabase](https://supabase.com) i kreirajte novi projekat
2. U SQL Editor-u pokrenite ove migracije **redosledom**:
   - `supabase/migrations/000_init.sql` (prvo)
   - `supabase/migrations/001_policies.sql` (drugo)
   - `supabase/seeds/seed_users.sql` (opciono - test podaci)

### 3. Environment varijable

Kopirajte Supabase credentials u `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
TEST_USER_ID=cccccccc-cccc-cccc-cccc-cccccccccccc
```

**Gde da nađete ove vrednosti:**
- Idite u Supabase projekat → Settings → API
- `URL` = Project URL
- `anon key` = anon public key  
- `service_role key` = service_role secret key

### 4. Podešavanje Auth-a

U Supabase-u:
1. Authentication → Settings → Auth providers
2. Omogućite "Email" provider
3. Za test - isključite email potvrde

### 5. Pokretanje aplikacije

```bash
npm run dev
```

Otvorite http://localhost:3000

## 📋 Test Nalozi

Ako ste pokrenuli seed podatke:

- **Admin**: `admin@example.com` 
- **Supervisor**: `super@example.com`
- **Chatter**: `chatter@example.com`

**NAPOMENA**: Trebate da kreirate šifre za ove naloge u Supabase Auth-u ručno.

## 🏗️ Funkcionalnosti

### ✅ Gotove funkcionalnosti:
- **Prijava/odjava** - Email/password autentifikacija
- **Role-based pristup** - Admin, Supervisor, Chatter
- **Clock in/out** - Praćenje radnog vremena
- **Sales logging** - Beleške o prodaji
- **Shift management** - Upravljanje smenama  
- **Izveštaji** - Dnevni izveštaji o zaradi
- **RLS Sigurnost** - Row-level security

### 🔧 API Endpoints:
- `POST /api/clock/in` - Početak smene
- `POST /api/clock/out` - Kraj smene
- `POST /api/sales` - Logovanje prodaje
- `GET /api/shifts` - Lista smena
- `GET /api/reports/earnings` - Izveštaji o zaradi

## 🎯 Sledeći koraci

1. **Kreiranje test naloga:**
   ```sql
   -- U Supabase SQL Editor
   INSERT INTO auth.users (email, encrypted_password, email_confirmed_at)
   VALUES ('test@example.com', crypt('password123', gen_salt('bf')), now());
   ```

2. **Dodavanje real authentification** - Zameniti TEST_USER_ID sa JWT token parsing

3. **Custom middleware** - Implementirati role protection za rute

4. **UI poboljšanja** - Dodati loading states, better styling

## 🚨 Napomene za produkciju

- Zameniti placeholder vrednosti u `lib/supabase.ts`
- Implementirati pravi session management
- Dodati error monitoring
- Konfigurisati CORS pravilno
- Postaviti environment varijable na hosting platformi

## 📞 Pomoć

Za tehničku podršku kontaktirajte dev tim.

---

**Stack**: Next.js 14 + TypeScript + Tailwind + Supabase + RLS
