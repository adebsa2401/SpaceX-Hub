import axios from 'axios';

const FETCH = 'spaceTravelersHub/missions/FETCH';
const TOGGLE_RESERVATION = 'spaceTravelersHub/missions/TOGGLE_RESERVATION';

export const fetchMissions = () => ({
  type: FETCH,
});

export const toggleMissionReservation = (payload) => ({
  type: TOGGLE_RESERVATION,
  payload,
});

const fetchMissionsApi = () => async () => {
  let missions = await axios.get('https://api.spacexdata.com/v3/missions');

  missions = missions.map((mission) => ({
    ...mission,
    reserved: false,
  }));

  return missions;
};

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH:
      return fetchMissionsApi();
    case TOGGLE_RESERVATION:
      return state.map((mission) => {
        if (mission.mission_id !== action.payload) return mission;
        return { ...mission, reserved: !mission.reserved };
      });
    default:
      return state;
  }
};
