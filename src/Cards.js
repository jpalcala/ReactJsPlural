import React, { Component } from 'react';
import Axios from 'axios';

const Card = (props) => {
    return (
      <div>
        <img width='75' src={props.avatar_url} />
         <div style={{
           display:'inline-block', marginLeft:10
         }}>
            <div className={{fontSize:'1.235em',fontWeight:'bold'}}>{props.name}</div>
            <div>{props.company}</div>
        </div>
      </div>
    );
  };
  
  const CardList = (props) =>{
    return (
      <div>
          {props.cards.map(card => <Card key={card.id} {...card}/>)}
        </div>
    );
  }
  
  class Form extends React.Component{
    state= {userName:''}
    handleSubmit = (event) =>{
      event.preventDefault();
      console.log("Event: form submit", this.state.userName);
      Axios.get('https://api.github.com/users/'+this.state.userName)
      .then(resp =>{
       this.props.onSubmit(resp.data);
       this.setState({userName:''});
      });
      
    };
    render(){
      return(
        <form className='row' onSubmit={this.handleSubmit}>
          <input className='form-control col-md-5 ' type="text" 
         /* ref={(input)=> this.userNameInput = input }*/
         value={this.state.userName}
         onChange={(event)=> this.setState({userName:event.target.value})}
          placeholder="github username" />
          <button  className='btn btn-info col-md-4' type="submit">Add card</button >
        </form>
      );
    }
  }
  class App2 extends React.Component{
    state ={
      cards:[
        
      ]
    };
    addNewCard = (cardInfo) =>{
  this.setState(prevState => ({
    cards: prevState.cards.concat(cardInfo)
  }))
    };
     render(){
         return(
           <div >
             <Form  onSubmit={this.addNewCard}/>
             <CardList cards={this.state.cards}
             />
           </div>
   
         );
     }
   }
  export default  App2;
  