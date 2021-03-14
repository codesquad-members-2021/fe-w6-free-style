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

apiRouter.post("/blockId", function (req, res) {
  const userRequest = req.body.userRequest;
  const blockId = userRequest.block.id;

  return res.send({
    version: "2.0",
    template: {
      outputs: [
        {
          basicCard: {
            title: "블록ID 입니다",
            description: blockId,
          },
        },
      ],
    },
  });
});

apiRouter.post("/", function (req, res) {
  const responseBody = {
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: "토트넘 선수 리스트입니다.",
          },
        },
      ],
      quickReplies: [
        {
          messageText: "손흥민",
          action: "block",
          label: "손흥민",
        },
        {
          messageText: "헤리케인",
          action: "message",
          label: "헤리케인",
        },
        {
          messageText: "에릭센",
          action: "message",
          label: "에릭센",
        },
        {
          messageText: "요리스",
          action: "message",
          label: "요리스",
        },
      ],
    },
  };
  res.status(200).send(responseBody);
});

module.exports = app;
