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

export const POST_PROGRESS_REQUEST = 'POST_PROGRESS_REQUEST';
export const postProgressRequest = () => ({
  type: POST_PROGRESS_REQUEST
});

export const POST_PROGRESS_SUCCESS = 'POST_PROGRESS_SUCCESS';
export const postProgressSuccess = (progress) => ({
  type: POST_PROGRESS_SUCCESS, 
  progress
});

export const POST_PROGRESS_ERROR = 'POST_PROGRESS_ERROR';
export const postProgressError = (error) => ({
  type: POST_PROGRESS_ERROR,
  error
});

export const FETCH_PROGRESS_REQUEST = 'FETCH_PROGRESS_REQUEST';
export const fetchProgressRequest = () => ({
  type: FETCH_PROGRESS_REQUEST
});

export const FETCH_PROGRESS_SUCCESS = 'FETCH_PROGRESS_SUCCESS';
export const fetchProgressSuccess = () => ({
  type: FETCH_PROGRESS_SUCCESS, 
});

export const FETCH_PROGRESS_ERROR = 'FETCH_PROGRESS_ERROR';
export const fetchProgressError = (error) => ({
  type: FETCH_PROGRESS_ERROR,
  error
});

//post user progress
export const postProgress = (progress) => (dispatch, getState) => {
  dispatch(postProgressRequest());
  const authToken = getState().auth.authToken;
  const data = progress;  
  return fetch(`${API_BASE_URL}/progress`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(data), 
  }).then (() => {
    dispatch(postProgressSuccess(progress));
  }).catch(err => {
    dispatch(postProgressError(err));
  }); 
};

//get user progress
export const fetchProgress = () => (dispatch, getState) => {
  dispatch(fetchProgressRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/progress`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  }).then(res => {
    if(!res.ok) {
      return Promise.reject(res.statusText);
    }
    return res.json();
  }).then(progress => {
    dispatch(fetchProgressSuccess(progress));
  }).catch(err => {
      dispatch(fetchProgressError(err));
  }); 
};

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