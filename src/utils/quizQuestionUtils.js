function matchingQuizQuestionId(quizQuestion1, quizQuestion2){
    return quizQuestion1.quizQuestionId === quizQuestion2.quizQuestionId;
}

function removeQuestionOnQuizQuestion(quizQuestion){
    delete quizQuestion.question;

    return quizQuestion;
}

function compareQuizQuestions(quizQuestion1, quizQuestion2){
    if(!quizQuestion1 || !quizQuestion2)
        return false;

    return quizQuestion1.quizQuestionId === quizQuestion2.quizQuestionId 
        && quizQuestion1.quizId === quizQuestion2.quizId
        && quizQuestion1.questionId === quizQuestion2.questionId
        && quizQuestion1.order === quizQuestion2.order;
}

function compareQuizQuestionsArrays(quizQuestions1, quizQuestions2){
    if(!quizQuestions1 || !quizQuestions2 
        || !(quizQuestions1.length > 0) || !(quizQuestions2.length > 0)
        || quizQuestions1.length !== quizQuestions2.length){
            return false;
    }

    for(let i=0; i<quizQuestions1.length; i++){
        if(!compareQuizQuestions(quizQuestions1[i], quizQuestions2[i])){
            return false
        }
    }    

    return true;
}

export {
    matchingQuizQuestionId,
    removeQuestionOnQuizQuestion,
    compareQuizQuestions,
    compareQuizQuestionsArrays,
};