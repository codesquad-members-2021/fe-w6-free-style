const express = require("express");
const apiRouter = express.Router();

const questions = ["1. 나는 여러 친구들과 많이 사귀는 편이다", "2. 나는 몇 명의 친구와 깊이 사귀는 편이다."];

const blockIds = [
  "604df51fb908ae1e731f0141", // 1_1
  "604df546048a962ecd896158", // 1_2
  "604e200917144a1360f34241", // 1_3
  "604e201048341a06c552a9a1", // 1_4
  "604e201b17144a1360f34243", // 1_5
  "604e2023495587217fcfcbce", // 1_6
  "604e202d57027e150c33fd07", // 1_7
  "604e20354c78c32f12f5fede", // 1_8
  "604e20411690bb7bf77a7d5b", // 1_9
];

let index = -1;

const createResponseBody = (questions) => {
  if (index < blockIds.length) {
    index++;
    return {
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: `${questions[index]}\n${questions[index]}`,
            },
          },
        ],
        quickReplies: [
          {
            messageText: "1번",
            action: "block",
            blockId: blockIds[index],
            label: "1번",
          },
          {
            messageText: "2번",
            action: "block",
            blockId: blockIds[index],
            label: "2번",
          },
        ],
      },
    };
  } else {
    index = 0;
    return {
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: `모두 마쳤습니다.😎`,
            },
          },
        ],
        //   quickReplies: [
        //     {
        //       messageText: "1번",
        //       action: "block",
        //       blockId: "604df51fb908ae1e731f0141",
        //       label: "1번",
        //     },
        //     {
        //       messageText: "2번",
        //       action: "block",
        //       blockId: "604df546048a962ecd896158",
        //       label: "2번",
        //     },
        //   ],
      },
    };
  }
};

apiRouter.post("/", function (req, res) {
  console.log(req.body);
  const responseBody = createResponseBody(question);
  res.status(200).json(responseBody);
});

module.exports = apiRouter;
