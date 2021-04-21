import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import testFilePath from './data/developer_survey_2020/survey_results_public.csv';
import Papa from 'papaparse'

function App() {
  useEffect(() => {
    parseCsvData(testFilePath);
  });

  const parseCsvData = (filePath) => {
    Papa.parse(filePath, {
      download: true,
      header: true,
      complete: function(results) {
        console.log(results);
      }
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
