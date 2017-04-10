/**
 * Created by daisy on 4/6/2017.
 */

var inquirer = require('inquirer');
var closeCard = require('./clozeCard.js');
var flashCard = require('./Basiccard.js');
var questions = require('./question.js').questions;
var basicQuestion = require('./BasicQuestion.js').basicQuest;
var closeQuestions = [];
var basicQ =[];

//populate the parital deleted questions
for(i=0; i<questions.length; i++){
    var question = new closeCard(questions[i].full, questions[i].cloze);
    closeQuestions.push(question);
}
for(i=0; i<basicQuestion.length; i++){
    var q = new flashCard(basicQuestion[i].front, basicQuestion[i].back);
    basicQ.push(q);
}



var currentQuestion = 0;
var answeredCorrect = 0;
var answeredWrong = 0;

function game(){
    inquirer.prompt([
        {
            type: "list",
            message: " What type of game do you want to play",
            choices: ["basic", "clozed"],
            name:"input"

}
    ]).then(function(data){
        if(data.input === "basic"){
            Basic();
        }else{
            Cloze();
        }
    });
}

// askQuestion prompts the user to answer a given cloze-deleted question
function Cloze() {
    inquirer.prompt([
        {
            type: 'input',
            message: closeQuestions[currentQuestion].partial + '\nAnswer: ',
            name: 'userGuess'
        }
    ]).then(function (answers) {
        console.log('\n');

        // Check if the user has guessed correctly
        if (answers.userGuess.toLowerCase() === closeQuestions[currentQuestion].cloze.toLowerCase()) {
            console.log('Correct!');
            answeredCorrect++;
        } else {
            console.log('Incorrect!');
            answeredWrong++;
        }

        // Show the correct answer
        console.log(closeQuestions[currentQuestion].full);
        console.log('-------------------------------------\n');

        // Advance to the next question
        if (currentQuestion < closeQuestions.length - 1) {
            currentQuestion++;
            Cloze();
        } else {
            console.log('Game Over!');
            console.log('Correct Answers: ' + answeredCorrect);
            console.log('Incorrect Answers: ' + answeredWrong);

            console.log('-------------------------------------\n');

            // Prompt the user to play again
            inquirer.prompt([
                {
                    type: 'confirm',
                    message: 'Would you like to play again?',
                    name: 'playAgain'
                }
            ]).then(function (answers) {
                if (answers.playAgain) {
                    // Reset the game
                    currentQuestion = 0;
                    answeredCorrect = 0;
                    answeredWrong = 0;

                    // Begin asking the questions!
                    game();
                } else {
                    // Exit the game
                    console.log('Thanks for playing! Goodbuy!');
                }
            })
        }
    })
}

function Basic() {
    inquirer.prompt([
        {
            type: 'input',
            message: basicQ[currentQuestion].front + '\nAnswer: ',
            name: 'userGuess'
        }
    ]).then(function (answers) {
        console.log('\n');

        // Check if the user has guessed correctly
        if (answers.userGuess.toLowerCase() === basicQ[currentQuestion].back.toLowerCase()) {
            console.log('Correct!');
            answeredCorrect++;
        } else {
            console.log('Incorrect!');
            answeredWrong++;
        }

        // Show the correct answer
        console.log(basicQ[currentQuestion].front);
        console.log('-------------------------------------\n');

        // Advance to the next question
        if (currentQuestion < basicQ.length - 1) {
            currentQuestion++;
            Basic();
        } else {
            console.log('Game Over!');
            console.log('Correct Answers: ' + answeredCorrect);
            console.log('Incorrect Answers: ' + answeredWrong);

            console.log('-------------------------------------\n');

            // Prompt the user to play again
            inquirer.prompt([
                {
                    type: 'confirm',
                    message: 'Would you like to play again?',
                    name: 'playAgain'
                }
            ]).then(function (answers) {
                if (answers.playAgain) {
                    // Reset the game
                    currentQuestion = 0;
                    answeredCorrect = 0;
                    answeredWrong = 0;

                    // Begin asking the questions!
                    game();
                } else {
                    // Exit the game
                    console.log('Thanks for playing! Goodbuy!');
                }
            })
        }
    })
}


// Begin asking the questions!
game();


