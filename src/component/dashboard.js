import React, {Component} from 'react';
var $ = window.$;
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      head: '',
      index: 0,
      body: '',
      data: []
    };
  }
  componentDidUpdate = () => {
    if (this.state.data.length == 0) {
      let word = this.props.data[this.state.index];
      word = word.split(":");
      this.setState({head: word[0], body: word[1], data: this.props.data});
    }
  }
  next = () => {
    var i = this.state.index + 1;
    let word = this.props.data[i];
    console.log(word)
    word = word.split(":");
    this.setState({head: word[0], body: word[1], index: i});
  }
  previous = () => {
    if (this.state.index > 0) {
      var i = this.state.index - 1;
      let word = this.props.data[i];
      console.log(word)
      word = word.split(":");
      this.setState({head: word[0], body: word[1], index: i});
    }
  }
  render = () => {
    var left={
      'float':'left'
    };
    var right={'float':'right'};
    return (<div className="container">
      <ul className="collapsible">
        <li>
          <div className="collapsible-header">
            <i className="material-icons">done</i>{this.state.head}</div>
          <div className="collapsible-body">
            <span>{this.state.body}</span>
          </div>
        </li>
      </ul>
      <div className="row">
        <div  style={left}>
          <a className="waves-effect waves-light btn" onClick={this.previous}>
            <i className="material-icons left">reply</i>button</a>
        </div>
        <div   style={right}>
          <a className="waves-effect waves-light btn" onClick={this.next}>
            <i className="material-icons left">forward</i>button</a>
        </div>
      </div>
    </div>)
  }
}
export default Dashboard;
