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
            ]
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
            ]
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
            ]
        }
    ],
    [],
    []
];

export {
    topics,
    quizzes,
    solvedQuizzes,
    questions,
}
;