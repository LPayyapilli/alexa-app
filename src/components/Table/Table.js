import React from 'react';
require('./Table.scss');

class Table extends React.Component {
    // static propTypes = {
    //     data: React.PropTypes.object.isRequired,
    //     cols: React.PropTypes.array.isRequired,
    //     className: React.PropTypes.string.isRequired
    // };
    render() {
        let tableHeader = [];
        this.props.cols.forEach(function(col, i) {
            tableHeader.push(<th key={Math.random() * 1000}>{col}</th>)
        });

        let table = _.map(this.props.data, function(obj, i) {
            let rows = [];

            for (let key in obj) {
                rows.push(<td key={Math.random() * 1000}>{obj[key]}</td>);
            }

            return (<tr key={Math.random() * 1000}>{rows}</tr>)
        });

        return (
            <div className="table-component">
                <table className="table">
                    <thead>
                        <tr>{tableHeader}</tr>
                    </thead>
                    <tbody>
                        {table}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Table;
