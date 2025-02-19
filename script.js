const questions = [
    {
        question: "Which planet in the solar system has the shortest day?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: false },
            { text: "Jupiter", correct: true },
            { text: "Venus", correct: false }]
    },
    {
        question: "Why do we see lightning before we hear thunder?",
        answers: [
            { text: "Thunder comes from a different source", correct: false },
            { text: "The atmosphere blocks the sound", correct: false },
            { text: "Our ears react slower than our eyes", correct: false },
            { text: "Light travels faster than sound", correct: true }]
    },
    {
        question: "Which of these is the reason why ice floats on water?",
        answers: [
            { text: "Ice is lighter than air", correct: false },
            { text: "Water expands when it freezes", correct: true },
            { text: "The Earth’s gravity is weaker on ice", correct: false },
            { text: "Water becomes denser when cold", correct: false }]
    },
    {
        question: "Why do we put salt on icy roads in winter?",
        answers: [
            { text: "It prevents ice from forming by lowering the freezing point", correct: true },
            { text: "It makes the ice melt by raising the temperature", correct: false },
            { text: "t absorbs moisture from the ice", correct: false },
            { text: "It makes the ice softer so cars can crush it", correct: false }]
    },
    {
        question: "Why do airplanes fly at high altitudes?",
        answers: [
            { text: "The air is less dense, reducing drag", correct: true },
            { text: "To avoid birds", correct: false },
            { text: "It saves fuel because of stronger winds", correct: false },
            { text: "To give passengers a better view", correct: false }]
    }
];

const question_tag = document.getElementById('question_tag');
const choice_btns = document.getElementById('choice_btns');
const next_btn = document.getElementById('next_btn');

let currentQuestionindex = 0;
let score = 0;

function Startquiz() {
    currentQuestionindex = 0;
    score = 0;
    next_btn.innerHTML = "Next";
    Showquestions();
}


function Showquestions() {
    resetState();
    let currentQuestion = questions[currentQuestionindex];
    let QuestionNo = currentQuestionindex + 1;
    question_tag.innerHTML = QuestionNo + ". " + currentQuestion.question;


    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('opt_btns');
        choice_btns.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener('click', selectAnswer);


    });
}

function resetState() {
    next_btn.style.display = "none";
    while (choice_btns.firstChild) {
        choice_btns.removeChild(choice_btns.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
    }
    Array.from(choice_btns.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add('correct');
        }
        button.disabled = "true";
    });
    next_btn.style.display = "block";

}

function handlenextBtn() {
    currentQuestionindex++;
    if (currentQuestionindex < questions.length) {
        Showquestions();
    } else {
        Showscore();
    }
}
function Showscore() {
    resetState();
    question_tag.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    next_btn.innerHTML = "play Again";
    next_btn.style.fontSize = "17px"
    next_btn.style.display = "block";

}

next_btn.addEventListener('click', () => {
    if (currentQuestionindex < questions.length) {
        handlenextBtn();
    } else {
        Startquiz();
    }
})


Startquiz();



