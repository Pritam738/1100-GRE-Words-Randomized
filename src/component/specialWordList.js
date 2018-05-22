import React, {Component} from 'react';
let $ = window.$;
class SpecialList extends Component {
  constructor(props) {
    super(props);
    this.specialWord = '';
    this.specialData=[];
    this.keyStroke = this.keyStroke.bind(this);
    this.state = {
      index: 0,
      x: []
    };
  }
  componentDidMount() {
    let words = JSON.parse(localStorage.getItem("words"));
    let x = [];
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
    let i = Math.floor((Math.random() * this.specialData.length-1) + 1);
    if (i < this.specialData.length) {
      let x = this.pushSpecial(this.specialData[i]);
      this.setState({x: x, index: i});
    }
  }
  pushSpecial = (word) => {
    let x = [],style={color:"red"};
    this.specialWord = word;
    word = word.split(":");
    let words = JSON.parse(localStorage.getItem("words"));
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
    }else if (event.keyCode === 32) {
      $('#collapsible-special').collapsible('open', 0);
    } else if (event.keyCode === 34) {
      this.important();
    }
  }
  important = () => {
    let words = JSON.parse(localStorage.getItem("words"));
    let x = [];
        let i = words.indexOf(this.specialWord);
		console.log("Word to be spliced "+ words[i] + "\n");
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
		console.log("Total length :" + this.specialData.length + "\n");
  }
  render = () => {
    let left = {
      'float': 'left'
    };
    let center = {
      'textAlign': 'center'
    };
    let right = {
      'margin-left': '50%'
    };
    let icon = {
      'marginTop': '21px'
    };
    return (<div className="container">
        <div style={center}>{this.specialData.length}</div>
        <div className="row">
          <div className="col s1">
            <i className="material-icons" style={icon} onClick={this.important}>star rate</i>
          </div>
          <div className="col s11">
          {this.state.x}
          </div>
        </div>
          <div style={right}>
            <a className="waves-effect waves-light btn" onClick={this.next}>
              <i className="material-icons left">forward</i>button</a>
          </div>
      </div>)
  }
}
export default SpecialList;