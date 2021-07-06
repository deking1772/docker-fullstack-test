const express = require("express");
const bodyParser = require("body-parser");

const db = require("./db");

const app = express();

// json 형태로 오는 요청의 본문을 해석해 줄수 있게 등록
app.use(bodyParser.json());

// 테이블 생성하기
db.pool.query(
  `CREATE TABLE lists (
    id INTEGER AUTO_INCREMENT,
    value TEXT,
    PRIMARY key (id)
)`,
  (err, result, fields) => {
    console.log("result", result);
  }
);

// api
app.get("/api/values", function (req, res) {
  // DB 데어터베이스에서 DB 정보 가져오기
  db.pool.query("SELECT * FROM lists;", (err, result, fields) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return req.json(result);
    }
  });
});

app.post("/api/value", function (req, res, next) {
  db.pool.query(
    `INSERT INTO lists (value) VALUES("${req.body.value}")`,
    (err, result, fields) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        return res.json({ success: true, value: req.body.value });
      }
    }
  );
});

app.listen(5000, () => {
  console.log("어플리케이션이 5000번 포트에서 실해오디었습니다.");
});
