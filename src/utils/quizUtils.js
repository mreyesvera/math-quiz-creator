/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Provides utility functions to help manage Quiz objects. 
 */

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