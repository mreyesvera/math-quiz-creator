const topics = [
    {
        topicId: 0,
        title: 'STATISTICS',
    },
    {
        topicId: 1,
        title: 'PROBABILITY',
    },
    {
        topicId: 2,
        title: 'LINEAR ALGEBRA',
    },
];
const quizzes = [
    [
        {
            quizId: 0,
            title: "stats quiz 1",
            isPublic: true,
            hasUnlimitedMode: true,
            lastModifiedTime: '2022-10-02',
        },
        {
            quizId: 1,
            title: "stats quiz 2",
            isPublic: true,
            hasUnlimitedMode: true,
            lastModifiedTime: '2022-10-02',
        },
        {
            quizId: 2,
            title: "stats quiz 3",
            isPublic: false,
            hasUnlimitedMode: true,
            lastModifiedTime: '2022-10-02',
        },
        {
            quizId: 3,
            title: "stats quiz 4",
            isPublic: false,
            hasUnlimitedMode: false,
            lastModifiedTime: '2022-10-02',
        },
        {
            quizId: 4,
            title: "stats quiz 5",
            isPublic: false,
            hasUnlimitedMode: false,
            lastModifiedTime: '2022-10-02',
        },
    ],
    [
        {
            quizId: 5,
            title: "prob quiz 1",
            isPublic: true,
            hasUnlimitedMode: true,
            lastModifiedTime: '2022-10-02',
        },
        {
            quizId: 6,
            title: "prob quiz 2",
            isPublic: true,
            hasUnlimitedMode: true,
            lastModifiedTime: '2022-10-02',
        },
        {
            quizId: 7,
            title: "prob quiz 3",
            isPublic: false,
            hasUnlimitedMode: true,
            lastModifiedTime: '2022-10-02',
        },
        {
            quizId: 8,
            title: "prob quiz 4",
            isPublic: true,
            hasUnlimitedMode: false,
            lastModifiedTime: '2022-10-02',
        },
        {
            quizId: 9,
            title: "prob quiz 5",
            isPublic: false,
            hasUnlimitedMode: false,
            lastModifiedTime: '2022-10-02',
        },
        {
            quizId: 10,
            title: "prob quiz 6",
            isPublic: true,
            hasUnlimitedMode: true,
            lastModifiedTime: '2022-10-02',
        },
    ],
    [
        {
            quizId: 11,
            title: "la quiz 1",
            isPublic: true,
            hasUnlimitedMode: true,
            lastModifiedTime: '2022-10-02',
        },
        {
            quizId: 12,
            title: "la quiz 2",
            isPublic: false,
            hasUnlimitedMode: true,
            lastModifiedTime: '2022-10-02',
        },
        {
            quizId: 13,
            title: "la quiz 3",
            isPublic: true,
            hasUnlimitedMode: false,
            lastModifiedTime: '2022-10-02',
        },
    ]
];

const solvedQuizzes = [
    [
        {
            solvedQuizId: 1,
            title: "stats quiz 1",
            score: 0.9,
        },
        {
            solvedQuizId: 2,
            title: "stats quiz 2",
            score: 0.7,
        },
    ],
    [],
    [],
];

const solvedQuizzes2 = [
    {
        solvedQuizId: 0,
        lastModifiedTime: '2022-10-02',
        creationTime: '2022-10-02',
        correctResponses: 9,
        incorrectResponses: 2,
        totalQuestions: 11,
        score: 0.82,
    },
    {
        solvedQuizId: 1,
        lastModifiedTime: '2022-10-03',
        creationTime: '2022-10-03',
        correctResponses: 10,
        incorrectResponses: 1,
        totalQuestions: 11,
        score: 0.91,
    },
    {
        solvedQuizId: 2,
        lastModifiedTime: '2022-10-04',
        creationTime: '2022-10-04',
        correctResponses: 9,
        incorrectResponses: 11,
        totalQuestions: 11,
        score: 1,
    },
];

const questions = [
    [
        {
            questionId: 0,
            title: 'stats question 1',
            lastModifiedTime: '2022-10-02',
            quizQuestions: [
                {
                    quizId: 0,
                    title: "stats quiz 1"
                },
                {
                    quizId: 2,
                    title: "stats quiz 3"
                }
            ],
            order: 1,
        },
        {
            questionId: 1, 
            title: 'stats question 2',
            lastModifiedTime: '2022-10-01',
            quizQuestions: [
                {
                    quizId: 0,
                    title: "stats quiz 1"
                },
                {
                    quizId: 2,
                    title: "stats quiz 3"
                }
            ],
            order: 2,
        },
        {
            questionId: 2, 
            title: 'stats question 3',
            lastModifiedTime: '2022-10-02',
            quizQuestions: [
                {
                    quizId: 2,
                    title: "stats quiz 3"
                }
            ],
            order: 3,
        }
    ],
    [],
    []
];

const sampleQuiz = {
    quizId: 0,
    title: "stats quiz 1",
    description: "quiz 1 description",
    isPublic: true,
    hasUnlimitedMode: true,
    creationTime: '2022-10-01',
    lastModifiedTime: '2022-10-02',
    topic: {
        creationTime: '2022-08-01',
        lastModifiedTime: '2022-08-02',
        topicId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        title: 'Statistics',
    },
    creator: 'Mariana',
    
};

const sampleQuizQuestions = [
    {
        quizQuestionId: 0,
        question: {
            questionId: 0,
            title: 'stats question 1',
            lastModifiedTime: '2022-10-02',
        },
        order: 1,
        creationTime: '2022-10-03',
        lastModifiedTime: '2022-10-03',
    },
    {
        quizQuestionId: 1,
        question: {
            questionId: 1, 
            title: 'stats question 2',
            lastModifiedTime: '2022-10-01',
        },
        order: 2,
        creationTime: '2022-10-03',
        lastModifiedTime: '2022-10-03',
    },
    {
        quizQuestionId: 2,
        question: {
            questionId: 2, 
            title: 'stats question 3',
            lastModifiedTime: '2022-10-02',
        },
        order: 3,
        creationTime: '2022-10-03',
        lastModifiedTime: '2022-10-03',
    },
    
];


export {
    topics,
    quizzes,
    solvedQuizzes,
    solvedQuizzes2,
    questions,
    sampleQuiz,
    sampleQuizQuestions,
}
;