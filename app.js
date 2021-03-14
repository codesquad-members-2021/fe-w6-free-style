const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const apiRouter = express.Router();

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.use("/api", apiRouter);

apiRouter.post("/", function (req, res) {
  const responseBody = {
    version: "2.0",
    template: {
      outputs: [
        {
          quickReplies: {
            // 여기까지 고침
            label: "응",
            action: "block",
            messageText: "다음 블록으로 이동하시겠습니까?",
            blockId: 1,
            // text: "간단한 텍스트 요소입니다.",
          },
        },
      ],
    },
  };
  res.status(200).send(responseBody);
});

module.exports = app;
