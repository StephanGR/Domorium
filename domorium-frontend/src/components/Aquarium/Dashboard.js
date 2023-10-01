import React, { useEffect, useState } from 'react';
import api from '../../services/api';

function Dashboard() {
  const [aquariums, setAquariums] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/aquarium/my-aquariums');
        setAquariums(response.data);
      } catch (error) {
        console.error('Fetch Aquariums Error', error);
      }
    };
    fetchData();
  }, []);
  
  return (
    <div>
      <h1>My Aquariums</h1>
      <ul>
        {aquariums.map(aquarium => (
          <li key={aquarium.id}>{aquarium.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
