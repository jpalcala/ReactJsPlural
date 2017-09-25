import React, { Component } from 'react';
import _ from 'underscore';
const Stars = (props)=>{
    

    

    return (
        <div className='col-sm-5'>
           {_.map(_.range(props.numberOfStars),(i)=>{
                return <i key={i} className='fa fa-star'></i>
           })}

        </div>
    );
}
const Button = (props) => {
    return(
        <div className='col-sm-2'>
            <button disabled={props.selectedNumbers.length === 0} className='btn btn-info'>=</button>
        </div>
    );
}
const Answer = (props)=>{
    return(
        <div className='col-sm-5'>
            {_.map(props.selectedNumbers, (number,i)=>{
                    return <span  onClick={()=>props.unselectNumber(number)} key={i} >{number}</span>
            })}
        </div>
    );
}
const Numbers = (props) => {
   const numberClassName = (number)=>{
       if(_.indexOf(props.selectedNumbers,number)>=0)
       return 'selected';

   }
   
    return(
        <div className='card text-center'>
            <div>
                {_.map(Numbers.list,(number,i)=>{
                    return <span onClick={()=>props.selectNumber(number)} key={i} className={numberClassName(number)}>{number}                      
                        </span>;
                })}               
                
            </div>
        </div>
    );
}

Numbers.list = _.range(1,10);
class Game extends React.Component{

    state={
        selectedNumbers:[2,4],
        numberOfStars :1 +Math.floor( Math.random()*9)
    };

    selectNumber =(clickedNumber)=>{

        if(this.state.selectedNumbers.indexOf(clickedNumber)>=0){return;}

        this.setState(prevState =>({
                
                selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
        }));
    };
    
    unselectNumber = (clickedNumber)=>{
        this.setState(prevState =>({
            
            selectedNumbers: _.filter(prevState.selectedNumbers,(number)=>{
                return number !== clickedNumber;
            })
            }));
        };
    render(){
        const {selectedNumbers, numberOfStars}=this.state;
        return(

            <div className='container' >
                <h3>Play Nine</h3>
                <hr/>
                <div className='row'>
                    <Stars numberOfStars={numberOfStars}/>
                    <Button selectedNumbers={selectedNumbers}/>
                    <Answer unselectNumber={this.unselectNumber} selectedNumbers={selectedNumbers}/>
                </div>
                <br/>
                <Numbers selectedNumbers={selectedNumbers}
                selectNumber={this.selectNumber}/>
            </div>
        );
    }
}

class App extends React.Component{
render(){
    return(
        <div>
            <Game/>
        </div>
    );
}
}
export default App;