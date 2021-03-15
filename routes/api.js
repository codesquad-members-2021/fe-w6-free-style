const express = require("express");
const apiRouter = express.Router();
const { types, initScore, addScore, getSelectedMsg, registerNewUser, createResponseBody } = require("./functions/addScore.js");
const { answer, questions, answers, breakMsg, breakBlockIds, blockIds } = require("./functions/qna.js");
let users = new Map();

let totalQuestionIndex = 0;
let index = 0;

const startUtterances = ["시작", "레츠고😎", "고고~", "예스! 킵고잉!", "궁금해! 두구두구.."];

apiRouter.post("/", function (req, res) {
  // console.log(req.body);
  console.log(`index: ${index}`);
  const userRequest = req.body.userRequest;
  const userId = userRequest.user.id;
  const userAnswer = userRequest.utterance;
  if (startUtterances.some((e) => e === userAnswer)) {
    // when the answer is the beginning || end signal
    const responseBody = createResponseBody(questions, index);
    res.status(200).json(responseBody);
  } else {
    // when the answer is the answer of the question
    if (!users.has(userId)) {
      // save the user's id
      users = registerNewUser(users, userId, initScore);
    }

    // console.log ... for debugging on the ssh google terminal
    console.log(`============ answers[index] ===========`);
    console.log(userAnswer);
    if (index >= 0) {
      console.log(answers[index].one);
      console.log(userAnswer === answers[index].one);
    }
    // console.log ... end

    if (userAnswer === answers[index].one) {
      users = addScore(users, userId, totalQuestionIndex, types[totalQuestionIndex].one);
    } else if (userAnswer === answers[index].two) {
      users = addScore(users, userId, totalQuestionIndex, types[totalQuestionIndex].two);
    } else {
      // if the user type other letters ... for exceptional situation
    }

    // when all the question of this part was done
    if (index && index % 9 === 8) {
      const selectedMsg = getSelectedMsg(users, userId, totalQuestionIndex, [types[totalQuestionIndex].one, types[totalQuestionIndex].two]);
      totalQuestionIndex++;
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
              messageText: startUtterances[totalQuestionIndex],
              action: "block",
              blockId: blockIds[++index],
              label: startUtterances[totalQuestionIndex],
            },
          ],
        },
      };
      res.status(200).json(responseBody);
    } else {
      index++;
      const responseBody = createResponseBody(questions, index);
      res.status(200).json(responseBody);
    }
  }
});

module.exports = apiRouter;
