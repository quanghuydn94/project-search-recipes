import {
  FETCH_RECIPE_FAILED,
  FETCH_RECIPE_START,
  FETCH_RECIPE_SUCCESS,
} from "./action";

const initialState = {
  recipes: [],
  loading: false,
  error: null,
};

export const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RECIPE_START:
      return { ...state, loading: true };

    case FETCH_RECIPE_SUCCESS:
      return { ...state, loading: false, recipes: action.payload };

    case FETCH_RECIPE_FAILED:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
