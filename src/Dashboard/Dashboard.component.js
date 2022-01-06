import React, { Component } from 'react';


class Dashboard extends Component {
    render() {
        const url = this.props.match.url;
        return (
            <div>
                Dashboard
            </div>
        );
    }
}

export default Dashboard;