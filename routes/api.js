const express = require("express");
const apiRouter = express.Router();
const { types, initScore, addScore, getSelectedMsg, registerNewUser, createResponseBody } = require("./functions/addScore.js");
const { answer, questions, answers, breakMsg, breakBlockIds, blockIds } = require("./functions/qna.js");
let users = new Map();

let totalQuestionIndex = 0;
let index = -1;

apiRouter.post("/", function (req, res) {
  console.log(req.body);
  const userRequest = req.body.userRequest;
  const userId = userRequest.user.id;
  const userAnswer = userRequest.utterance;
  if (!users.has(userId)) {
    users = registerNewUser(users, userId, initScore);
  }
  console.log(`============ answers[index] ===========`);
  console.log(userAnswer);
  console.log(users);
  if (index >= 0) {
    console.log(answers[index].one);
    console.log(userAnswer === answers[index].one);
  }
  // index++;
  if (userAnswer === answers[index].one) {
    console.log("one checked");
    console.log(types[totalQuestionIndex].one);
    users = addScore(users, userId, totalQuestionIndex, types[totalQuestionIndex].one);
  } else if (userAnswer === answers[index].two) {
    console.log("two checked");
    console.log(types[totalQuestionIndex].two);
    users = addScore(users, userId, totalQuestionIndex, types[totalQuestionIndex].two);
  }
  // 사용자 설정
  if (index && index % 8 === 0) {
    const selectedMsg = getSelectedMsg(users, userId, totalQuestionIndex, [types[totalQuestionIndex].one, types[totalQuestionIndex].two]);
    const responseBody = {
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: selectedMsg,
            },
          },
        ],
        quickReplies: [
          {
            messageText: "레츠고😎",
            action: "block",
            blockId: blockIds[index],
            label: "레츠고😎",
          },
        ],
      },
    };
    totalQuestionIndex++;
    res.status(200).json(responseBody);
    // 1 질문 끝나고 breakMsg 보내는 것 까지 실행
    // 이제 2 질문으로 넘어가는 거 해야함
    // 추후 매직넘버, 모듈 분리 신경쓰기
  } else {
    index++;
    const responseBody = createResponseBody(questions, index);
    // index++;
    res.status(200).json(responseBody);
  }
});

module.exports = apiRouter;
