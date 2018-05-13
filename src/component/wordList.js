import React, {Component} from 'react';
let $ = window.$;
class WordList extends Component {
  constructor(props) {
    super(props);
    this.word='';
    this.keyStrokeWord = this.keyStrokeWord.bind(this);
    this.state = {
      wordIndex: 0,
      x: [],
      data: []
    };
  }
  componentDidUpdate = () => {
    if (this.state.data.length === 0) {
      let x = this.pushX(this.props.data[this.state.wordIndex]);
      this.setState({x: x, data: this.props.data});
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.keyStrokeWord, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.keyStrokeWord, false);
  }
  nextWord = () => {
    $('#collapsible-normal').collapsible('close', 0);
    let i = this.state.wordIndex + 1;
    if (i < this.state.data.length) {
      let x = this.pushX(this.props.data[i]);
      this.setState({x: x, wordIndex: i});
    }
  }
  previousWord = () => {
    $('#collapsible-normal').collapsible('close', 0);
    if (this.state.wordIndex > 0) {
      let i = this.state.wordIndex - 1;
      let x = this.pushX(this.props.data[i]);
      this.setState({x: x, wordIndex: i});
    }
  }
  pushX = (word) => {
    let x = [];
    this.word=word;
    let words = JSON.parse(localStorage.getItem("words"));
    if (words === null) {
      $('#data').css('color', 'black');
    } else {
      if (words.indexOf(word)!==-1) {
        $('#data').css('color', 'red');
      } else {
        $('#data').css('color', 'black');
      }
    }
    word = word.split(":");
    x.push(<ul key={1} id="collapsible-normal" className="collapsible">
      <li>
        <div id="data" className="collapsible-header">{word[0]}</div>
        <div className="collapsible-body">
          <span>{word[1]}</span>
        </div>
      </li>
    </ul>)
    return x;
  }

  keyStrokeWord = (event) => {
    if (event.keyCode === 39) {
      this.nextWord();
    } else if (event.keyCode === 37) {
      this.previousWord();
    } else if (event.keyCode === 32) {
      $('#collapsible-normal').collapsible('open', 0);
    } else if (event.keyCode === 38 || event.keyCode === 40) {
      this.importantWord();
    }
  }
  
  importantWord = () => {
    let words = JSON.parse(localStorage.getItem("words"));
    if (words === null) {
      let arr = [];
      arr.push(this.word);
      $('#data').css('color', 'red');
      localStorage.setItem("words", JSON.stringify(arr));
    } else {
      if (words.indexOf(this.word)!==-1) {
        let i = words.indexOf(this.word);
        words.splice(i, 1);
        $('#data').css('color', 'black');
        localStorage.setItem("words", JSON.stringify(words));
      } else {
        words.push(this.word);
        $('#data').css('color', 'red');
        localStorage.setItem("words", JSON.stringify(words));
      }
    }
  }
  render = () => {
    let left = {
      'float': 'left'
    };
    let center = {
      'textAlign': 'center'
    };
    let right = {
      'float': 'right'
    };
    let icon={
      'marginTop': '21px'
    }
    return (<div className="container">
      <div style={center}>{this.state.wordIndex}/{this.state.data.length - 1}</div>
      <div className="row">
        <div className="col s1">
          <i className="material-icons" style={icon} onClick={this.importantWord}>star rate</i>
        </div>
        <div className="col s11">{this.state.x}</div>
      </div>
      <div className="row">
        <div style={left}>
          <a className="waves-effect waves-light btn" onClick={this.previousWord}>
            <i className="material-icons left">reply</i>button</a>
        </div>
        <div style={right}>
          <a className="waves-effect waves-light btn" onClick={this.nextWord}>
            <i className="material-icons left">forward</i>button</a>
        </div>
      </div>
    </div>)
  }
}
export default WordList;