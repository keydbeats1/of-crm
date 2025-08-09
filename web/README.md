# OF-CRM Web Application

Next.js 14 (App Router) + TypeScript + Tailwind + Supabase CRM aplikacija za OnlyFans chat operacije.

## 🚀 Quick Start

### 1. Environment Setup

Kopirajte environment varijable:
```bash
# Create .env.local and add your Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
TEST_USER_ID=cccccccc-cccc-cccc-cccc-cccccccccccc
```

### 2. Install & Run

```bash
npm install
npm run dev
```

Otvorite http://localhost:3000

### 3. Database Setup

Pokrenite SQL migracije u Supabase SQL Editor redosledom:
1. `../supabase/migrations/000_init.sql`
2. `../supabase/migrations/001_policies.sql`
3. `../supabase/seeds/seed_users.sql` (optional - test data)

## 📁 Project Structure

```
web/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── clock/         # Clock in/out endpoints
│   │   ├── sales/         # Sales logging
│   │   ├── shifts/        # Shift management
│   │   └── reports/       # Analytics endpoints
│   ├── dashboard/         # Main dashboard
│   ├── login/            # Authentication
│   └── reports/          # Reporting interface
├── lib/                   # Utilities
│   └── supabase.ts       # Supabase client configuration
├── middleware.ts         # Route protection (placeholder)
├── package.json          # Dependencies
├── tailwind.config.ts    # Tailwind configuration
└── tsconfig.json         # TypeScript config
```

## 🎯 Features

### ✅ Implemented:
- **Auth System** - Email/password autentifikacija
- **Role Management** - Admin, Supervisor, Chatter roles
- **Time Tracking** - Clock in/out funkcionalnost
- **Sales Logging** - Sales tracking sa validation
- **Shift Management** - Basic shift display
- **Reports** - Daily earnings reports
- **RLS Security** - Row-level security policies

### 🔧 API Endpoints:
- `POST /api/clock/in` - Clock in
- `POST /api/clock/out` - Clock out
- `POST /api/sales` - Log sale
- `GET /api/shifts` - List shifts
- `GET /api/reports/earnings` - Earnings report

## 💾 Database Schema

Key tables:
- `users` - User accounts (admin/supervisor/chatter roles)
- `profiles` - Extended user info
- `models` - OnlyFans model accounts
- `shifts` - Work schedules
- `clock_logs` - Time tracking
- `sales` - Revenue tracking

## 🛡️ Security

- Row Level Security (RLS) enabled
- Role-based access control
- Session-based authentication
- Secure API endpoints

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Validation**: Zod
- **Data Fetching**: SWR

## 🔄 Development

### Adding New Features

1. **Database changes**: Add to `../supabase/migrations/`
2. **API routes**: Create in `app/api/`
3. **UI components**: Add to appropriate app directory
4. **Types**: Update TypeScript interfaces

### Environment Variables

Required for production:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
TEST_USER_ID=test_user_uuid
```

## 📞 Support

For issues or questions, contact the development team.

---

**Stack**: Next.js 14 + TypeScript + Tailwind + Supabase + RLS
