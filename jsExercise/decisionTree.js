function Question(key, question, answer = null, parent = null, questions = {}) {
  this.key = key;
  this.question = question;
  this.answer = answer;
  this.parent = parent;
  this.questions = questions;
  this.ask = function () {
    let answers = "";
    for (i in questions) {
      answers = answers + this.questions[i].key + ". " + this.questions[i].answer + "     ";
    }
    const choice = prompt(this.question + '\n' + answers);
    return choice;
  }
  this.addParent = function (parentKey) {
    this.parent = parentKey
  }
  this.addChildQuestion = function (child) {
    this.questions[child.key] = child;
    child.addParent(this.key);
  }
  this.deleteChildQuestion = function (key) {
    delete this.questions[key];
    delete QUESTIONS[this.questions[key]];
  }
  this.deleteAllChild = function () {
    for (i of questions) {
      i.removeAllChildQuestion();
      this.removeChildQuestion(i.key);
    }
  }
}
const QUESTIONS = {};
const firstQuestion = new question(1, "Your age?");
const secondQuestion = new question(2, "Your shcool?", "Under 18");
const thirdQuestion = new question(3, "Your job?", "over 18");
const tempQuestion = new question(4, "Ok", "cambridge")
firstQuestion.addChildQuestion(secondQuestion);
firstQuestion.addChildQuestion(thirdQuestion);
secondQuestion.addChildQuestion(tempQuestion);
QUESTIONS[firstQuestion.key] = firstQuestion;
QUESTIONS[secondQuestion.key] = secondQuestion;
QUESTIONS[thirdQuestion.key] = thirdQuestion;
QUESTIONS[tempQuestion.key] = tempQuestion;

function addQuestion() {
  const key = Number(document.getElementById("key").value);
  const question = document.getElementById("question").value;
  const parent = Number(document.getElementById("parent").value);
  const answer = document.getElementById("answer").value;
  const newQuestion = new Question(key, question, answer, parent);
  QUESTIONS[parent].addChildQuestion(newQuestion);
  QUESTIONS[key] = newQuestion;
  console.log(QUESTIONS);
}

function deleteQuestion() {
  const key = Number(document.getElementById("key").value);
  QUESTIONS[QUESTIONS[key].parent].removeChildQuestion(key);
  QUESTIONS[key].deleteAllChild();
  delete QUESTIONS[key];
  console.log(QUESTIONS);
}

function editQuestion() {
  const key = Number(document.getElementById("key").value);
  const question = document.getElementById("question").value;
  const parent = Number(document.getElementById("parent").value);
  const answer = document.getElementById("answer").value;
  const newQuestion = new Question(key, question, answer, parent);
  if (parent !== QUESTIONS[key].parent) {
    const parentKey = QUESTIONS[key].parent;
    QUESTIONS[parentKey].removeChildQuestion(key);
  }
  QUESTIONS[QUESTIONS[key].parent].addChildQuestion(newQuestion);
  console.log(QUESTIONS);
}

function startDecisionTree() {
  let answer = firstQuestion.ask();
  let tempQuestion1 = firstQuestion;
  while (true) {
    if (answer === "exit") {
      break;
    }
    answer = Number(answer);
    tempQuestion1 = tempQuestion1.questions[answer];
    answer = tempQuestion1.ask();
  }
}