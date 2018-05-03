import React, {Component} from 'react';
import Dashboard from './component/dashboard';
import Data from './data/data.json';
import Data1 from './data/data1.json';
import Data2 from './data/data2.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  arrayMerge = () => {
    var superArray = [];
    superArray = Data.concat(Data1).concat(Data2);
    return superArray;
  }
  componentDidMount = () => {
    var array = this.arrayMerge();
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    this.setState({data: array});
  }
  render() {
    var hStyle = {
      'text-align': 'center'
    };
    return (<div className="App">
      <header className="App-header">
        <h1  style={hStyle}>GRE WORD PRACTICE</h1>
        <h4  style={hStyle}>Best Of Luck</h4>
      </header>
      <Dashboard data={this.state.data}/>
    </div>);
  }
}

export default App;
