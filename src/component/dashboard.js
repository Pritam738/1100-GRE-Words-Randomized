import React, {Component} from 'react';
var $ = window.$;
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.word='';
    this.keyStroke = this.keyStroke.bind(this);
    this.state = {
      index: 0,
      x: [],
      data: []
    };
  }
  componentDidUpdate = () => {
    if (this.state.data.length === 0) {
      var x = this.pushX(this.props.data[this.state.index]);
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
    var i = this.state.index + 1;
    if (i < this.state.data.length) {
      var x = this.pushX(this.props.data[i]);
      this.setState({x: x, index: i});
    }
  }
  previous = () => {
    $('.collapsible').collapsible('close', 0);
    if (this.state.index > 0) {
      var i = this.state.index - 1;
      var x = this.pushX(this.props.data[i]);
      this.setState({x: x, index: i});
    }
  }
  pushX = (word) => {
    var x = [],style;
    this.word=word;
    var words = localStorage.getItem("words");
    words=JSON.parse(words)
    if (words === null) {
      $('.collapsible-header').css('color', 'black');
    } else {
      if (words.indexOf(word)!==-1) {
        $('.collapsible-header').css('color', 'red');
      } else {
        $('.collapsible-header').css('color', 'black');
      }
    }
    word = word.split(":");
    x.push(<ul key="1" className="collapsible">
      <li>
        <div className="collapsible-header">{word[0]}</div>
        <div className="collapsible-body">
          <span>{word[1]}</span>
        </div>
      </li>
    </ul>)
    return x;
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
  important = () => {
    var words = JSON.parse(localStorage.getItem("words"));
    if (words === null) {
      var arr = [];
      arr.push(this.word);
      $('.collapsible-header').css('color', 'red');
      localStorage.setItem("words", JSON.stringify(arr));
    } else {
      if (words.indexOf(this.word)!==-1) {
        var i = words.indexOf(this.word);
        words.splice(i, 1);
        $('.collapsible-header').css('color', 'black');
        localStorage.setItem("words", JSON.stringify(words));
      } else {
        words.push(this.word);
        $('.collapsible-header').css('color', 'red');
        localStorage.setItem("words", JSON.stringify(words));
      }
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
      <div style={center}>{this.state.index}/{this.state.data.length - 1}</div>
      <div className="row">
        <div className="col s1">
          <i className="material-icons" onClick={this.important}>star rate</i>
        </div>
        <div className="col s11">{this.state.x}</div>
      </div>
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
