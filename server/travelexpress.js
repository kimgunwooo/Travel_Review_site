import express from "express"
import mysql from "mysql"
import bp from "body-parser"
import cors from "cors"
import multer from 'multer';

import dbconf from "./conf/auth.js"

const app = express()
const port = 3010


// DB 연결 - 연결 정보는 auth.js에 저장(보안)
const db = mysql.createConnection(dbconf)
db.connect()

app.use(bp.json())
app.use(cors())
app.use(express.urlencoded({ extended: true })); // URL 인코딩된 데이터를 읽을 수 있도록 미들웨어 추가

// <- URL을 사용한 이미지 저장
// 파일 업로드를 위한 Multer 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/workspace/Travel_Review_site/client/public/images');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
const upload = multer({ storage });



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

// 여행지 추가
app.post('/destination', (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error(err);
      console.log("여기");
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    const { name, country, region, description } = req.body;
    const image = req.file ? req.file.filename : null;
    console.log(image);
    const sql = 'INSERT INTO travel_destination (name, country, region, description, image) VALUES (?, ?, ?, ?, ?)';
    const params = [name, country, region, description, image];
    
    
    db.query(sql, params, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.json({ success: true });
    });
  });
});

//멤버 추가
app.post('/member', (req, res) => {
  upload.single('image')(req, res, (err) => {
    const name = req.body.name;
    const email = req.body.email;
    const image = req.file ? req.file.filename : null;
    
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
        const member = [name, email, req.body.age, image];

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
});

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
app.get('/review', (req, res) => { 
  const sql = 'select * from review'
	db.query(sql, (err, rows) => {
		if (err) {
			res.json({result: "error"})
			return console.log(err)
		}
		res.json(rows)
	})
})

//리뷰 검색
app.get('/review/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const sql = 'select * from review where review_id=?'
	db.query(sql, [id] ,(err, rows) => {
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

// 해당 여행지의 리뷰 추가
app.post('/destination/:id/review', (req, res) => {
  const id = parseInt(req.params.id);
  const { email, rating, review_content } = req.body;

  console.log(req.body);
  console.log(email);
  // 작성자의 member_id 가져오기
  const writerQuery = 'SELECT member_id FROM member_info WHERE email = ?';
  
  db.query(writerQuery, [email], (err, writerResult) => {
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
    const reviewValues = [id, writerId, rating, review_content];
    db.query(insertReviewQuery, reviewValues, (err, result) => {
      if (err) {
        res.json({ result: 'error' });
        return console.log(err);
      }
      res.json({ result: 'success' });
    });
  });
});

//리뷰 수정
app.put('/review/:id', (req, res) => {
  const reviewId = parseInt(req.params.id);
  const { rating, reviewContent } = req.body;
  const sql = 'UPDATE review SET rating = ?, review_content = ? WHERE review_id = ?';
  const review = [
    req.body.rating,
    req.body.review_content,
    reviewId
  ]
  
  db.query(sql, review, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error updating review');
    } else {
      res.status(200).send('Review updated successfully');
    }
  });
});

//리뷰 삭제
app.delete('/review/:id', (req, res) => {
  const reviewId = parseInt(req.params.id);
  const sql = 'DELETE FROM review WHERE review_id = ?';
  db.query(sql, [reviewId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error deleting review');
    } else {
      res.status(200).send('Review deleted successfully');
    }
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