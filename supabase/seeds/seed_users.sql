-- seeds (optional): supabase/seeds/seed_users.sql
insert into users (id, email, role) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','admin@example.com','admin'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb','super@example.com','supervisor'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc','chatter@example.com','chatter')
  on conflict (id) do nothing;

insert into profiles (user_id, display_name) values
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa','Admin'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb','Supervisor'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc','Chatter')
  on conflict (user_id) do nothing;

-- Add some sample models
insert into models (id, name, platform) values
  ('11111111-1111-1111-1111-111111111111','Model A','onlyfans'),
  ('22222222-2222-2222-2222-222222222222','Model B','onlyfans')
  on conflict (id) do nothing;

-- Add some sample shifts
insert into shifts (id, date, start_at, end_at, capacity, model_id) values
  ('aaaabbbb-cccc-dddd-eeee-ffffaaaabbbb', current_date, current_date + interval '9 hours', current_date + interval '17 hours', 2, '11111111-1111-1111-1111-111111111111'),
  ('bbbbcccc-dddd-eeee-ffff-aaaabbbbcccc', current_date + interval '1 day', current_date + interval '1 day' + interval '10 hours', current_date + interval '1 day' + interval '18 hours', 1, '22222222-2222-2222-2222-222222222222')
  on conflict (id) do nothing;
