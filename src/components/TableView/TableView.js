'use strict';

import React from 'react';
import Table from '../Table/Table';

require('./TableView.scss');

class TableView extends React.Component {
    // static propTypes = {
    //     data: React.PropTypes.object.isRequired,
    //     format: React.PropTypes.func.isRequired,
    //     className: React.PropTypes.string.isRequired
    // };
    constructor(props) {
        super(props);
        this.init(props);
    }

    init(props) {
        props.format(props.data);
        this.cols = Object.keys(props.data.reduce(function(result, obj) { return Object.assign(result, obj); }, {}));
    }

    componentWillReceiveProps(nextProps) {
      if (Object.keys(this.props.data[0]).length != Object.keys(nextProps.data).length) {
        this.init(nextProps);
      }
    }

    render() {
        return (
            <div>
                <Table data={this.props.data} cols={this.cols} />
            </div>
        )
    }
};

export default TableView;
