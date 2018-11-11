import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Button from 'react-bootstrap/lib/Button'
import axios from 'axios';

  // fucntional component instead of calss, only a render() fn
  function Square(props){
    return(
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
   
  function TA(props){
    return(
      <textarea rows="4" cols="50">{props.piPlates}</textarea>
    );
  }

  class Board extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        squares: Array(9).fill(null),
        xIsNext: true,
        piPlates: "piPlates",
        count: 1,
      }
    }
    
    handleClick(i) {
      const squares = this.state.squares.slice();
      if (calculateWinner(squares) || squares[i]){
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext,
        piPlates: this.state.piPlates + this.state.count,
        count: this.state.count + 1,
      });
    }
    renderSquare(i) {
      // return <Square value={i}/>;
      return (
        <Square 
          value={this.state.squares[i]}
          onClick={() => this.handleClick(i)} 
        />
      );
    }

    renderTA(){
      return(
        <TA value={this.state.piPlates}></TA>
      );
    }
    aGet(self){
      // this.setState({
      //   piPlates: "fj as fas f as"//response.data
      // });
      axios.get('http://52.9.238.232/api/piplates')
        .then(function(response){
        console.log(response.data); // ex.: { user: 'Your User'}
        console.log(response.status); // ex.: 200
        self.setState({
          piPlates: response.data
        });
        // this.renderTA();
      });  
    }
  
    render() {
      const winner = calculateWinner(this.state.squares);
      // var self = this;
      let status;
      if (winner) {
        status = "Winner: " + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
      // let pp = this.state.piPlates;
      // const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      // this.setState({piPlates: this.state.piPlates + this.count,
      //                count: this.state.count + 1});
      return (
        <div>
          <Button variant="primary" onClick={() => this.aGet(this)}>PP</Button>
          {/* {this.renderPiPlates()} */}
          <textarea rows="4" cols="50" value={this.state.piPlates}></textarea>
          {/* {this.state.piPlates} */}
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );

  function calculateWinner(squares){
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [1, 4, 8],
      [2, 4, 6],
    ]; 
    for (let i=0; i < lines.length; ++i){
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c])
        return squares[a];
    }
    return null;
  }
    