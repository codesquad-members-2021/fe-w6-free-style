const express = require("express");
const apiRouter = express.Router();

const question = ["1. 나는 여러 친구들과 많이 사귀는 편이다", "2. 나는 몇 명의 친구와 깊이 사귀는 편이다."];

const responseBody = (question) => {
  return {
    version: "2.0",
    template: {
      outputs: [
        {
          simpleText: {
            text: `${question[0]}\n${question[1]}`,
          },
        },
      ],
      quickReplies: [
        {
          messageText: "1번",
          action: "block",
          blockId: "604df51fb908ae1e731f0141",
          label: "question1_1",
        },
        {
          messageText: "2번",
          action: "block",
          blockId: "604df546048a962ecd896158",
          label: "question1_2",
        },
      ],
    },
  };
};

apiRouter.post("/", function (req, res) {
  console.log(req.body);
  const result = responseBody(question);
  res.status(200).json(result);
});

module.exports = apiRouter;
