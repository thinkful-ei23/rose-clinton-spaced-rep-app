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

export const POST_ANSWER_REQUEST = 'POST_ANSWER_REQUEST';
export const postAnswerRequest = () => ({
  type: POST_ANSWER_REQUEST
});

export const POST_ANSWER_SUCCESS = 'POST_ANSWER_SUCCESS';
export const postAnswerSuccess = () => ({
  type: POST_ANSWER_SUCCESS, 
});

export const POST_ANSWER_ERROR = 'POST_ANSWER_ERROR';
export const postAnswerError = (error) => ({
  type: POST_ANSWER_ERROR,
  error
});

//GET endpoint 
//fetch question: api/questions
export const fetchQuestion = () => (dispatch, getState) => {
  dispatch(fetchQuestionRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/questions/next`, {
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

export const postAnswer = (userAnswer) => (dispatch, getState) => {
  dispatch(postAnswerRequest());
  const authToken = getState().auth.authToken;
  const data = {userAnswer};
  return fetch(`${API_BASE_URL}/questions/answers`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(data), 
  }).then (() => {
    dispatch(postAnswerSuccess());
  }).catch(err => {
      dispatch(postAnswerError(err));
  }); 
};