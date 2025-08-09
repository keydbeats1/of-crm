# OF-CRM

## Stack: Next.js 14 (App Router) + TypeScript + Tailwind + Supabase

A comprehensive CRM system for OnlyFans chat operations with role-based access control, time tracking, sales logging, and reporting.

### Features

- **Authentication**: Email/password login with Supabase Auth
- **Role-based access**: Admin, Supervisor, and Chatter roles
- **Time tracking**: Clock in/out functionality
- **Sales logging**: Track subscriber interactions and revenue
- **Shift management**: Schedule and manage work shifts
- **Reporting**: Daily earnings reports and analytics
- **RLS Security**: Row-level security policies for data protection

## Quick Start

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd of-crm
npm install
```

### 2. Set up Supabase

1. Create a new project at [Supabase](https://supabase.com)
2. In the SQL Editor, run the migrations in order:
   - First run `supabase/migrations/000_init.sql`
   - Then run `supabase/migrations/001_policies.sql`
   - Optionally run `supabase/seeds/seed_users.sql` for test data

3. In Supabase Auth settings:
   - Enable email/password authentication
   - Disable email confirmations for development (optional)

### 3. Environment Variables

Copy the example environment file and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Fill in these values from your Supabase project settings:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
TEST_USER_ID=cccccccc-cccc-cccc-cccc-cccccccccccc
```

### 4. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` and navigate to `/login` to get started.

## Test Accounts

If you ran the seed data, you can use these test accounts:

- **Admin**: `admin@example.com`
- **Supervisor**: `super@example.com` 
- **Chatter**: `chatter@example.com`

(You'll need to set passwords in Supabase Auth manually)

## Project Structure

```
of-crm/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── clock/         # Clock in/out endpoints
│   │   ├── sales/         # Sales logging
│   │   ├── shifts/        # Shift management
│   │   └── reports/       # Analytics endpoints
│   ├── dashboard/         # Main dashboard components
│   ├── login/            # Authentication
│   └── reports/          # Reporting interface
├── lib/                   # Utilities
│   └── supabase.ts       # Supabase client configuration
├── supabase/             # Database schema and migrations
│   ├── migrations/       # SQL schema files
│   └── seeds/           # Sample data
└── middleware.ts         # Route protection (placeholder)
```

## API Endpoints

### Clock Management
- `POST /api/clock/in` - Clock in
- `POST /api/clock/out` - Clock out

### Sales
- `POST /api/sales` - Log a sale
  ```json
  {
    "subscriber": "username",
    "amount": 25.99,
    "modelId": "model-uuid"
  }
  ```

### Shifts
- `GET /api/shifts` - List available shifts

### Reports
- `GET /api/reports/earnings?granularity=day` - Daily earnings totals

## Database Schema

### Core Tables

- **users** - User accounts with roles (admin/supervisor/chatter)
- **profiles** - Extended user profile information
- **models** - OnlyFans model accounts
- **chatter_model_assignments** - Which chatters work with which models
- **shifts** - Scheduled work periods
- **shift_assignments** - Chatter shift assignments
- **clock_logs** - Time tracking records
- **sales** - Revenue tracking
- **payout_rules** - Commission rules
- **invoices** - Payment processing

### Security

All tables use Row Level Security (RLS) with policies that:
- Allow users to see their own data
- Allow admins to see everything
- Allow supervisors to see their team's data
- Restrict sensitive operations by role

## Development

### Adding New Features

1. **Database changes**: Add migrations to `supabase/migrations/`
2. **API routes**: Create new endpoints in `app/api/`
3. **UI components**: Add to appropriate app directory
4. **Types**: Update TypeScript interfaces as needed

### Security Notes

- The current implementation uses a `TEST_USER_ID` environment variable for API authentication
- In production, implement proper JWT token validation in middleware
- Consider adding 2FA for admin accounts
- Review and tighten RLS policies based on your specific requirements

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

Ensure your deployment platform supports:
- Node.js 18+
- Environment variables
- PostgreSQL connection (via Supabase)

## License

Private project - All rights reserved

## Support

For questions or issues, please contact the development team.