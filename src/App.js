import React, {Component} from 'react';
import Tab from './component/tab';
import Data from './data/data.json';
import Data1 from './data/data1.json';
import Data2 from './data/data2.json';
import Data3 from './data/data3.json';
import Data4 from './data/data4.json';
import Data5 from './data/data5.json';
import Data6 from './data/data6.json';
import Data7 from './data/data7.json';
import Data8 from './data/data8.json';
import swal from 'sweetalert2'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  arrayMerge = () => {
    var superArray = [];
    superArray = Data8;
    return superArray;
  }
  componentDidMount = () => {
    const swalWithBootstrapButtons = swal.mixin({confirmButtonClass: 'btn btn-success', cancelButtonClass: 'btn btn-danger', buttonsStyling: false})
    swalWithBootstrapButtons({
      title: 'Continue Old Session',
      text: "Are you sure?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.dismiss === swal.DismissReason.cancel) {
        let clear = [];
        localStorage.setItem("array", JSON.stringify(clear));
      }
    })
    var array = JSON.parse(localStorage.getItem("array"));
    if (array===null || array.length === 0) {
      array = this.arrayMerge();
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
      localStorage.setItem("array", JSON.stringify(array));
    }
    this.setState({data: array});
  }
  render() {
    var hStyle = {
      'text-align': 'center'
    };
    return (<div className="App">
      <header className="App-header">
      </header>
      <Tab data={this.state.data}/>
    </div>);
  }
}

export default App;
