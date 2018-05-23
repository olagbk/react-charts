import React, { Component } from 'react';
import { CodeFrequencyChart, CommitActivityChart, PunchCardChart } from './Charts';
import { fetchData } from '../services/Github';

import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.repo = {
            user: 'olagbk',
            name: 'gnomon'
        };
        this.handleNavigation = this.handleNavigation.bind(this);
    }
    componentDidMount() {
        fetchData(this.repo.user, this.repo.name)
            .then(response => this.setState(response));
    }
    handleNavigation(chartID) {
        this.setState({
            chartID: chartID
        });
    }
    render(){
        return this.state &&
            <div>
                <h1>Stats for {this.repo.user}/{this.repo.name}</h1>
                <Navigation onChange={this.handleNavigation} />
                <Chart data={this.state} />
            </div>;
    }
}

class Chart extends Component {
    render() {
        switch (this.props.data.chartID) {
            case 'punch_card':
                return <PunchCardChart data={this.props.data.punchCard}/>;
            case 'code_frequency':
                return <CodeFrequencyChart data={this.props.data.codeFrequency}/>;
            default:
                return <CommitActivityChart data={this.props.data.commitActivity}/>;
        }
    }
}

class Navigation extends Component {
    handleButtonClick(chartID) {
        this.props.onChange(chartID);
    }
    render() {
        return (
            <div className="buttons">
                <button onClick={() => {this.handleButtonClick('commit_activity')}}>Commit Activity</button>
                <button onClick={() => {this.handleButtonClick('code_frequency')}}>Code Frequency</button>
                <button onClick={() => {this.handleButtonClick('punch_card')}}>Punch Card</button>
            </div>
    )
    }
}
export default App;