import React, { Component } from 'react';
import _ from 'underscore';
var possibleCombinationSum = function(arr, n) {
    if (arr.indexOf(n) >= 0) { return true; }
    if (arr[0] > n) { return false; }
    if (arr[arr.length - 1] > n) {
      arr.pop();
      return possibleCombinationSum(arr, n);
    }
    var listSize = arr.length, combinationsCount = (1 << listSize)
    for (var i = 1; i < combinationsCount ; i++ ) {
      var combinationSum = 0;
      for (var j=0 ; j < listSize ; j++) {
        if (i & (1 << j)) { combinationSum += arr[j]; }
      }
      if (n === combinationSum) { return true; }
    }
    return false;
  };
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
    let button;
    switch(props.answerIsCorrect){
        case true:
        button =<button className="btn btn-success"
            onClick={props.acceptAnswer}>
            <i className="fa fa-check"></i></button>
        break;
        
        case false:
        button =<button className="btn btn-danger">
        <i className="fa fa-times"></i></button>
        break;
        default:
        button =<button className="btn btn-info"
        onClick={props.checkAnswer}
        disabled={props.selectedNumbers.length === 0}>
        =</button>
        break;
    }
    return(
        <div className='col-sm-2 text-cemter'>
            {button}
            <br/>
            <br/>
            <button className="btn btn-warning btn-sm" 
            onClick={props.redraw}
            disabled={props.redraws===0}>
                <i className="fa fa-refresh"> {props.redraws}</i>
            </button>
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
       if(_.indexOf(props.usedNumbers,number)>=0)
       return 'used';
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
const DoneFrame = (props)=>{
    return(
        <div className="text-center">
            <h2>{props.doneStatus}</h2>
            <button className="btn btn-default" onClick={props.resetGame}>Play Again</button>
        </div>
    );
};
Numbers.list = _.range(1,10);
class Game extends React.Component{
static randomNumber = () => 1 + Math.floor(Math.random()*9);
static initialState = () =>({
    
        selectedNumbers:[],
        numberOfStars :Game.randomNumber(),
        usedNumbers: [],
        answerIsCorrect: null,
        redraws: 5,
        doneStatus:null
    
});
    state=Game.initialState();
    resetGame = () => this.setState(Game.initialState());
    selectNumber =(clickedNumber)=>{

        if(this.state.selectedNumbers.indexOf(clickedNumber)>=0){return;}

        this.setState(prevState =>({
                answerIsCorrect:null,
                selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
        }));
    };
    
    unselectNumber = (clickedNumber)=>{
        this.setState(prevState =>({
            answerIsCorrect:null,
            selectedNumbers: _.filter(prevState.selectedNumbers,(number)=>{
                return number !== clickedNumber;
            })
            }));
        };

        checkAnswer = ()=>{
            this.setState(prevState =>({
                
                answerIsCorrect: prevState.numberOfStars ===
                _.reduce(prevState.selectedNumbers,(acc,n)=>{
                    return acc + n;
                },0)
                }));
        };

        acceptAnswer = ()=>{
            this.setState(prevState=>({
                usedNumbers:prevState.usedNumbers.concat(prevState.selectedNumbers),
                selectedNumbers: [],
                answerIsCorrect:null,
                numberOfStars:1 + Game.randomNumber()

            }),this.updateDoneStatus);
        };
        
        redraw = () =>{
            if(this.state.redraws ===0){return ;}
            this.setState(prevState=>({
                selectedNumbers: [],
                answerIsCorrect:null,
                numberOfStars:1 + Game.randomNumber(),
                redraws: prevState.redraws - 1

            }), this.updateDoneStatus);
        };
        possibleSolutions = ({numberOfStars, usedNumbers})=>{
            const possibleNumbers = _.filter(_.range(1,10),(number)=>{
               _.indexOf(usedNumbers,number) === -1; 
            });

            return possibleCombinationSum(possibleNumbers,numberOfStars);
            };
        updateDoneStatus = () =>{
            this.setState(prevState=>{
               if(prevState.usedNumbers.length===9){
                   return {doneStatus:'Done. Nice!'};
               }
               if(prevState.redraws ===0 && !this.possibleSolutions(prevState)){
                   return {doneStatus: 'Game Over!'};
               }

            });
        };
    render(){
        const {
            selectedNumbers, 
            numberOfStars, 
            answerIsCorrect,
            usedNumbers,
            redraws,
            doneStatus
        }=this.state;
        return(

            <div className='container' >
                <h3>Play Nine</h3>
                <hr/>
                <div className='row'>
                    <Stars numberOfStars={numberOfStars}/>
                    <Button checkAnswer={this.checkAnswer}
                    answerIsCorrect={answerIsCorrect}
                    acceptAnswer={this.acceptAnswer}
                    redraw={this.redraw}
                    redraws={redraws}
                     selectedNumbers={selectedNumbers}/>
                    <Answer unselectNumber={this.unselectNumber} selectedNumbers={selectedNumbers}/>
                </div>
                <br/>
                {doneStatus ?
                    <DoneFrame resetGame={this.resetGame} doneStatus={doneStatus} />:
                    <Numbers selectedNumbers={selectedNumbers}
                selectNumber={this.selectNumber}
                usedNumbers={usedNumbers}/>
                
                }
                
                
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