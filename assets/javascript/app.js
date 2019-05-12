let questionslist = {};
let trivia = {};

let questions;
let answers = ["D", "A", "D", "A", "C", "B", "A", "A"];

let intervalID;

timer = {

    time: 120,

    start: function () {
        $("#timer-display").text("02:00");
        intervalID = setInterval(timer.countdown, 1000);
    },

    countdown: function () {
       
        timer.time--;
        let currentTime = timer.timeConverter(timer.time);
       
        $("#timer-display").text(currentTime);

        if (timer.time === 0) {
            $("#timer-display").text("Time's Up!");
            clearInterval(intervalID);
            $(".done, .question-block").hide();
           
            score();
            $(".results, .reset").show();
        } else {

        }
    },

    reset: function () {
        timer.time = 120;
        $("#timer-display").text("02:00");
        clearInterval(intervalID);
    },

    timeConverter: function (t) {
        let minutes = Math.floor(t / 60);
        let seconds = t - (minutes * 60);

        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        if (minutes === 0) {
            minutes = "00";
        }

        else if (minutes < 10) {
            minutes = "0" + minutes;
        }

        return minutes + ":" + seconds;
    },

};


function startTrivia() {
    questionslist = resetQuestions();
    trivia = resetTrivia();

    showQuestions();

}

function resetTrivia() {
    return {
        correct: 0,
        incorrect: 0,
        blank: 0,
    }
}

function resetQuestions() {
    return {
        q0: {
            question: "Which Hokage sealed the nine-tailed fox inside Naruto?",
            A: "Second Hokage",
            B: "First Hokage",
            C: "Third Hokage",
            D: "Fourth Hokage",
        },
        q1: {
            question: "Who tricked Naruto into stealing a sacred scroll?",
            A: "Mizuki",
            B: "Sasuke",
            C: "Iruka",
            D: "Zabuza",
        },
        q2: {
            question: "Which character can only use taijutsu?",
            A: "Naruto Uzumaki",
            B: "Gaara",
            C: "Sasuke Uchiha",
            D: "Rock Lee",
        },
        q3: {
            question: "Naruto first shows his nine-tails chakra when he fights who?",
            A: "Haku",
            B: "Gaara",
            C: "Sasuke Uchicha",
            D: "Neji Hyuuga",
        },
        q4: {
            question: "What is the forbidden technique used by Rock Lee that he used on Dosu and Gaara?",
            A: "Loyus of Destruction",
            B: "Shadow Lotus",
            C: "Primary Lotus",
            D: "Fiery Lotus",
        },
        q5: {
            question: "Sasuke's goal is gain enough power to kill whom?",
            A: "Naruto Uzumaki",
            B: "Itachi Uchiha",
            C: "Neji Hyuuga",
            D: "The Third Hokage",
        },
        q6: {
            question: "What does 'Chidori' mean?",
            A: "One Thousand Birds",
            B: "Five Thousand Swords",
            C: "Five Hundred Punches",
            D: "Ten Thousand Stones",
        },
        q7: {
            question: "Which of the legendary sannin becomes the fifth Hokage?",
            A: "Tsunade",
            B: "Orochimaru",
            C: "Jiraya",
            D: "Naruto becomes the 5th Hokage",
        }
    }
}

function showQuestions() {
    questions = Object.keys(questionslist);
    for (var i = 0; i < questions.length; i++) {
        var questiontitle = questions[i];
        var question = questionslist[questiontitle];
        var questionblocks = createQuestions(question, questiontitle);
        $(".question-block").append(questionblocks).show();
    }
}

function createQuestions(question, key) {
    var block = $("<div class='question' name='" + key + "'>" + question.question + "" +
        "<ul>" +
        "<li><input type='radio' name='" + key + "' value='A'><label>" + question.A + "</label></li>" +
        "<li><input type='radio' name='" + key + "' value='B'><label>" + question.B + "</label></li>" +
        "<li><input type='radio' name='" + key + "' value='C'><label>" + question.C + "</label></li>" +
        "<li><input type='radio' name='" + key + "' value='D'><label>" + question.D + "</label></li>" +
        "</ul>");

    return block;
}

function score() {
    let playeranswers = [$("input:radio[name='q0']:checked").val(),
        $("input:radio[name='q1']:checked").val(),
        $("input:radio[name='q2']:checked").val(),
        $("input:radio[name='q3']:checked").val(),
        $("input:radio[name='q4']:checked").val(),
        $("input:radio[name='q5']:checked").val(),
        $("input:radio[name='q6']:checked").val(),
        $("input:radio[name='q7']:checked").val()];

    console.log(playeranswers);
    console.log(answers);

    for (k = 0; k < questions.length; k++) {
        if (playeranswers[k] === undefined) {
            trivia.blank++;
        } else if (playeranswers[k] === answers[k]) {
            trivia.correct++;
        } else {
            trivia.incorrect++;
        }

    }

    $("#correct").text("Correct: " + trivia.correct);
    $("#incorrect").text("Incorrect: " + trivia.incorrect);
    $("#unanswered").text("Unanswered: " + trivia.blank);

    console.log(trivia.correct);
    console.log(trivia.incorrect);
    console.log(trivia.blank);
}


$(document).ready(function () {

    $(".start").on("click", function () {
        $(".start").hide();
        startTrivia();
        timer.start();
        $(".done").show();

    });

    $(".done").on("click", function () {
        score();
        $(".done, .question-block").hide();
        timer.reset();
        $(".results, .reset").show();
    });

    $(".reset").on("click", function () {
        $(".question-block").empty();
        $(".start").show();
        $(".reset, .results").hide();
        timer.reset();
    });
});