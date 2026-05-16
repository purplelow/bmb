-- 베이커리 시드 데이터 (Mock → DB)
insert into bakeries (id, name, name_ko, description, short_desc, image, images, rating, review_count, location, address, tags, category, is_open, open_time, close_time, phone, website, price_range, wait_time, distance) values
(
  'b1000000-0000-0000-0000-000000000001',
  'Le Petit Croissant', '르 쁘띠 크루아상',
  '파리에서 직접 전수받은 레시피로 만드는 정통 프랑스 베이커리. 버터의 결이 살아있는 크루아상과 繊細한 페이스트리를 매일 아침 직접 구워냅니다. 프랑스 AOC 버터만을 사용하여 깊고 풍부한 맛을 자랑합니다.',
  '파리 정통 레시피의 버터 크루아상',
  'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=1200',
  array['https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800','https://images.unsplash.com/photo-1461009683693-342af2f2d6ce?auto=format&fit=crop&q=80&w=800','https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800','https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80&w=800'],
  4.8, 342, '강남구', '서울 강남구 청담동 123-4 1층',
  array['크루아상','페이스트리','프렌치'], '크루아상',
  true, '08:00', '20:00', '02-1234-5678', 'lepetitcroissant.kr', '₩₩₩', 15, '1.2km'
),
(
  'b1000000-0000-0000-0000-000000000002',
  'Sourdough Society', '사워도우 소사이어티',
  '72시간 장기 발효 공법으로 만드는 천연발효 빵 전문점. 화학 첨가물 없이 오직 밀가루, 물, 소금만으로 깊은 맛을 만들어냅니다.',
  '72시간 장기발효 천연효모 빵',
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1200',
  array['https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800','https://images.unsplash.com/photo-1534620808146-d33bb39128b2?auto=format&fit=crop&q=80&w=800','https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=800'],
  4.9, 521, '한남동', '서울 용산구 한남동 45-2 지하 1층',
  array['식빵','천연발효','건강'], '식빵',
  true, '09:00', '19:00', '02-9876-5432', 'sourdoughsociety.kr', '₩₩', 30, '3.4km'
),
(
  'b1000000-0000-0000-0000-000000000003',
  'Cream & Crumb', '크림 앤 크럼',
  '성수동 감성이 가득한 도넛 & 커피 전문점. 매일 아침 직접 만드는 수제 도넛과 스페셜티 커피의 완벽한 조합.',
  '성수동 힙한 수제 도넛 카페',
  'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=1200',
  array['https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=800','https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800'],
  4.7, 289, '성수동', '서울 성동구 성수이로 78 2층',
  array['도넛','카페','비주얼맛집'], '도넛',
  false, '11:00', '21:00', '02-5555-6789', 'creamandcrumb.co.kr', '₩₩', null, '5.1km'
),
(
  'b1000000-0000-0000-0000-000000000004',
  'Salt & Dough', '솔트 앤 도우',
  '일본 시오빵을 한국 입맛에 맞게 재해석한 소금빵 전문점. 버터를 듬뿍 넣어 만든 비밀 레시피로 겉은 바삭, 속은 촉촉한 최고의 소금빵을 선보입니다.',
  '줄 서서 먹는 소금빵 맛집',
  'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80&w=1200',
  array['https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80&w=800','https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&q=80&w=800'],
  4.6, 412, '마포구', '서울 마포구 합정동 32-1',
  array['소금빵','베이커리','인기'], '소금빵',
  true, '08:30', '18:00', '02-3456-7890', 'saltanddough.kr', '₩', 20, '2.8km'
),
(
  'b1000000-0000-0000-0000-000000000005',
  'Mille Cake', '밀레 케이크',
  '프랑스 정통 밀크레이프와 제철 과일 케이크 전문점. 40겹의 얇은 크레이프와 직접 만드는 크림으로 만드는 핸드메이드 케이크.',
  '40겹 수제 밀크레이프 케이크',
  'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1200',
  array['https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800','https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=800'],
  4.9, 178, '서초구', '서울 서초구 방배동 11-22',
  array['케이크','밀크레이프','프리미엄'], '케이크',
  true, '10:00', '20:00', '02-7777-8888', 'millecake.kr', '₩₩₩', null, '4.5km'
),
(
  'b1000000-0000-0000-0000-000000000006',
  'Bagel Bros', '베이글 브로스',
  '뉴욕 스타일 정통 베이글 전문점. 케틀 베이킹 방식으로 만들어 쫄깃한 식감이 살아있는 진짜 베이글.',
  'NY 스타일 케틀 베이킹 베이글',
  'https://images.unsplash.com/photo-1509722747041-616f39b57ef3?auto=format&fit=crop&q=80&w=1200',
  array['https://images.unsplash.com/photo-1509722747041-616f39b57ef3?auto=format&fit=crop&q=80&w=800'],
  4.5, 203, '이태원', '서울 용산구 이태원동 56-7',
  array['베이글','뉴욕','브런치'], '베이글',
  true, '08:00', '16:00', '02-2222-3333', 'bagelbros.kr', '₩₩', null, '3.9km'
);

-- 메뉴 시드 데이터
insert into menu_items (bakery_id, name, name_ko, price, image, is_best, is_new) values
('b1000000-0000-0000-0000-000000000001', 'Classic Butter Croissant', '클래식 버터 크루아상', 5500, 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=400', true, false),
('b1000000-0000-0000-0000-000000000001', 'Almond Croissant', '아몬드 크루아상', 6500, 'https://images.unsplash.com/photo-1461009683693-342af2f2d6ce?auto=format&fit=crop&q=80&w=400', false, true),
('b1000000-0000-0000-0000-000000000001', 'Pain au Chocolat', '팽 오 쇼콜라', 6000, 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80&w=400', false, false),
('b1000000-0000-0000-0000-000000000001', 'Canelé', '까눌레', 4500, 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400', false, false),
('b1000000-0000-0000-0000-000000000002', 'Country Sourdough', '컨트리 사워도우', 12000, 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400', true, false),
('b1000000-0000-0000-0000-000000000002', 'Rye Bread', '호밀빵', 10000, 'https://images.unsplash.com/photo-1534620808146-d33bb39128b2?auto=format&fit=crop&q=80&w=400', false, false),
('b1000000-0000-0000-0000-000000000002', 'Walnut Sourdough', '호두 사워도우', 14000, 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&q=80&w=400', false, true),
('b1000000-0000-0000-0000-000000000003', 'Cream Glazed Donut', '크림 글레이즈 도넛', 4800, 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=400', true, false),
('b1000000-0000-0000-0000-000000000003', 'Matcha Croffle', '말차 크로플', 5500, 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=400', false, true),
('b1000000-0000-0000-0000-000000000004', 'Classic Salt Bread', '클래식 소금빵', 2800, 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80&w=400', true, false),
('b1000000-0000-0000-0000-000000000004', 'Cheese Salt Bread', '치즈 소금빵', 3500, 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&q=80&w=400', false, true),
('b1000000-0000-0000-0000-000000000005', 'Original Mille Crepe', '오리지널 밀크레이프', 8500, 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400', true, false),
('b1000000-0000-0000-0000-000000000005', 'Strawberry Season Cake', '딸기 시즌 케이크', 9500, 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=400', false, true),
('b1000000-0000-0000-0000-000000000006', 'Plain Bagel', '플레인 베이글', 3500, 'https://images.unsplash.com/photo-1509722747041-616f39b57ef3?auto=format&fit=crop&q=80&w=400', true, false);
