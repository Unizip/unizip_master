import React from 'react';
import { useSelector } from 'react-redux';
import UserCard from './components/UserCard';


const App: React.FC = () => {

    
  return (
    <div className="App">
      
      {/*  App goes here :) */}
        <UserCard name={"Raph"} dob={"03/07/1990"}/>
    </div>
  );
}

export default App;
