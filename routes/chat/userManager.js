const { breakMsg } = require("./blocks.js");
const { TYPE } = require("./util.js");

const types = [
  { left: "E", right: "I" },
  { left: "S", right: "N" },
  { left: "T", right: "F" },
  { left: "J", right: "P" },
];

const initScore = {
  energy: { E: 0, I: 0 },
  information: { S: 0, N: 0 },
  decision: { T: 0, F: 0 },
  lifestyle: { J: 0, P: 0 },
  result: [],
  index: 0,
  totalQuestionIndex: 0,
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
  if (currVal[`${questionNumber}`][types[0]] > currVal[`${questionNumber}`][types[1]]) {
    result = breakMsg[types[0]];
  } else {
    result = breakMsg[types[1]];
  }
  return result;
};

const updateResult = (map, key, questionNumber, types) => {
  const currVal = map.get(key);
  if (currVal[`${questionNumber}`][types[0]] > currVal[`${questionNumber}`][types[1]]) {
    currVal.result.push(types[0]);
  } else {
    currVal.result.push(types[1]);
  }
  map.set(key, currVal);
  return map;
};

const registerNewUser = (map, key) => {
  const newInitValue = JSON.parse(JSON.stringify(initScore));
  map.set(key, newInitValue);
  return map;
};

const deleteUser = (map, key) => {
  map.delete(key);
  return map;
};

module.exports = { deleteUser, updateResult, types, initScore, addScore, getSelectedMsg, registerNewUser };
