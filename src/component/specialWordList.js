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
    var x = [];
    if (words !== null && words.length !== 0) {
      this.specialData=words;
      x = this.pushSpecial(words[this.state.index]);
    } else {
      x.push(<div key='1' className="container">
        <h4>You havent selected any special words. Please go to the main word list to select your special words.</h4>
      </div>)
    }
      this.setState({x: x});
    document.addEventListener("keydown", this.keyStroke, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyStroke, false);
  }
  next = () => {
    $('#collapsible-special').collapsible('close', 0);
    var i = this.state.index + 1;
    if (i < this.specialData.length) {
      var x = this.pushSpecial(this.specialData[i]);
      this.setState({x: x, index: i});
    }
  }
  previous = () => {
    $('#collapsible-special').collapsible('close', 0);
    if (this.state.index > 0) {
      var i = this.state.index - 1;
      var x = this.pushSpecial(this.specialData[i]);
      this.setState({x: x, index: i});
    }
  }
  pushSpecial = (word) => {
    var x = [],style={color:"red"};
    this.word = word;
    word = word.split(":");
    var words = JSON.parse(localStorage.getItem("words"));
    if (words.indexOf(word)!==-1) {
      $('#specialData').css('color', 'black');
    } else {
      $('#specialData').css('color', 'red');
    }
    x.push(<ul  key="1" id="collapsible-special" className="collapsible">
      <li>
        <div id="specialData" style={style} className="collapsible-header">{word[0]}</div>
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
      $('#collapsible-special').collapsible('open', 0);
    } else if (event.keyCode === 38 || event.keyCode === 40) {
      this.important();
    }
  }
  important = () => {
    var words = JSON.parse(localStorage.getItem("words"));
    var x = [];
        var i = words.indexOf(this.word);
        words.splice(i, 1);
        this.specialData=words;
        localStorage.setItem("words", JSON.stringify(words));
        if (words.length === 0) {
          x.push(<div key='1' className="container">
          <h4>You havent selected any special words. Please go to the main word list to select your special words.</h4>
          </div>)
        }else{
          x = this.pushSpecial(words[this.state.index]);
        }
        this.setState({x: x});
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
    var icon = {
      'marginTop': '21px'
    };
    return (<div className="container">
        <div style={center}>{this.state.index}/{this.specialData.length-1}</div>
        <div className="row">
          <div className="col s1">
            <i className="material-icons" style={icon} onClick={this.important}>star rate</i>
          </div>
          <div className="col s11">
          {this.state.x}
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
  }
}
export default SpecialList;
