import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rockets from './rockets/rockets';
import missions from './missions/missions';

export default configureStore({
  reducer: {
    rockets,
    missions,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, thunk),
});
