const { answer, questions, answers, breakMsg, breakBlockIds, blockIds } = require("./qna.js");

const types = [
  { one: "E", two: "I" },
  { one: "S", two: "N" },
  { one: "T", two: "F" },
  { one: "J", two: "P" },
];

const initScore = {
  0: { E: 0, I: 0 },
  1: { S: 0, N: 0 },
  2: { T: 0, F: 0 },
  3: { J: 0, P: 0 },
  result: [],
};

const addScore = (map, key, questionNumber, type) => {
  const currVal = map.get(key);
  ++currVal[`${questionNumber}`][type];
  map.set(key, currVal);
  return map;
};

const getSelectedMsg = (map, key, questionNumber, types) => {
  const currVal = map.get(key);
  let result = null;
  if (currVal[`${questionNumber}`][types[0]]) {
    currVal.result.push(types[0]);
    result = breakMsg[types[0]];
  } else {
    currVal.result.push(types[1]);
    result = breakMsg[types[1]];
  }
  return result;
  //   return currVal[`${questionNumber}`][types[0]] > currVal[`${questionNumber}`][types[1]] ?  : breakMsg[types[1]];
};

const registerNewUser = (map, key, initValue) => {
  map.set(key, initValue);
  return map;
};
const getUserResult = (map, key) => {
  const currVal = map.get(key);
  return currVal.result;
};

const setResultMessage = (info) => {
  const { map, key } = info;
  const result = getUserResult(map, key);
  return `http://34.64.132.100:3000/result=${result.join("")}`;
};

const createResponseBody = (questions, index, info) => {
  if (index < questions.length) {
    return {
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: index < questions.length ? questions[index] : setResultMessage(info),
            },
          },
        ],
        quickReplies:
          index < questions.length
            ? [
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
              ]
            : [
                {
                  messageText: "보러가야징",
                  action: "message",
                  label: "보러가야징",
                },
              ],
      },
    };
  }
};

module.exports = { types, initScore, addScore, getSelectedMsg, registerNewUser, createResponseBody };
