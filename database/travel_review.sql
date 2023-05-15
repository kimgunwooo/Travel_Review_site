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
  member_password VARCHAR(45) NOT NULL,
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

-- 댓글 테이블 생성
CREATE TABLE review_comment (
  comment_id INT NOT NULL AUTO_INCREMENT,
  review_id INT NOT NULL,
  writer_id INT NOT NULL,
  comment_content TEXT NOT NULL,
  FOREIGN KEY (review_id) REFERENCES review(review_id)
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  FOREIGN KEY (writer_id) REFERENCES member_info(member_id)
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  PRIMARY KEY (comment_id)
) ENGINE = InnoDB
  DEFAULT CHARACTER SET utf8 
  DEFAULT COLLATE utf8_general_ci;

show tables;

desc member_info;

-- 회원 정보 20명 생성
INSERT INTO member_info (name, email, member_password) VALUES 
("김건우", "kwforu123@naver.com", "****"),
("박지성", "jspark@naver.com", "****"),
("홍길동", "honggd@naver.com", "****"),
("이순신", "yisu@naver.com", "****"),
("장영실", "ysjang@naver.com", "****"),
("이황", "ih@naver.com", "****"),
("서태지", "taiji@naver.com", "****"),
("김태균", "taegeun@naver.com", "****"),
("이용규", "yonggyu@naver.com", "****"),
("강호동", "hodong@naver.com", "****"),
("유재석", "jaeseok@naver.com", "****"),
("박명수", "myeongsu@naver.com", "****"),
("정준하", "junha@naver.com", "****"),
("노홍철", "hongcheol@naver.com", "****"),
("김국진", "gukjin@naver.com", "****"),
("양세형", "sehyeong@naver.com", "****"),
("이광수", "kwangs@naver.com", "****"),
("유인나", "inna@naver.com", "****"),
("김신영", "shinyoung@naver.com", "****"),
("김희철", "heechul@naver.com", "****");
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
(6, 5, 3, "추천합니다!");

insert into review_comment values (null, 1, 1, "여기 추천합니다!!");

select * from travel_destination;

SELECT r.review_id, r.destination_id,t.name, m.name AS writer_name, r.rating, r.review_content
FROM review r
JOIN member_info m ON r.writer_id = m.member_id
JOIN travel_destination t ON r.destination_id = t.destination_id;


SELECT r.review_id, r.destination_id,t.name, m.name AS writer_name, r.rating, r.review_content
FROM review r
JOIN member_info m ON r.writer_id = m.member_id
JOIN travel_destination t ON r.destination_id = t.destination_id
WHERE r.destination_id = 1;


