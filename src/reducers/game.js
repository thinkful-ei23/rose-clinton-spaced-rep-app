import * as actions from '../actions/game';

const initialState = {
  question: null,
  error: null,
  loading: false
}

export default function questionReducer(state=initialState, action) {
  switch (action.type) {
    case actions.FETCH_QUESTION_REQUEST:
      return {...state, loading : true};
    case actions.FETCH_QUESTION_SUCCESS:
      return {...state, question: action.question, error: null, loading: false};
    case actions.FETCH_QUESTION_ERROR:
      return {...state, loading: false, error: action.error};
    case actions.POST_ANSWER_REQUEST:
      return {...state, loading: true};
    case actions.POST_ANSWER_SUCCESS:
      return {...state, error: null, loading: false};
    case actions.POST_ANSWER_ERROR:
      return {...state, loading: false, error: action.error};  
    default:
      return state;
  }
};
