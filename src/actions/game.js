import {API_BASE_URL} from '../config';

export const FETCH_QUESTION_REQUEST = 'FETCH_QUESTION_REQUEST';
export const fetchQuestionRequest = () => ({
  type: FETCH_QUESTION_REQUEST
});

export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const fetchQuestionSuccess = (question) => ({
  type: FETCH_QUESTION_SUCCESS, 
  question
});

export const FETCH_QUESTION_ERROR = 'FETCH_QUESTION_ERROR';
export const fetchQuestionError = (error) => ({
  type: FETCH_QUESTION_ERROR,
  error
});

//GET endpoint 
//fetch question: api/questions
export const fetchQuestion = () => (dispatch, getState) => {
  dispatch(fetchQuestionRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/questions`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }).then(res => {
    if(!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  }).then(question => {
    dispatch(fetchQuestionSuccess(question));
  }).catch(err => {
      dispatch(fetchQuestionError(err));
  }); 
};


//PUT endpoint
//record the user's response and score
//api/users/questions 

//front end checks if right
//store: correct answers, score
//score will be updated 
//score gets stored in backend  