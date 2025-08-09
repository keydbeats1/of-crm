-- Enable RLS
alter table users enable row level security;
alter table profiles enable row level security;
alter table models enable row level security;
alter table chatter_model_assignments enable row level security;
alter table shifts enable row level security;
alter table shift_assignments enable row level security;
alter table clock_logs enable row level security;
alter table sales enable row level security;
alter table payout_rules enable row level security;
alter table invoices enable row level security;
alter table availability_windows enable row level security;
alter table notifications enable row level security;
alter table activity_log enable row level security;
alter table settings enable row level security;

-- Basic policies (admin open; others restricted)
create policy users_self_or_admin on users for select using (
  auth.uid() = id or exists(select 1 from users u where u.id = auth.uid() and u.role = 'admin')
);

create policy profiles_self_or_admin on profiles for select using (
  user_id = auth.uid() or exists(select 1 from users u where u.id = auth.uid() and u.role in ('admin','supervisor'))
);

create policy models_read_all on models for select using (true);

create policy cma_visibility on chatter_model_assignments for select using (
  chatter_id = auth.uid() or exists(select 1 from users u where u.id = auth.uid() and u.role in ('admin','supervisor'))
);

create policy shifts_read_all on shifts for select using (true);

create policy shift_assignments_self_or_admin on shift_assignments for select using (
  chatter_id = auth.uid() or exists(select 1 from users u where u.id = auth.uid() and u.role in ('admin','supervisor'))
);
create policy shift_assignments_insert_self on shift_assignments for insert with check (chatter_id = auth.uid());

create policy clock_read_team on clock_logs for select using (
  chatter_id = auth.uid() or exists(select 1 from users u where u.id = auth.uid() and u.role in ('admin','supervisor'))
);
create policy clock_insert_self on clock_logs for insert with check (chatter_id = auth.uid());
create policy clock_update_self on clock_logs for update using (chatter_id = auth.uid());

create policy sales_visibility on sales for select using (
  chatter_id = auth.uid() or exists(select 1 from users u where u.id = auth.uid() and u.role in ('admin','supervisor'))
);
create policy sales_insert_self on sales for insert with check (chatter_id = auth.uid());

create policy payout_rules_admin_read on payout_rules for select using (
  exists(select 1 from users u where u.id = auth.uid() and u.role='admin')
);

create policy invoices_admin_read on invoices for select using (
  exists(select 1 from users u where u.id = auth.uid() and u.role='admin')
);

create policy availability_self_or_admin on availability_windows for select using (
  chatter_id = auth.uid() or exists(select 1 from users u where u.id = auth.uid() and u.role in ('admin','supervisor'))
);

create policy notifications_self on notifications for select using (user_id = auth.uid());

create policy settings_admin on settings for select using (
  exists(select 1 from users u where u.id = auth.uid() and u.role='admin')
);

-- NOTE: tighten further based on your exact needs (e.g., supervisors seeing only their team via profiles.supervisor_id)
