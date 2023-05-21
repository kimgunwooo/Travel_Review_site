import express from "express"
import mysql from "mysql"
import bp from "body-parser"
import cors from "cors"

import dbconf from "./conf/auth.js"

const app = express()
const port = 3010

// DB 연결
const db = mysql.createConnection(dbconf)
db.connect()

app.use(bp.json())
app.use(cors())
app.use(express.urlencoded({ extended: true })); // URL 인코딩된 데이터를 읽을 수 있도록 미들웨어 추가

//서버 연결 확인
app.get('/', (req, res) => {
  res.json({result: "success"})
})

//모든 여행지 목록 + 평균 평점
app.get('/destination', (req, res) => { 
  const sql = '\
  SELECT travel_destination.*,AVG(review.rating) AS average_rating\
    FROM travel_destination\
    LEFT JOIN review ON travel_destination.destination_id = review.destination_id\
    GROUP BY travel_destination.destination_id;'
	db.query(sql, (err, rows) => {
		if (err) {
			res.json({result: "error"})
			return console.log(err)
		}
		res.json(rows)
	})
})



//여행지 검색
app.get('/destination/:id',(req,res)=>{
  const id = parseInt(req.params.id)
  const query = 'select * from travel_destination where destination_id = ?'
	db.query(query, [id], (err, rows) => {
		if (err) {
			res.json({result: "error"})
			return console.log(err)
		}
		res.json(rows)
	})
})

//여행지 추가
app.post('/destination', (req, res) => {
	const sql = 'insert into travel_destination (name, country, region, description, image) values (?)'
	const destination = [
		req.body.name,
		req.body.country,
		req.body.region,
		req.body.description,
    req.body.image
	]

  db.query(sql, [ destination ], (err, rows) => {
		if (err) {
			res.json({result: "error"})
			return console.log(err)
		}
		res.json({result: "success"})
	})
})

//여행지 수정
app.put('/destination/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const sql = 'update travel_destination set name=?, country=?, region=?, description=?, image=? where destination_id=?'
  const destination = [
    req.body.name,
    req.body.country,
    req.body.region,
    req.body.description,
    req.body.image,
    id
  ]

  db.query(sql, destination, (err, rows) => {
    if (err) {
      res.json({result: "error"})
      return console.log(err)
    }
    res.json({result: "success"})
  })
})

// 여행지 삭제
app.delete('/destination/:id', (req, res) => {
  const destinationId = parseInt(req.params.id)
  const sql = 'delete from travel_destination where destination_id=?'
  db.query(sql, [destinationId], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send('Error deleting destination')
    } else {
      res.status(200).send('Destination deleted successfully')
    }
  })
})

//모든 리뷰 목록
  app.get('/destination/review', (req, res) => { 
  const sql = 'select * from review'
	db.query(sql, (err, rows) => {
		if (err) {
			res.json({result: "error"})
			return console.log(err)
		}
		res.json(rows)
	})
})

//해당 여행지의 리뷰 목록
app.get('/destination/:id/review',(req,res)=>{
  const id = parseInt(req.params.id)
  const query = 'SELECT r.review_id, r.destination_id, m.name AS writer_name, r.rating, r.review_content\
    FROM review r\
    JOIN member_info m ON r.writer_id = m.member_id\
    WHERE destination_id = ?;'
	db.query(query, [id], (err, rows) => {
		if (err) {
			res.json({result: "error"})
			return console.log(err)
		}
		res.json(rows)
	})
})

//해당 여행지의 리뷰 추가
app.post('/destination/:id/review', (req, res) => {
  const id = parseInt(req.params.id)
  const { writer, rating, body } = req.body;
  
  console.log(req.body);
  
  // 작성자의 member_id 가져오기
  const writerQuery = 'SELECT member_id FROM member_info WHERE name = ?';
  db.query(writerQuery, [writer], (err, writerResult) => {
    if (err) {
      res.json({ result: 'error' });
      return console.log(err);
    }

    if (writerResult.length === 0) {
      res.json({ result: 'error', message: '작성자를 찾을 수 없습니다.' });
      return;
    }

    const writerId = writerResult[0].member_id;

    // 리뷰 테이블에 새로운 레코드 추가
    const insertReviewQuery =
      'INSERT INTO review (destination_id, writer_id, rating, review_content) VALUES (?, ?, ?, ?)';
    const reviewValues = [id, writerId, rating, body];
    db.query(insertReviewQuery, reviewValues, (err, result) => {
      if (err) {
        res.json({ result: 'error' });
        return console.log(err);
      }
      res.json({ result: 'success' });
    });
  });
});

//멤버 찾기
app.get('/member/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM member_info WHERE member_id = ?';

  db.query(sql, [id], (err, rows) => {
    if (err) {
      res.json({ result: 'error' });
      return console.log(err);
    }
    res.json(rows);
  });
});

//모든 멤버 찾기
app.get('/member', (req, res) => {
  const sql = 'select * from member_info'
	db.query(sql, (err, rows) => {
		if (err) {
			res.json({result: "error"})
			return console.log(err)
		}
		res.json(rows)
	})
})

//멤버 추가
app.post('/member', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  
  //이름 존재 여부, 중복 체크
  const checkNameQuery = 'SELECT * FROM member_info WHERE name = ?';
  db.query(checkNameQuery, [name], (err, nameRows) => {
    if (err) {
      console.error(err);
      return res.json({ result: 'error' });
    }

    if (nameRows.length > 0) {
      return res.json({ result: 'error', message: 'Member name already exists' });
    }
    
    //이메일 존재 여부, 중복 체크
    const checkEmailQuery = 'SELECT * FROM member_info WHERE email = ?';
    db.query(checkEmailQuery, [email], (err, emailRows) => {
      if (err) {
        console.error(err);
        return res.json({ result: 'error' });
      }

      if (emailRows.length > 0) {
        return res.json({ result: 'error', message: 'Email already exists' });
      }

      const insertQuery = 'INSERT INTO member_info (name, email, age, profile_image) VALUES (?, ?, ?, ?)';
      const member = [name, email, req.body.age, req.body.profile_image];

      db.query(insertQuery, member, (err, rows) => {
        if (err) {
          console.error(err);
          return res.json({ result: 'error' });
        }

        res.json({ result: 'success' });
      });
    });
  });
});

//멤버 수정
app.put('/member/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const sql = 'UPDATE member_info SET name=?, email=?, age=?, profile_image=? WHERE member_id=?';
  const member = [
    req.body.name,
    req.body.email,
    req.body.age,
    req.body.profile_image,
    id
  ];

  db.query(sql, member, (err, rows) => {
    if (err) {
      res.json({ result: "error" });
      return console.log(err);
    }
    res.json({ result: "success" });
  });
});

//멤버 삭제
app.delete('/member/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const sql = 'DELETE FROM member_info WHERE member_id = ?';

  db.query(sql, [id], (err, rows) => {
    if (err) {
      res.json({ result: 'error' });
      return console.log(err);
    }
    res.json({ result: 'success' });
  });
});

app.listen(port, () => {
  console.log(`서버 실행됨 (port ${port})`)
})