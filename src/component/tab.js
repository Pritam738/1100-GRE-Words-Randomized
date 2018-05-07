import React, {Component} from 'react';
import WordList from './wordList';
import SpecialList from './specialWordList';

class Tab extends Component{
render(){
  return( <div className="row">
    <div className="col s12">
      <ul className="tabs tabs-fixed-width">
        <li className="tab col s3"><a className="active" href="#test1">Normal Flow</a></li>
        <li className="tab col s3"><a  href="#test2">Special Flow</a></li>
      </ul>
    </div>
    <div id="test1" className="col s12"><WordList data={this.props.data}/></div>
    <div id="test2" className="col s12"><SpecialList/></div>
  </div>)
}
}
export default Tab;
