import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rocketsReducer from './rockets/rockets';
import missionsReducer from './missions/missions';

export default configureStore({
  reducer: {
    rocketsReducer,
    missionsReducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, thunk),
});
