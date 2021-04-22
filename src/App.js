import React, { useEffect, useState } from 'react';
import Papa from 'papaparse'
import './App.css';
import FileProcessor from './components/FileProcessor'
import { generateProcessedData, extractData } from './dataProcessing'
import data2020 from './data/StackOverflowData/2020_survey_results_public.csv';
import data2019 from './data/StackOverflowData/2019_survey_results_public.csv';
import data2018 from './data/StackOverflowData/2018_survey_results_public.csv';
import data2017 from './data/StackOverflowData/2017_survey_results_public.csv';
import data2016 from './data/StackOverflowData/2016 Stack Overflow Survey Responses.csv';
import data2015 from './data/StackOverflowData/2015 Stack Overflow Developer Survey Responses.csv';
import data2014 from './data/StackOverflowData/2014 Stack Overflow Survey Responses.csv';
// TODO use data in charting
import { processedSurveyData } from './data/processedSurveyData'


function App() {
  useEffect(() => {
    let dataSets = {
      '2020': data2020,
      '2019': data2019,
      '2018': data2018,
      '2017': data2017,
      '2016': data2016,
      '2015': data2015,
      '2014': data2014
    }
    let processedData = {}
    for (let year in dataSets) {
      extractYearlyData(year, dataSets[year]).then((rawData) => {
        processedData[year] = generateProcessedData(rawData)
        console.log(processedData)
      })
    }
  });

  const extractYearlyData = async (year, dataFile) => {
    return new Promise(resolve => {
      Papa.parse(dataFile, {
        download: true,
        header: true,
        complete: function(results) {
          resolve(results.data)
        }
      });
    })
  }

  return (
    <div className="App">
      <FileProcessor></FileProcessor>
    </div>
  );
}

export default App;