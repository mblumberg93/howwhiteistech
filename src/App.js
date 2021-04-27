import React from 'react';
import './App.css';
//import { buildData } from './dataProcessing'
import { processedSurveyData } from './data/processedSurveyData'
import Charts from './components/Charts'

function App() {
  return (
    <div className="App">
      <div className="page">
          <div className="charts-container">
            <Charts data={processedSurveyData}></Charts>
          </div>
      </div>
    </div>
  );
}

export default App;