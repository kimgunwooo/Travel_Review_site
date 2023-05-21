DROP DATABASE IF EXISTS travel_review;

CREATE DATABASE IF NOT EXISTS travel_review 
  DEFAULT CHARACTER SET utf8 
  DEFAULT COLLATE utf8_general_ci;

USE travel_review;

-- 회원 정보 테이블 생성
CREATE TABLE member_info (
  member_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  email VARCHAR(45) NOT NULL,
  age VARCHAR(45) NOT NULL,
  profile_image VARCHAR(255),
  PRIMARY KEY (member_id)
) ENGINE = InnoDB
  DEFAULT CHARACTER SET utf8 
  DEFAULT COLLATE utf8_general_ci;

-- 여행지 테이블 생성
CREATE TABLE travel_destination (
  destination_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  country VARCHAR(45) NOT NULL,
  region VARCHAR(45) NOT NULL,
  description TEXT NOT NULL,
  image VARCHAR(255),
  PRIMARY KEY (destination_id)
) ENGINE = InnoDB
  DEFAULT CHARACTER SET utf8 
  DEFAULT COLLATE utf8_general_ci;

-- 리뷰 테이블 생성
CREATE TABLE review (
  review_id INT NOT NULL AUTO_INCREMENT,
  destination_id INT NOT NULL,
  writer_id INT NOT NULL,
  rating INT NOT NULL,
  review_content TEXT NOT NULL,
  FOREIGN KEY (destination_id) REFERENCES travel_destination(destination_id)
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  FOREIGN KEY (writer_id) REFERENCES member_info(member_id)
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  PRIMARY KEY (review_id)
) ENGINE = InnoDB
  DEFAULT CHARACTER SET utf8 
  DEFAULT COLLATE utf8_general_ci;

show tables;

desc member_info;

-- 회원 정보 20명 생성
INSERT INTO member_info (name, email, age)
VALUES
  ('김건우', 'kwforu123@naver.com', '24'),
  ('홍길동', 'honggildong@example.com', '25'),
  ('김영희', 'kimyeonghee@example.com', '30'),
  ('이철수', 'leecholsu@example.com', '28'),
  ('박미영', 'parkmiyoung@example.com', '32'),
  ('정영호', 'jeongyeongho@example.com', '27'),
  ('이지은', 'leejieun@example.com', '29'),
  ('박준호', 'parkjunho@example.com', '31'),
  ('김수진', 'kimsujin@example.com', '26'),
  ('최민식', 'choiminsik@example.com', '33'),
  ('한지원', 'hanjiwon@example.com', '28'),
  ('송승헌', 'songseunghun@example.com', '29'),
  ('강소라', 'kangsora@example.com', '30'),
  ('이정재', 'leejeongjae@example.com', '32'),
  ('전도연', 'jeondoeyeon@example.com', '27'),
  ('김수현', 'kimsuhyun@example.com', '25'),
  ('한효주', 'hanhyoju@example.com', '31'),
  ('조진웅', 'jojinwoong@example.com', '29'),
  ('한가인', 'hangain@example.com', '26'),
  ('유해진', 'yuhaejin@example.com', '28'),
  ('문채원', 'moonchaewon@example.com', '30'),
  ('김래원', 'kimraewon@example.com', '27'),
  ('한예슬', 'hanyeseul@example.com', '31'),
  ('주지훈', 'jujihun@example.com', '32'),
  ('박보영', 'parkboyoung@example.com', '29');
select * from member_info;

INSERT INTO travel_destination (name, country, region, description, image)
VALUES 
("괌", "미국", "서태평양", "괌은 미국의 대표적인 해외 자치영토로서, 다양한 해양 스포츠와 관광 명소를 보유하고 있습니다.", "img/guam.jpg"),
("파리", "프랑스", "유럽", "파리는 모든 사람들이 꿈꾸는 로맨틱한 도시입니다. 에펠탑, 루브르 박물관, 성당 등 대표적인 명소가 많이 있습니다.", "img/paris.jpg"),
("하와이", "미국", "태평양", "하와이는 아름다운 해변과 섬사이에서 다양한 해양 스포츠를 즐길 수 있는 천국입니다.", "img/hawaii.jpg"),
("도쿄", "일본", "아시아", "도쿄는 일본의 대표적인 도시로, 전통과 현대성이 조화롭게 어우러져 있습니다.", "img/tokyo.jpg"),
("방콕", "태국", "아시아", "방콕은 풍부한 문화와 유적, 그리고 다양한 맛집으로 유명한 아시아의 관광도시입니다.", "img/bangkok.jpg"),
("로마", "이탈리아", "유럽", "로마는 세계적으로 유명한 문화 유산과 역사적인 건축물이 많은 도시입니다.", "img/rome.jpg"),
("상하이", "중국", "아시아", "상하이는 현대성과 전통이 공존하는 도시로, 유명한 하늘길 등 대표적인 명소가 많습니다.", "img/shanghai.jpg"),
("뉴욕", "미국", "북미", "뉴욕은 전 세계에서 가장 대표적인 도시 중 하나로, 역사와 문화, 건축 등 모든 면에서 풍부한 자원을 보유하고 있습니다.", "img/newyork.jpg"),
("캔버스", "캐나다", "북아메리카", "캔버스는 자연과 도시의 조화가 매력적인 도시입니다. 캐나다의 대표적인 도시 중 하나입니다.", "img/canada.jpg"),
('제주도', '한국', '아시아', '아름다운 자연 풍광과 맛있는 음식, 멋진 관광지가 많은 섬입니다.', 'https://example.com/jeju.jpg'),
('코타키나발루', '말레이시아', '아시아', '저렴한 가격과 다양한 자연경관, 문화를 느낄 수 있는 도시입니다.', 'https://example.com/kotakinabalu.jpg'),
('타이페이', '대만', '아시아', '모던하고 오래된 문화가 공존하는 대만의 수도입니다.', 'https://example.com/taipei.jpg'),
('시드니', '호주', '오세아니아', '국제적인 도시에서의 해변 생활과 볼거리가 많은 도시입니다.', 'https://example.com/sydney.jpg'),
('런던', '영국', '유럽', '영국의 대표적인 도시 중 하나로, 역사와 문화가 곳곳에 존재합니다.', 'https://example.com/london.jpg');

INSERT INTO review 
(destination_id, writer_id, rating, review_content) VALUES 
(1, 1, 5, "좋은 여행이었어요!"),
(2, 2, 4, "너무 좋았습니다. 추천합니다."),
(3, 3, 3, "강추합니다!"),
(4, 4, 4, "제 생애 최고의 여행이었습니다."),
(5, 5, 5, "다시 오고 싶어요!"),
(6, 1, 4, "굉장히 기억에 남는 여행이었습니다."),
(7, 2, 3, "한번쯤 가볼만한 곳입니다."),
(8, 3, 4, "아주 만족스러웠습니다!"),
(9, 4, 5, "여기 정말 좋아요!"),
(10, 5, 4, "다음에 또 방문하고 싶은 곳입니다."),
(11, 1, 3, "여행하기 아주 좋은 곳입니다."),
(12, 2, 4, "추천합니다!"),
(13, 3, 5, "여기 정말 최고에요!"),
(14, 4, 4, "또 가고 싶은 곳입니다."),
(1, 5, 3, "정말 굉장한 경험이었습니다."),
(2, 1, 5, "여기 정말 좋아요!"),
(3, 2, 5, "아주 만족스러웠습니다."),
(4, 3, 4, "여기 정말 최고의 숙박이었습니다."),
(5, 4, 4, "여행하기 아주 좋은 곳입니다."),
(6, 5, 3, "추천합니다!"),
(7, 6, 2, "별로였어요. 추천하지 않습니다."), -- Not good, I do not recommend it.
(8, 7, 1, "형편없는 장소였습니다. 추천하지 않아요."), -- Terrible place, I do not recommend it.
(9, 8, 3, "보통 수준의 여행지입니다. 특별한 점은 없어요."), -- Average destination, nothing special.
(10, 9, 4, "좋은 장소입니다. 방문할 만해요."), -- Nice place, worth visiting.
(11, 10, 5, "정말 놀라운 곳이었어요. 기대 이상이었습니다."), -- Absolutely amazing, exceeded my expectations.
(12, 11, 2, "기대에 못 미친 곳이었습니다. 실망했어요."), -- Disappointing, didn't meet expectations.
(13, 12, 3, "괜찮은 장소인데 더 발전할 수 있을 것 같아요."), -- Decent location, could be better.
(14, 13, 4, "즐거운 시간을 보냈고, 추천해요."), -- Enjoyed my time there, would recommend.
(1, 14, 5, "가장 좋았던 여행지 중 하나에요."), -- One of the best destinations I've been to.
(2, 15, 3, "괜찮았지만 특별한 점은 없었어요."), -- It was alright, nothing extraordinary.
(3, 16, 4, "즐거운 시간을 보냈고, 다시 방문하고 싶어요."), -- Had a great time, would visit again.
(4, 17, 2, "별로인 곳이었고, 추천하지 않아요."), -- Not impressed, wouldn't recommend.
(5, 18, 1, "끔찍한 경험이었어요, 멀리 떨어져 있어야 해요!"), -- Awful experience, stay away!
(6, 19, 3, "평범한 곳이었고, 특별한 점은 없었어요."), -- Fairly average, nothing remarkable.
(7, 20, 4, "머무는 동안 정말 즐거웠고, 아름다운 곳이에요."), -- Really enjoyed my stay, beautiful location.
(8, 21, 5, "매우 추천합니다, 숨막히는 경치입니다."), -- Highly recommended, breathtaking views.
(10, 23, 3, "별로였고, 더 발전되어야 합니다."), -- Below expectations, needs improvement.
(11, 24, 4, "아름다운 목적지로, 멋진 시간을 보냈습니다."), -- Lovely destination, had a wonderful time.
(12, 25, 5, "정말 환상적이었고, 기대를 모두 뛰어넘었습니다."), -- Absolutely fantastic, exceeded all expectations.
(13, 1, 2, "추천하지 않습니다, 나쁜 경험이었습니다."), -- Not recommended, had a bad experience.
(14, 2, 1, "최악 중의 최악이었습니다. 절대 가지 마세요!"), -- One of the worst places ever, never go there!
(1, 3, 3, "별로였지만, 쓸만한 곳이었습니다."), -- It was okay, but nothing special.
(2, 4, 4, "좋은 여행지였고, 다시 방문하고 싶습니다."), -- It was a good destination, and I would like to visit again.
(3, 5, 5, "정말 좋았습니다, 최고의 경험이었습니다."), -- It was really good, the best experience.
(4, 6, 4, "최고의 숙박 경험이었고, 다시 가고 싶습니다."), -- It was the best stay I've ever had, and I want to go again.
(5, 7, 4, "여행하기에 좋은 장소입니다."), -- It's a great place to travel.
(6, 8, 3, "추천합니다!"), -- Recommended!
(7, 9, 5, "정말 멋진 곳이었고, 다시 가고 싶습니다."), -- It was a great place and I want to go again.
(8, 10, 4, "아주 좋았습니다!"), -- It was very good!
(9, 11, 5, "여기를 사랑해요!"), -- I love this place!
(10, 12, 4, "다시 방문하고 싶은 곳입니다."), -- This is where I want to visit again.
(11, 13, 3, "여행하기에 좋은 장소입니다."), -- It's a great place to travel.
(12, 14, 4, "다시 가고 싶은 곳입니다."), -- This is where I want to go again.
(13, 15, 5, "정말 멋져요!"), -- This is awesome!
(14, 16, 4, "다시 가고 싶은 곳입니다."), -- This is where I want to go again.
(1, 17, 3, "정말 멋진 경험이었습니다."), -- It was an amazing experience.
(2, 18, 5, "이 곳을 사랑합니다!"); -- I love this place!


# select * from travel_destination;

# SELECT r.review_id, r.destination_id,t.name, m.name AS writer_name, r.rating, r.review_content
# FROM review r
# JOIN member_info m ON r.writer_id = m.member_id
# JOIN travel_destination t ON r.destination_id = t.destination_id;


# SELECT 
#   travel_destination.*,
#   AVG(review.rating) AS average_rating
# FROM 
#   travel_destination
# LEFT JOIN 
#   review ON travel_destination.destination_id = review.destination_id
# GROUP BY 
#   travel_destination.destination_id;

# select * from review;
