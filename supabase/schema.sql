-- profiles (auth.users 확장)
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null,
  avatar_url text,
  created_at timestamptz default now()
);

-- bakeries
create table if not exists bakeries (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  name_ko text not null,
  description text,
  short_desc text,
  image text,
  images text[] default '{}',
  rating numeric(3,2) default 0,
  review_count integer default 0,
  location text,
  address text,
  tags text[] default '{}',
  category text,
  is_open boolean default false,
  open_time text,
  close_time text,
  phone text,
  website text,
  price_range text check (price_range in ('₩', '₩₩', '₩₩₩')),
  wait_time integer,
  distance text,
  created_at timestamptz default now()
);

-- menu_items
create table if not exists menu_items (
  id uuid default gen_random_uuid() primary key,
  bakery_id uuid references bakeries on delete cascade not null,
  name text not null,
  name_ko text not null,
  price integer not null,
  image text,
  is_new boolean default false,
  is_best boolean default false
);

-- reviews
create table if not exists reviews (
  id uuid default gen_random_uuid() primary key,
  bakery_id uuid references bakeries on delete cascade not null,
  user_id uuid references auth.users on delete cascade not null,
  author_name text not null,
  rating integer check (rating between 1 and 5) not null,
  content text not null,
  images text[] default '{}',
  created_at timestamptz default now()
);

-- favorites
create table if not exists favorites (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  bakery_id uuid references bakeries on delete cascade not null,
  created_at timestamptz default now(),
  unique(user_id, bakery_id)
);

-- RLS 활성화
alter table profiles enable row level security;
alter table bakeries enable row level security;
alter table menu_items enable row level security;
alter table reviews enable row level security;
alter table favorites enable row level security;

-- profiles: 본인만 읽기/쓰기
create policy "profiles_select" on profiles for select using (auth.uid() = id);
create policy "profiles_insert" on profiles for insert with check (auth.uid() = id);
create policy "profiles_update" on profiles for update using (auth.uid() = id);

-- bakeries: 모두 읽기 가능
create policy "bakeries_select" on bakeries for select using (true);

-- menu_items: 모두 읽기 가능
create policy "menu_items_select" on menu_items for select using (true);

-- reviews: 모두 읽기, 로그인 유저만 작성
create policy "reviews_select" on reviews for select using (true);
create policy "reviews_insert" on reviews for insert with check (auth.uid() = user_id);
create policy "reviews_delete" on reviews for delete using (auth.uid() = user_id);

-- favorites: 본인 것만 읽기/쓰기/삭제
create policy "favorites_select" on favorites for select using (auth.uid() = user_id);
create policy "favorites_insert" on favorites for insert with check (auth.uid() = user_id);
create policy "favorites_delete" on favorites for delete using (auth.uid() = user_id);

-- 회원가입 시 profiles 자동 생성 트리거
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, name)
  values (new.id, coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)));
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- 베이커리 평점/리뷰 수 갱신 함수
create or replace function refresh_bakery_rating(p_bakery_id uuid)
returns void language plpgsql security definer as $$
begin
  update bakeries
  set
    rating = (select round(avg(rating)::numeric, 2) from reviews where bakery_id = p_bakery_id),
    review_count = (select count(*) from reviews where bakery_id = p_bakery_id)
  where id = p_bakery_id;
end;
$$;
