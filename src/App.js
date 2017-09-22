import React, { Component } from 'react';
import Axios from 'axios';
import logo from './logo.svg';
import './App.css';

class Button extends React.Component{
 handleClick = () =>{

    this.props.onClickFunction(this.props.incrementValue);
   
 };
  render(){
    return(
        <button className='btn btn-danger' onClick={this.handleClick}>
        +{this.props.incrementValue}
        </button>
    );
  }
}
const Result = (props) => {
  return(
    <div>{props.counter}</div>
  );
};

class App extends React.Component{
  state = { counter : 0};
  incrementCounter = (incrementValue) =>{
    this.setState((prevState)=>({
      counter: prevState.counter + incrementValue
    }));
  };
  render(){
      return(
        <div>
          <Button  incrementValue={1} onClickFunction={this.incrementCounter}/>
          <Button incrementValue={5} onClickFunction={this.incrementCounter}/>
          <Button incrementValue={10} onClickFunction={this.incrementCounter}/>
          <Button incrementValue={120} onClickFunction={this.incrementCounter}/>
          <Result counter={this.state.counter}/>
        </div>

      );
  }
}
export default App;
