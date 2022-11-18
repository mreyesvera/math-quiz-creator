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
import TakeQuiz from './components/SolvedQuiz/TakeQuiz';
import Unauthorized from './components/Shared/Unauthorized';
import SolveQuiz from './components/SolvedQuiz/SolveQuiz';
import Account from './pages/Account';
import { ThemeProvider } from "./shared/Theme";
import { Box } from '@mui/material';
import { AuthProvider } from './context/AuthProvider';
import RequiredAuth from './components/Shared/RequireAuth';

const classes = {
  root: {
    fontFamily: 'Poppins',
  }
};

const ROLES = {
  'Creator': "Creator",
  'Learner': "Learner"
};

/**
 * I, Silvia Mariana Reyesvera Quijano, student number 000813686, 
 * certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement 
 * and I have not made my work available to anyone else.
 * 
 * Manages and displays the single page application (root of SPA). 
 * The application's routes are defined here. 
 * 
 * @returns {React.ReactElement} App
 */
function App() {
  return (
    <Box sx={classes.root}>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route path="/resetPassword" element={<ResetPassword />} />
                <Route path="/unauthorizedUser" element={<Unauthorized />} />
              </Route>

              <Route element={<RequiredAuth allowedRoles={[ROLES.Creator, ROLES.Learner]} />}>
                <Route element={<PrivateLayout />}>
                  
                  <Route path="/home" element={<Home />} />
                  
                  <Route path="/quiz/:id" element={<Quiz />} >
                    <Route path="/quiz/:id/details" element={<QuizDetails />} />

                    <Route element={<RequiredAuth allowedRoles={[ROLES.Creator]} />}>
                      <Route path="/quiz/:id/edit" element={<QuizEdit />} />
                    </Route>

                    <Route element={<RequiredAuth allowedRoles={[ROLES.Learner]} />}>
                      <Route path="/quiz/:id/solve/:unlimited" element={<TakeQuiz />} />
                    </Route>

                  </Route>
                  
                  <Route element={<RequiredAuth allowedRoles={[ROLES.Creator]} />}>
                    <Route path="/quiz/:topicId/add" element={<QuizAdd />} />
                  </Route>

                  <Route element={<RequiredAuth allowedRoles={[ROLES.Creator]} />}>
                    <Route path="/question/:id" element={<Question />} >
                      <Route path="/question/:id/edit" element={<QuestionEdit />} />
                    </Route>
                  </Route>

                  <Route element={<RequiredAuth allowedRoles={[ROLES.Creator]} />}>
                    <Route path="/question/:topicId/add" element={<QuestionAdd />} />
                  </Route>

                  <Route path="/account" element={<Account />} />
                  
                  <Route path="/unauthorizedPage" element={<Unauthorized />} />
                </Route>
              </Route>
            </Routes>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </Box>
  );
}

export default App;
