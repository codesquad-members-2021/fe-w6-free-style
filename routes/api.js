const express = require("express");
const apiRouter = express.Router();

let users = new Map();
const initScore = {
  1: { E: 0, I: 0 },
  2: { S: 0, N: 0 },
  3: { T: 0, F: 0 },
  4: { J: 0, P: 0 },
};

const answer = {
  one: "1번",
  two: "2번",
};

const questions = [
  `1. 나는 여러 친구들과 많이 사귀는 편이다\n2. 나는 몇 명의 친구와 깊이 사귀는 편이다.`,
  `1. 계발활동을 갈 때 새로운 친구들을 만나는 것이 신난다\n2.새로운 계발활동 부서에 갈 때 처음 보는 친구들과 앞으로 어떻게 지낼까 걱정이다.`,
  `1. 처음 보는 친구들을 만나면 내가 먼저 말한다.\n2. 처음 보는 친구들을 만나면 다른 친구가 나에게 먼저 말한다.`,
  `1. 나의 생각이나 느낌을 다른 사람에게 이야기하는 편이다.\n2. 나의 생각이나 느낌을 내 마음 속에 간직하는 편이다.`,
  `1. 나는 친구들과 함께 하는 놀이가 좋다.\n2. 나는 나 혼자 재미있게 하는 놀이가 좋다.`,
  `1. 나는 많은 친구들에게 이야기하길 좋아한다.\n2. 나는 친한 친구들에게 이야기하기를 좋아한다.`,
  `1. 친구들과 함께 공부하면 잘된다.\n2. 나 혼자 공부하면 더 잘 된다.`,
  `1. 나는 나의 생각과 느낌을 말로 표현하는 것이 편하다.\n2. 나는 나의 생각과 느낌을 글로 표현하는 것이 편하다.`,
  `1. 주위 사람들은 내가 활발하다고 말한다.\n2. 주위 사람들은 내가 얌전하다고 말한다.`,
  // 9번까지 첫번째 유형 질문
  // 중간에 쉬어가는 말 넣기?
];

const breakMsg = {
  E: "오호, 외향적인 듯한 느낌이 나는군요! 계속해서 가보실까요?",
  I: "오호, 내향적인 듯한 느낌이 나는군요! 계속해서 가보실까요?",
};

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
  "604e306157027e150c33fd1e", // 1_마무리
];

let totalQuestionIndex = 1;
let index = -1;

const createResponseBody = (questions, selectedMsg) => {
  index++;
  if (index < questions.length) {
    return {
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: questions[index],
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
    // index = 0;
    return {
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
  }
};

const registerNewUser = (map, key, initValue) => {
  map.set(key, initValue);
  return map;
};

const addScore = (map, key, questionNumber, type) => {
  const currVal = map.get(key);
  currVal[`${questionNumber}`][type]++;
  map.set(key, currVal);
  return map;
};

const getSelectedMsg = (map, key, questionNumber, types) => {
  const currVal = map.get(key);
  return currVal[`${questionNumber}`][types[0]] > currVal[`${questionNumber}`][types[1]] ? breakMsg[types[0]] : breakMsg[types[1]];
};

apiRouter.post("/", function (req, res) {
  const userRequest = req.body.userRequest;
  const userId = userRequest.user.id;
  const userAnswer = userRequest.utterance;
  if (!users.has(userId)) {
    users = registerNewUser(users, userId, initScore);
  }
  if (userAnswer === answer.one) {
    users = addScore(users, userId, totalQuestionIndex, "E");
  } else if (userAnswer === answer.two) {
    users = addScore(users, userId, totalQuestionIndex, "I");
  }
  console.log(userAnswer);
  console.log(users);
  // 사용자 설정
  console.log(`index: ${index}`);
  if (index && !index % 8) {
    const selectedMsg = getSelectedMsg(users, userId, totalQuestionIndex, ["E", "I"]);
    totalQuestionIndex++;
    const responseBody = createResponseBody(questions, selectedMsg);
    res.status(200).json(responseBody);
  } else {
    const responseBody = createResponseBody(questions);
    res.status(200).json(responseBody);
  }
});

module.exports = apiRouter;
