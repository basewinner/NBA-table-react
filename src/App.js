import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as ReactBootStrap from 'react-bootstrap';

const App = () => {
  const[players,setPlayers] = useState([]);
  const[loading,setLoading] = useState(false);
  const getPlayerData = async () => {
    try{
      const data = await axios.get(
        "https://nba-players.herokuapp.com/players-stats"
      );
      console.log(data);
      setPlayers(data.data);
      setLoading(true);
    } catch (e) {
      console.log(e)
    }
  };

  const columns = [
    { dataField: "name", text: "Player", sort:true},
    { dataField: "team_acronym", text: "Team", sort:true },
    { dataField: "player_efficiency_rating", text: "PER", sort:true},
    { dataField: "points_per_game", text: "PPPG", sort:true},
    { dataField: "free_throw_percentage", text: "FT%", sort:true},
    
  ]
  

  useEffect(() => {
    getPlayerData();
  }, []);


  return (
    <div className="App">
      {loading ? (  
        <BootstrapTable
          keyField="name"
          data={players}
          columns={columns}
          pagination={paginationFactory()}
        />
      ) : ( 
        <ReactBootStrap.Spinner animation="border" />  
      )}
    </div>
  );
};

export default App;

