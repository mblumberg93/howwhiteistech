import { CSVDownloader } from "react-papaparse"

const TYPES_MAP = {
    "Transgender": "Non-binary, genderqueer, or gender non-conforming",
    "Gender non-conforming": "Non-binary, genderqueer, or gender non-conforming",
    "Other": "Non-binary, genderqueer, or gender non-conforming",
    "Prefer not to disclose": null,
    "NA": null, 
    "I don’t know": null, 
    "I prefer not to say": null
}

export const extractData = (rawData, dataKey) => {
    let filtered = rawData.filter(x => !(["NA", "I don’t know", "I prefer not to say"].includes(x[dataKey])))
    let total = filtered.length
    let reducer = (result, response) => {
      if (!response[dataKey]) {
        return result
      }
      let types = response[dataKey].split(";")
      types = mapTypes(types)
      types.forEach((type) => {
        if (["NA", "I don’t know", "I prefer not to say", "Prefer not to disclose"].includes(type)) {
            return result
        }
        result[type] = (result[type] || 0) + 1
      })
      return result
    }
    let extracted = filtered.reduce(reducer, {})
    for (var key in extracted) {
      extracted[key] = (extracted[key] / total).toFixed(2)
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

export const generateProcessedData = (data) => {
    let rawData = data.filter(x => x.Country === "United States" || x.country == "United States" ||
                                   x["What Country do you live in?"] == "United States")
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
    return { ethnicities: ethnicities, genders: genders }
}