import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './shared/PublicLayout';
import PrivateLayout from './shared/PrivateLayout';
import Login from './components/Welcome/Login';
import Register from './components/Welcome/Register';
import ForgotPassword from './components/Welcome/ForgotPassword';
import ResetPassword from './components/Welcome/ResetPassword';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import QuizDetails from './components/Quiz/QuizDetails';
import QuizEdit from './components/Quiz/QuizEdit';
import QuizAdd from './pages/QuizAdd';
import Question from './pages/Question';
import QuestionEdit from './components/Question/QuestionEdit';
import QuestionAdd from './pages/QuestionAdd';
import SolveQuiz from './components/SolvedQuiz/SolveQuiz';
import Account from './pages/Account';
import { ThemeProvider } from "./shared/Theme";
import { Box } from '@mui/material';
import { sampleQuiz, questions } from './components/sample_data';

const classes = {
  root: {
    fontFamily: 'Poppins',
  }
};

/**
 * TO DO: Modify the passing of the authentication functions once full authentication
 * is incorporated.
 */
function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isCreator, setIsCreator] = React.useState(true);

  function toggleIsCreator() {
    setIsCreator((oldIsCreator => !oldIsCreator));
  }

  
  const currentQuiz = sampleQuiz;
  const currentQuestions = questions[0];

  // function toggleIsAuthenticated(){
  //   setIsAuthenticated((oldIsAuthenticated) => !oldIsAuthenticated);
  // }

  return (
    <Box sx={classes.root}>
      <BrowserRouter>
        <ThemeProvider>
          <Routes>
            { //!isAuthenticated &&
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route path="/resetPassword" element={<ResetPassword />} />
              </Route>
            }
            { //isAuthenticated &&
              <Route element={<PrivateLayout setIsAuthenticated={setIsAuthenticated} toggleIsCreator={toggleIsCreator}/>}>
                <Route path="/home" element={<Home title="Hello user!" isCreator={isCreator}/>} />
                {/* <Route path="/quiz/:id/*" element={<Quiz isCreator={isCreator}/>} /> */}
                <Route path="/quiz/:id" element={<Quiz isCreator={isCreator}/>} >
                  <Route path="/quiz/:id/details" element={<QuizDetails isCreator={isCreator}/>} />
                  <Route path="/quiz/:id/edit" element={<QuizEdit isCreator={isCreator} />} />
                </Route>
                <Route path="/quiz/:topicId/add" element={<QuizAdd isCreator={isCreator}/>} />
                <Route path="/question/:id" element={<Question />} >
                  <Route path="/question/:id/edit" element={<QuestionEdit />} />
                </Route>
                <Route path="/question/:topicId/add" element={<QuestionAdd />} />
                <Route path="/solve-quiz" element={<SolveQuiz />}/>
                <Route path="/account" element={<Account />} />
              </Route>
            }
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </Box>
  );
}

export default App;
