import GitAPI from "../api/api";

const SET_USER = "SET_USER";
const SET_STATUS = "SET_STATUS";
const SET_REPOSITORIES = "SET_REPOSITORIES";
const SET_PAGE = "SET_PAGE";
const SET_IS_FETCHING = "SET_IS_FETCHING";

const initialState = {
  user: null,
  repositories: [],
  statusMessage: null,
  currentPage: 1,
  perPage: 4,
  isFetching: null,
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: { ...action.user } };
    case SET_STATUS:
      return { ...state, statusMessage: action.statusMessage };
    case SET_REPOSITORIES: {
      return { ...state, repositories: [...action.repositories] };
    }
    case SET_PAGE: {
      return { ...state, currentPage: action.currentPage };
    }
    case SET_IS_FETCHING: {
      return { ...state, isFetching: action.isFetching };
    }
    default:
      return state;
  }
};

export const updateUserAC = (user) => ({
  type: SET_USER,
  user,
});

export const updateStatusAC = (statusMessage) => ({
  type: SET_STATUS,
  statusMessage,
});

export const updateRepositoriesAC = (repositories) => ({
  type: SET_REPOSITORIES,
  repositories,
});
export const setCurrentPageAC = (currentPage) => ({
  type: SET_PAGE,
  currentPage,
});
export const setIsFetchingAC = (isFetching) => ({
  type: SET_IS_FETCHING,
  isFetching,
});

export const setUserTC = (username, currentPage, perPage) => {
  return (dispatch) => {
    dispatch(setIsFetchingAC(true));
    Promise.all([
      GitAPI.getUser(username),
      GitAPI.getAllRepositories(username, currentPage, perPage),
    ])
      .then((res) => {
        const [user, repos] = res;
        dispatch(updateStatusAC("success"));
        dispatch(setCurrentPageAC(1));
        dispatch(updateUserAC(user));
        dispatch(updateRepositoriesAC(repos));
        dispatch(setIsFetchingAC(false));
      })
      .catch((error) => {
        dispatch(setIsFetchingAC(false));
        dispatch(updateStatusAC("error"));
      });
  };
};

export const updateRepoTC = (username, currentPage, perPage) => {
  return (dispatch) => {
    dispatch(setCurrentPageAC(currentPage));
    GitAPI.getAllRepositories(username, currentPage, perPage).then((res) => {
      dispatch(updateRepositoriesAC(res));
    });
  };
};
