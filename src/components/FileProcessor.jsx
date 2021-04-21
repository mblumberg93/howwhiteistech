import React, { Component } from 'react'
import { CSVReader } from 'react-papaparse'
const buttonRef = React.createRef()

export default class FileProcessor extends Component{
    handleOpenDialog = (e) => {
        if (buttonRef.current) {
          buttonRef.current.open(e)
        }
    }
      
    handleOnFileLoad = (data) => {
        let rawData = data.map(x => x.data)
        rawData = rawData.filter(x => x.Country === "United States")
        let ethnicities = this.extractData(rawData, "Ethnicity")
        let ethnicities2 = this.extractData(rawData, "RaceEthnicity")
        let ethnicities3 = this.extractData(rawData, "Race")
        if (Object.keys(ethnicities).length === 0) {
            ethnicities = ethnicities2
        }
        if (Object.keys(ethnicities).length === 0) {
            ethnicities = ethnicities3
        }
        let genders = this.extractData(rawData, "Gender")
        let json = { ethnicities: ethnicities, genders: genders }
        let blob = new Blob([JSON.stringify(json)], {type: 'application/json'});
        let csvURL = window.URL.createObjectURL(blob);
        let tempLink = document.createElement('a');
        tempLink.href = csvURL;
        tempLink.setAttribute('download', '2020_data.json');
        tempLink.click();
    }

    extractData = (rawData, dataKey) => {
        let filtered = rawData.filter(x => !(["NA", "I don’t know", "I prefer not to say"].includes(x[dataKey])))
        let total = filtered.length
        let reducer = (result, response) => {
          if (!response[dataKey]) {
            return result
          }
          let types = response[dataKey].split(";")
          types.forEach((type) => {
            type = type.trim()
            if (["Transgender", "Gender non-conforming", "Other", "Transgender"].includes(type)) {
                type = "Non-binary, genderqueer, or gender non-conforming"
            }
            if (["NA", "I don’t know", "I prefer not to say"].includes(type)) {
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
    
    handleOnError = (err, file, inputElem, reason) => {
        console.log(err)
    }
    
    handleOnRemoveFile = (data) => {
        console.log(data)
    }
    
    handleRemoveFile = (e) => {
        // Note that the ref is set async, so it might be null at some point
        if (buttonRef.current) {
          buttonRef.current.removeFile(e)
        }
    }
    
    render() {
        return (
            <CSVReader ref={buttonRef}
                       onFileLoad={this.handleOnFileLoad}
                       onError={this.handleOnError}
                       noClick
                       noDrag
                       onRemoveFile={this.handleOnRemoveFile}
                       config={{ header: true }}>
                {({ file }) => (
                    <aside style={{ display: 'flex', flexDirection: 'row', marginBottom: 10 }}>
                        <button type='button'
                                onClick={this.handleOpenDialog}
                                style={{ borderRadius: 0, marginLeft: 0, marginRight: 0, width: '40%', paddingLeft: 0, paddingRight: 0 }} >
                            Browse files
                        </button>
                        <div style={{ borderWidth: 1, borderStyle: 'solid', borderColor: '#ccc', height: 45, lineHeight: 2.5,
                                      marginTop: 5, marginBottom: 5, paddingLeft: 13, paddingTop: 3, width: '60%' }}>
                            {file && file.name}
                        </div>
                        <button style={{ borderRadius: 0, marginLeft: 0, marginRight: 0, paddingLeft: 20, paddingRight: 20 }}
                                onClick={this.handleRemoveFile}>
                            Remove
                        </button>
                    </aside>
                )}
            </CSVReader>
        )
    }
}