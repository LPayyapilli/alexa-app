import React from 'react';
import ReactDOM from 'react-dom';
import Pagination from "react-js-pagination";
import TableView from './components/TableView/TableView';
import request from 'superagent';
const csvFilePath = require("../alexaSites.csv");
require('./controller.scss');
const baseUrl = "/v1/www.";

class EntryPoint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      data: csvFilePath,
      activeData: []
    };
  }

  componentWillMount() {
    this.handleRequests(this.state.data.slice(this.state.activePage * 10 - 10, this.state.activePage * 10));
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.activePage != this.state.activePage) {
      this.handleRequests(nextState.data.slice(nextState.activePage * 10 - 10, nextState.activePage * 10));
    }
  }

  handlePageChange = (pageNumber) => {
    this.setState({activePage: pageNumber});
  }

  handleRequests = (data) => {
    let promises = [];
    data.forEach(function(obj) {
      promises.push(new Promise(function(resolve, reject) {
        request.get(baseUrl + obj.URL)
        .withCredentials()
        .timeout({deadline: 3000})
        .end(function(err, res) {
          if (err && err.timeout) {
            //console.log('timed out');
            obj['ICON'] = 'fail';
            obj['STATUS'] = 'failed'
            reject('Fail');
          } else if (res) {
            obj['ICON'] = 'success';
            obj['STATUS'] = 'succeeded'
            resolve('success');
            //console.log(res);
          } else {
            obj['ICON'] = 'spinner';
            obj['STATUS'] = 'pending';
            //console.log(err);
          }
        })
      }));
    });
    Promise.all(promises).then(res => {
        return this.setState({activeData: data});
      }).catch(err => {
        throw err;
      });
  }

  format = (data) => {
    data.forEach(function(obj) {
      if (obj.STATUS == 'succeeded') {
        obj['ICON'] = (<i className="fa fa-smile-o"></i>);
        obj['URL'] = (<a href={'https://www.' + obj.URL}>{obj.URL}</a>);
      } else if (obj.STATUS == 'failed') {
        obj['ICON'] = (<i className="fa fa-frown-o"></i>);
      } else if (obj.STATUS == 'pending') {
        obj['ICON'] = (<i className="fa fa-spinner"></i>);
      }
    })
  }

  render() {
    if (this.state.activeData.length > 0) {
      return (
        <div className="controller">
          <TableView
            data={this.state.activeData}
            format={this.format}
            />
          <Pagination
            hideNavigation
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={100}
            pageRangeDisplayed={10}
            onChange={this.handlePageChange}
          />
        </div>

      );
    } else {
      return (<div>loading</div>);
    }

  }
}

ReactDOM.render(<EntryPoint/>, document.getElementById('app'));
