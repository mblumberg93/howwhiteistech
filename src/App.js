import React from 'react';
import './App.css';
import FileProcessor from './components/FileProcessor'
// TODO use data in charting
import { processedSurveyData } from './data/processedSurveyData'

function App() {

  return (
    <div className="App">
      <FileProcessor></FileProcessor>
    </div>
  );
}

export default App;