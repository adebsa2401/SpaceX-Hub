import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMissions, toggleMissionReservation } from '../redux/missions/missions';
import '../styles/Missions.css';

const Missions = () => {
  const missions = useSelector((state) => state.missions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMissions());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <table className="missions-table">
        <thead>
          <tr>
            <th>Mission</th>
            <th>Description</th>
            <th>Status</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {missions.map((mission) => (
            <tr key={mission.mission_id}>
              <td className="mission-name">{mission.mission_name}</td>
              <td className="mission-description">{mission.description}</td>
              <td className="member-status-cell"><span className={mission.reserved ? 'active-badge' : ''}>{mission.reserved ? 'Active Member' : 'NOT A MEMBER'}</span></td>
              <td className="status-btn-cell">
                <button
                  type="button"
                  className={mission.reserved ? 'danger-btn' : ''}
                  onClick={() => dispatch(toggleMissionReservation(mission.mission_id))}
                >
                  {mission.reserved ? 'Leave Mission' : 'Join Mission'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Missions;
