import React, {Component} from 'react';
var $ = window.$;
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.keyStroke = this.keyStroke.bind(this);
    this.state = {
      index: 0,
      x: [],
      data: []
    };
  }
  componentDidUpdate = () => {
    var x = [];
    if (this.state.data.length === 0) {
      let word = this.props.data[this.state.index];
      word = word.split(":");
      x.push(<ul key="1" className="collapsible">
        <li>
          <div className="collapsible-header">
            <i className="material-icons">done</i>{word[0]}</div>
          <div className="collapsible-body">
            <span>{word[1]}</span>
          </div>
        </li>
      </ul>)
      this.setState({x: x, data: this.props.data});
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.keyStroke, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyStroke, false);
  }
  next = () => {
    $('.collapsible').collapsible('close', 0);
    var x = [];
    var i = this.state.index + 1;
    if (i < this.state.data.length) {
      let word = this.props.data[i];
      word = word.split(":");
      x.push(<ul key="1" className="collapsible">
        <li>
          <div className="collapsible-header">
            <i className="material-icons">done</i>{word[0]}</div>
          <div className="collapsible-body">
            <span>{word[1]}</span>
          </div>
        </li>
      </ul>)
      this.setState({x: x, index: i});
    }
  }
  previous = () => {
    $('.collapsible').collapsible('close', 0);
    var x = [];
    if (this.state.index > 0) {
      var i = this.state.index - 1;
      let word = this.props.data[i];
      word = word.split(":");
      x.push(<ul key="1" className="collapsible">
        <li>
          <div className="collapsible-header">
            <i className="material-icons">done</i>{word[0]}</div>
          <div className="collapsible-body">
            <span>{word[1]}</span>
          </div>
        </li>
      </ul>)
      this.setState({x: x, index: i});
    }
  }
  keyStroke = (event) => {
    if (event.keyCode === 39) {
      this.next();
    } else if (event.keyCode === 37) {
      this.previous();
    } else if (event.keyCode === 32) {
      $('.collapsible').collapsible('open', 0);
    }
  }
  render = () => {
    var left = {
      'float': 'left'
    };
    var center = {
      'textAlign': 'center'
    };
    var right = {
      'float': 'right'
    };
    return (<div className="container">
      <div style={center}>{this.state.index}/{this.state.data.length-1}</div>
      {this.state.x}
      <div className="row">
        <div style={left}>
          <a className="waves-effect waves-light btn" onClick={this.previous}>
            <i className="material-icons left">reply</i>button</a>
        </div>
        <div style={right}>
          <a className="waves-effect waves-light btn" onClick={this.next}>
            <i className="material-icons left">forward</i>button</a>
        </div>
      </div>
    </div>)
  }
}
export default Dashboard;
