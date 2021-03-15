const express = require("express");
const apiRouter = express.Router();

let users = new Map();
const initScore = {
  0: { E: 0, I: 0 },
  1: { S: 0, N: 0 },
  2: { T: 0, F: 0 },
  3: { J: 0, P: 0 },
};

const answer = {
  one: "1번",
  two: "2번",
};

const questions = [
  // `1. 나는 여러 친구들과 많이 사귀는 편이다\n2. 나는 몇 명의 친구와 깊이 사귀는 편이다.`,
  // `1. 계발활동을 갈 때 새로운 친구들을 만나는 것이 신난다\n2.계발활동을 갈 때 처음 보는 친구들과 앞으로 어떻게 지낼까 걱정이다.`,
  // `1. 처음 보는 친구들을 만나면 내가 먼저 말한다.\n2. 처음 보는 친구들을 만나면 다른 친구가 나에게 먼저 말한다.`,
  // `1. 나의 생각이나 느낌을 다른 사람에게 이야기하는 편이다.\n2. 나의 생각이나 느낌을 내 마음 속에 간직하는 편이다.`,
  // `1. 나는 친구들과 함께 하는 놀이가 좋다.\n2. 나는 나 혼자 재미있게 하는 놀이가 좋다.`,
  // `1. 나는 많은 친구들에게 이야기하길 좋아한다.\n2. 나는 친한 친구들에게 이야기하길 좋아한다.`,
  // `1. 친구들과 함께 공부하면 더 잘된다.\n2. 나 혼자 공부하면 더 잘 된다.`,
  // `1. 나는 나의 생각과 느낌을 말로 표현하는 것이 편하다.\n2. 나는 나의 생각과 느낌을 글로 표현하는 것이 편하다.`,
  // `1. 주위 사람들은 내가 활발하다고 말한다.\n2. 주위 사람들은 내가 얌전하다고 말한다.`,
  // 9번까지 첫번째 유형 질문
  // 중간에 쉬어가는 말 넣기?
  `나는 친구들에게 ( )에 대해 얘기하는 것을 좋아한다.`,
  `나는 ( )을/를 좋아한다.`,
  `어려운 일에 부딪히면 ( ).`,
  `나는 무엇을 할 때 ( ).`,
  `나는 ( )를 좋아한다.`,
  `나는 ( )이 중요하다고 생각한다.`,
  `나는 ( )대로 하는 편이다.`,
  `나는 ( ).`,
  `나는 ( )는 얘기를 많이 듣는 편이다.`,
];

const answers = [
  // 2번째 유형부터
  { one: "내가 직접 보고 들은 것", two: "내가 상상한 것" },
  { one: "실제로 있었던 사람이나 사실에 대한 책", two: "상상으로 지어낸 이야기" },
  { one: "하던 일을 잘 못한다.", two: "도전하고 싶은 마음이 생긴다." },
  { one: "배웠던 대로 하는 것이 편하다.", two: "새로운 방법을 생각해서 해볼 때 더 재미있다." },
  { one: "그려진 그림에 색칠하기", two: "이야기 지어내기" },
  { one: "현재에 최선을 다하는 것", two: "미래에 대한 꿈을 갖는 것" },
  { one: "선생님이 가르쳐주신 방법", two: "나 스스로 만든 나만의 방법" },
  { one: "좋아하는 책은 읽은 것이라도 또 읽는다.", two: "새로운 다른 책을 읽는 것이 좋다." },
  { one: "부지런하고 성실하다", two: "기발하고 엉뚱하다" },
];

const breakMsg = {
  E: "오호, 외향적인 듯한 느낌이 나는군요! 계속해서 가보실까요?",
  I: "오호, 내향적인 듯한 느낌이 나는군요! 계속해서 가보실까요?",
  S: "이상적이기보다는 현실주의자에 가까운 것 같은데요? 계속해서 가보실까요?",
  N: "현실적이기보다는 이상주의자에 가까운 것 같은데요? 계속해서 가보실까요?",
};

const types = [
  // { one: "E", two: "I" },
  { one: "S", two: "N" },
  { one: "T", two: "F" },
  { one: "J", two: "P" },
];

const blockIds = [
  // "604df51fb908ae1e731f0141", // 1_1
  // "604df546048a962ecd896158", // 1_2
  // "604e200917144a1360f34241", // 1_3
  // "604e201048341a06c552a9a1", // 1_4
  // "604e201b17144a1360f34243", // 1_5
  // "604e2023495587217fcfcbce", // 1_6
  // "604e202d57027e150c33fd07", // 1_7
  // "604e20354c78c32f12f5fede", // 1_8
  // "604e20411690bb7bf77a7d5b", // 1_9
  "604eee761690bb7bf77a80f8", // 2_1
  "604eee7e48341a06c552ad6f", // 2_2
  "604eee86a8cb07012a49c631", // 2_3
  "604eee90b908ae1e731f04f4", // 2_4
  "604eee98b0303517b58bd32f", // 2_5
  "604eeea0048a962ecd8964b9", // 2_6
  "604eeea8495587217fcfcf5c", // 2_7
  "604eeeb0a8cb07012a49c63a", // 2_8
  "604eeeb71690bb7bf77a8101", // 2_9
];

const breakBlockIds = [
  "604e306157027e150c33fd1e", // 1_마무리
];

let totalQuestionIndex = 0;
let index = -1;

const createResponseBody = (questions) => {
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
            messageText: answers[index].one,
            action: "block",
            blockId: blockIds[index],
            label: answers[index].one,
          },
          {
            messageText: answers[index].two,
            action: "block",
            blockId: blockIds[index],
            label: answers[index].two,
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
  console.log(req.body);
  const userRequest = req.body.userRequest;
  const userId = userRequest.user.id;
  const userAnswer = userRequest.utterance;
  if (!users.has(userId)) {
    users = registerNewUser(users, userId, initScore);
  }
  console.log(`============ answers[index] ===========`);
  console.log(index);
  console.log(answers);
  console.log(answers[index]);
  console.log(userAnswer);
  if (userAnswer === answers[index].one) {
    users = addScore(users, userId, totalQuestionIndex, types[totalQuestionIndex].one);
  } else if (userAnswer === answers[index].two) {
    users = addScore(users, userId, totalQuestionIndex, types[totalQuestionIndex].two);
  }
  console.log(userAnswer);
  console.log(users);
  // 사용자 설정
  console.log(`index: ${index}`);
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
    const responseBody = createResponseBody(questions);
    res.status(200).json(responseBody);
  }
});

module.exports = apiRouter;
