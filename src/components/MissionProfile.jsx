import React from 'react';
import { useSelector } from 'react-redux';

const MissionProfile = () => {
  const missions = useSelector((state) => state.missions)
    .filter((mission) => mission.reserved);

  return (
    <div className="reserve-container-top">
      <h1>My Missions</h1>
      <div className="reserve-container">
        { missions.length === 0 && <p>No Reserved Missions</p>}
        {missions.map((mission) => (
          <h3 key={mission.mission_id} className="reserve-item">{mission.mission_name}</h3>
        ))}
      </div>
    </div>
  );
};

export default MissionProfile;
