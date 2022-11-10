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