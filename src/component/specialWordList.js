import React, {Component} from 'react';
var $ = window.$;
class SpecialList extends Component {
  constructor(props) {
    super(props);
    this.word = '';
    this.specialData=[];
    this.keyStroke = this.keyStroke.bind(this);
    this.state = {
      index: 0,
      x: []
    };
  }
  componentDidMount() {
    var words = JSON.parse(localStorage.getItem("words"));
    this.count = 0
    if (words !== null) {
      this.specialData=words;
      var x = this.pushX(words[this.state.index]);
      this.setState({x: x});
    } else {
      var x = [];
      x.push(<div className="container">
        <h4>Nothing So Far</h4>
      </div>)
      this.setState({x: x});
    }
    document.addEventListener("keydown", this.keyStroke, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyStroke, false);
  }
  next = () => {
    $('.collapsible').collapsible('close', 0);
    var i = this.state.index + 1;
    if (i < this.specialData.length) {
      var x = this.pushX(this.specialData[i]);
      this.setState({x: x, index: i});
    }
  }
  previous = () => {
    $('.collapsible').collapsible('close', 0);
    if (this.state.index > 0) {
      var i = this.state.index - 1;
      var x = this.pushX(this.specialData[i]);
      this.setState({x: x, index: i});
    }
  }
  pushX = (word) => {
    var x = [];
    var left = {
      'float': 'left'
    };
    var center = {
      'textAlign': 'center'
    };
    var right = {
      'float': 'right'
    };
    var icon = {
      'marginTop': '21px'
    };
    this.word = word;
    var words = localStorage.getItem("words");
    words = JSON.parse(words)
    if (words === null) {
      $('.collapsible-header').css('color', 'red');
    } else {
      if (words.indexOf(word) !== -1) {
        $('.collapsible-header').css('color', 'black');
      } else {
        $('.collapsible-header').css('color', 'red');
      }
    }
    word = word.split(":");
    x.push(<div  key="1" className="container">
      <div style={center}>{this.state.index}/{this.specialData.length-1}</div>
      <div className="row">
        <div className="col s1">
          <i className="material-icons" style={icon} onClick={this.important}>star rate</i>
        </div>
        <div className="col s11">
          <ul className="collapsible">
            <li>
              <div className="collapsible-header">{word[0]}</div>
              <div className="collapsible-body">
                <span>{word[1]}</span>
              </div>
            </li>
          </ul>
        </div>
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
      $('.collapsible-header').css('color', 'black');
      localStorage.setItem("words", JSON.stringify(arr));
    } else {
      if (words.indexOf(this.word) !== -1) {
        var i = words.indexOf(this.word);
        words.splice(i, 1);
        $('.collapsible-header').css('color', 'red');
        localStorage.setItem("words", JSON.stringify(words));
      } else {
        words.push(this.word);
        $('.collapsible-header').css('color', 'black');
        localStorage.setItem("words", JSON.stringify(words));
      }
    }
  }
  render = () => {
    return (this.state.x)
  }
}
export default SpecialList;
