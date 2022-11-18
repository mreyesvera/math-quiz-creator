/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Provides utility functions to help manage SolvedQuiz objects. 
 */

function addTotalScore(solvedQuizzes){
    return solvedQuizzes.map((solvedQuiz) => {
        return {
            ...solvedQuiz,
            totalNumberOfQuestions: solvedQuiz.correctResponses + solvedQuiz.incorrectResponses
        };
    });
};

function getHighestScore(solvedQuizzes){
    let max=0; 
    solvedQuizzes.forEach((solvedQuiz) => {
        if(solvedQuiz.score > max){
            max = solvedQuiz.score;
        }
    });
    return Math.round(max*100*100)/100;
}

export  {
    addTotalScore,
    getHighestScore
}