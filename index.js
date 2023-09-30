function Question(text, choices, answer){
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

let questions = [
    new Question("Which of these contain large quantities of ice?", ["stars", "comets", "asteroids", "None of the above"], "comets"),
    new Question("Which of the following is not a scientific optical instrument?", ["periscope", "microscope", "telescope", "endoscope"], "periscope"),
    new Question("What astronomer suggested that the Sun was at the center of the solar system?", ["Ptolemy", "Theon of Alexandria", "Copernicus", "Hypatia"], "Copernicus"),
    new Question("Which of the following is the India's first lunar probe launched by the Indian Space Research Organisation?", ["Chandrayaan Program", "Mangalyaan Program", "Both", "None"], "Chandrayaan Program"),
    new Question("Which of the following was the first artificial satellite?", ["Sojourner", "Apollo 11", "Lander Beagle", "Sputnik"], "Sputnik"),
    new Question("Which of the following is indicated by the colour of a star?", ["Weight", "Distance", "Temperature", "Size"], "Temperature")
];

Question.prototype.isCorrectAnswer = function(choiceSelected){
    return this.answer === choiceSelected;
}

function Quiz(questions){
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionByindex = function(){
    return this.questions[this.questionIndex];
}

Quiz.prototype.checkChoiceSelected = function(answer){
    if(this.getQuestionByindex().isCorrectAnswer(answer)){
        this.score++;
    }
    this.questionIndex++;
}

Quiz.prototype.isEnded = function(){
    return this.questionIndex === this.questions.length;
}

function showProgress(){
    let currentQuestionNo = quiz.questionIndex + 1;
    let element = document.getElementById("progress");
    element.innerHTML = "Question "+currentQuestionNo+" of "+quiz.questions.length;
}

function loadQuestions(){
    if(quiz.isEnded()){
        showScores();
    }
    else{
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionByindex().text;

        var choices = quiz.getQuestionByindex().choices;
        for(var i=0; i<choices.length; i++){
            var element = document.getElementById("choice"+i);
            element.innerHTML=choices[i];
            handleOptionButton("btn"+i, choices[i]);
        }
        showProgress();
    }
}

function handleOptionButton(id, choice){
    let button = document.getElementById(id);
    button.onclick = function(){
        quiz.checkChoiceSelected(choice);
        loadQuestions();
    }
}

function showScores(){
    let quizCompletedHTML = "<h1>Result</h1>";
    const percentage = Math.round(quiz.score/(questions.length)*100);
    quizCompletedHTML += "<h2 id='score'> Score obtained is "+quiz.score+". And Percentage of correct answer is "+percentage+"%</h2>";
    let element = document.getElementById("quiz");
    element.innerHTML = quizCompletedHTML;
}

var quiz = new Quiz(questions);

loadQuestions();