function compareQuizzes(quiz1, quiz2){
    if(!quiz1 || !quiz2){
        return false;
    }

    return quiz1.title === quiz2.title 
        && quiz1.description === quiz2.description
        && quiz1.isPublic === quiz2.isPublic
        && quiz1.hasUnlimitedMode === quiz2.hasUnlimitedMode;
}

export {
    compareQuizzes
};