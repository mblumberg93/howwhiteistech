import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  
  export default class Charts extends PureComponent {
    static demoUrl = 'https://codesandbox.io/s/simple-bar-chart-tpz8r';
  
    render() {
      return (
          <>
            <h2 className="chart-title">How White Is Tech?</h2>
            <div className="chart-container">
                <ResponsiveContainer>
                    <BarChart data={this.props.data.ethnicities}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5 }}>
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="White or of European descent" fill="#EE8434" />
                        <Bar dataKey="Hispanic or Latino/Latina" fill="#9A9961" />
                        <Bar dataKey="South or Southeast Asian" fill="#AE8799" />
                        <Bar dataKey="East Asian" fill="#496DDB" />
                        <Bar dataKey="Black or of African descent" fill="#717EC3" />
                        <Bar dataKey="Native American, Pacific Islander, or Indigenous Australian" fill="#C95D63" />
                        <Bar dataKey="Middle Eastern" fill="#C0BF47" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <p>
                Percentage of annual StackOverflow Survey respondents in the US who identify as each ethnicity.<br></br>
                <small>Note: respondents could identify as more than one ethnicity.</small>
            </p>
            <h2 className="chart-title">How Masculine Is Tech?</h2>
            <div className="chart-container">
                <ResponsiveContainer>
                    <BarChart data={this.props.data.genders}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5 }}>
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Male" fill="#1D7874" />
                        <Bar dataKey="Female" fill="#F4C095" />
                        <Bar dataKey="Non-binary, genderqueer, or gender non-conforming" fill="#EE2E31" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <p>
                Percentage of annual StackOverflow Survey respondents in the US who identify as each gender.<br></br>
                <small>Note: respondents could identify as more than one gender.</small>
            </p>
        </>
      );
    }
  }