import Papa from 'papaparse'
import { DATA_SETS } from './data/dataSets'

const IGNORE_RESPONSES = ["NA", "I don’t know", "I prefer not to say", "Prefer not to disclose", "Biracial", "Multiracial"]

const TYPES_MAP = {
    "Transgender": "Non-binary, genderqueer, or gender non-conforming",
    "Gender non-conforming": "Non-binary, genderqueer, or gender non-conforming",
    "Other": "Non-binary, genderqueer, or gender non-conforming",
    "Prefer not to disclose": null,
    "NA": null, 
    "I don’t know": null, 
    "I prefer not to say": null,
    "Biracial": null,
    "Multiracial": null,
    "Hispanic or Latino/a/x": "Hispanic or Latino/Latina",
    "Indigenous (such as Native American, Pacific Islander, or Indigenous Australian)": "Native American, Pacific Islander, or Indigenous Australian",
    "Southeast Asian": "South or Southeast Asian",
    "South Asian": "South or Southeast Asian",
    "Man": "Male",
    "Woman": "Female"
}

export const extractData = (rawData, dataKey) => {
    let filtered = rawData.filter(x => includeResponse(x[dataKey]))
    let total = filtered.length
    let reducer = (result, response) => {
      if (!response[dataKey]) {
        return result
      }
      let types = response[dataKey].split(";")
      types = mapTypes(types)
      types.forEach((type) => {
        if (IGNORE_RESPONSES.includes(type)) {
            return result
        }
        result[type] = (result[type] || 0) + 1
      })
      return result
    }
    let extracted = filtered.reduce(reducer, {})
    for (var key in extracted) {
      extracted[key] = ((extracted[key] / total) * 100).toFixed(2)
    }
    return extracted
}

const mapTypes = (types) => {
    let newTypes = [...types]
    newTypes = newTypes.map(type => type.trim())
    newTypes = newTypes.map(t => mapType(t))
    newTypes = newTypes.filter(nt => nt != null)
    return [...new Set(newTypes)]
}

const mapType = (type) => {
    if (Object.keys(TYPES_MAP).includes(type)) {
        return TYPES_MAP[type]
    }
    return type
}

const includeResponse = (response) => {
    if (response) {
        return !(IGNORE_RESPONSES.includes(response.trim()))
    }
    return false
}

const generateProcessedData = (year, data) => {
    let rawData = data.filter(x => x.Country === "United States" || x.country === "United States" ||
                                   x["What Country do you live in?"] === "United States")
    let ethnicities = extractData(rawData, "Ethnicity")
    let ethnicities2 = extractData(rawData, "RaceEthnicity")
    let ethnicities3 = extractData(rawData, "Race")
    if (Object.keys(ethnicities).length === 0) {
        ethnicities = ethnicities2
    }
    if (Object.keys(ethnicities).length === 0) {
        ethnicities = ethnicities3
    }
    let genders = extractData(rawData, "Gender")
    let genders2 = extractData(rawData, "gender")
    let genders3 = extractData(rawData, "What is your gender?")
    if (Object.keys(genders).length === 0) {
        genders = genders2
    }
    if (Object.keys(genders).length === 0) {
        genders = genders3
    }
    if (Object.keys(ethnicities).length) {
        ethnicities["year"] = year
    } else {
        ethnicities = null
    }
    if (Object.keys(genders).length) {
        genders["year"] = year
    } else {
        genders = null
    }
    return { ethnicities: ethnicities, genders: genders }
}

const exportFile = (data) => {
    let blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
    let csvURL = window.URL.createObjectURL(blob);
    let tempLink = document.createElement('a');
    tempLink.href = csvURL;
    tempLink.setAttribute('download', 'data.json');
    tempLink.click();
}

export const buildData = () => {
    let processedData = []
    for (let year in DATA_SETS) {
      extractYearlyData(DATA_SETS[year]).then((rawData) => {
        processedData.push(generateProcessedData(year, rawData))
        if (processedData.length === Object.keys(DATA_SETS).length) {
          chartData(processedData)
        }
      })
    }
}

const extractYearlyData = async (dataFile) => {
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

const chartData = (dataPoints) => {
    let ethnicitiesDataPoints = []
    let gendersDataPoints = []
    dataPoints.forEach((dataPoint) => {
      if (dataPoint.ethnicities) {
        ethnicitiesDataPoints.push(dataPoint.ethnicities)
      }
      if (dataPoint.genders) {
        gendersDataPoints.push(dataPoint.genders)
      }
    })
    ethnicitiesDataPoints.sort(compareYears)
    gendersDataPoints.sort(compareYears)
    let chartData = { 
      ethnicities: ethnicitiesDataPoints,
      genders: gendersDataPoints
    }
    return chartData
}

const compareYears = (a, b) => {
    if ( a.year < b.year ){
      return -1;
    }
    if ( a.year > b.year ){
      return 1;
    }
    return 0;
}