import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const FETCH = 'spaceTravelersHub/missions/FETCH';
const TOGGLE_RESERVATION = 'spaceTravelersHub/missions/TOGGLE_RESERVATION';

export const fetchMissions = createAsyncThunk(
  FETCH,
  async () => {
    const missions = await axios.get('https://api.spacexdata.com/v3/missions');

    return missions.data.map((mission) => ({
      ...mission,
      reserved: false,
    }));
  },
);

export const toggleMissionReservation = (payload) => ({
  type: TOGGLE_RESERVATION,
  payload,
});

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH}/fulfilled`:
      return action.payload;
    case TOGGLE_RESERVATION:
      return state.map((mission) => {
        if (mission.mission_id !== action.payload) return mission;
        return { ...mission, reserved: !mission.reserved };
      });
    default:
      return state;
  }
};
