const types = [
  // { one: "E", two: "I" },
  { one: "S", two: "N" },
  { one: "T", two: "F" },
  { one: "J", two: "P" },
];

const initScore = {
  // 0: { E: 0, I: 0 },
  0: { S: 0, N: 0 },
  1: { T: 0, F: 0 },
  2: { J: 0, P: 0 },
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

const registerNewUser = (map, key, initValue) => {
  map.set(key, initValue);
  return map;
};

const createResponseBody = (questions, index) => {
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

module.exports = { types, initScore, addScore, getSelectedMsg, registerNewUser, createResponseBody };
