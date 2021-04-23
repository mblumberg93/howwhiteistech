import React, { useEffect, useState } from 'react';
import './App.css';
import { buildData } from './dataProcessing'
import { processedSurveyData } from './data/processedSurveyData'


function App() {
  const [data, setData] = useState(processedSurveyData)

  useEffect(() => {
    console.log(data)
    // Use Locally to process raw StackOverflow survey data
    //buildData()
  });

  return (
    <div className="App">

    </div>
  );
}

export default App;