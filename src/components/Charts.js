import React, { Component } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Scatter,
    ScatterChart,
    Tooltip,
    XAxis,
    YAxis,
    ZAxis
} from 'recharts';
import { convertDate, parseDomain } from '../helpers';

import './Charts.css';

const chartWidth = 1000;
const chartHeight = 500;
const purple = "#8884d8";
const green = "#82ca9d";

export function CodeFrequencyChart(props) {
    const data = props.data.map(item => {
        return {
            date: convertDate(item[0]),
            added: item[1],
            deleted: item[2]
        }
    });
    return (
        <BarChart width={chartWidth} height={chartHeight} data={data}>
            <XAxis dataKey="date"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Bar dataKey="added" fill={purple} />
            <Bar dataKey="deleted" fill={green} />
        </BarChart>
    );
}
export function CommitActivityChart(props) {
    const data = props.data.map(item => {
        return {
            date: convertDate(item.week),
            activity: item.total
        }
    });
    return (
        <LineChart width={chartWidth} height={chartHeight} data={data}>
            <Line type="monotone" dataKey="activity" stroke={purple} />
            <CartesianGrid />
            <Tooltip />
            <XAxis dataKey="date" />
            <YAxis />
        </LineChart>
    );
}
export function PunchCardChart(props) {
    const weekMap = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday'
    };
    const data = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: []
    };
    const chartRows = [];

    for (const item of props.data) {
        const day = item[0];
        data[day].push({
            index: 1,
            hour: item[1],
            commits: item[2]
        });
    }
    for (const row in data) {
        if (data.hasOwnProperty(row)) {
            chartRows.push(

                <PunchCardRow
                    key={weekMap[row]}
                    day={weekMap[row]}
                    data={data[row]}
                    domain={parseDomain(data)}
                />
            )
        }
    }
    return <div>{chartRows}</div>
}
class PunchCardRow extends Component {
    constructor(props) {
        super(props);
        this.range = [10, 200];
    }
    renderTooltip(props) {
        const { active, payload } = props;

        if (active && payload && payload.length) {
            const data = payload[0].payload;

            return (
                <div className="punchRow">
                    <p><span>Hour: </span>{data.hour}</p>
                    <p><span>Commits: </span>{data.commits}</p>
                </div>
            );
        }
        return null;
    }
    render() {
        return (
            <ScatterChart
                width={chartWidth}
                height={chartHeight / 7}
                margin={{top: 10, right: 0, bottom: 0, left: 0}}>
                <XAxis
                    type="category"
                    dataKey="hour"
                    interval={0}
                    tick={{ fontSize: 0 }}
                    tickLine={{ transform: 'translate(0, -6)' }} />
                <YAxis
                    type="number"
                    dataKey="index"
                    name={this.props.day}
                    height={10}
                    width={80}
                    tick={false}
                    tickLine={false}
                    axisLine={false}
                    label={{ value: this.props.day, position: 'insideRight' }}/>
                <ZAxis
                    type="number"
                    dataKey="commits"
                    domain={this.props.domain}
                    range={this.range}/>
                <Tooltip
                    wrapperStyle={{ zIndex: 100 }}
                    content={this.renderTooltip}/>
                <Scatter
                    data={this.props.data}
                    fill={purple}/>
            </ScatterChart>
        )
    }
}