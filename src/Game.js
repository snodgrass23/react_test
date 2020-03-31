import React from 'react';
import Board from './Board'
import { calculateWinner } from './Utilities'

const LOCAL_STORAGE_KEY = 'tictactoe.game.state';

class Game extends React.Component {
  constructor(props) {
    super(props);
    const storedGame = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

    this.state = storedGame || {
      history: [{
        squares: Array(9).fill(null)
      }],
      xTurn: true,
      stepNum: 0
    }
  }


  jumpTo(step) {
    this.setState({
      stepNum: step,
      xTurn: (step % 2) === 0
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNum + 1);
    const current = history[history.length -1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) return;

    squares[i] = this.state.xTurn ? 'X' : 'O';

    this.setState({
      history: history.concat([
        { squares }
      ]),
      xTurn: !this.state.xTurn,
      stepNum: history.length
    }, () => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.state));
    });
  }

  render() {
    const history = this.state.history;
    const stepNum = this.state.stepNum;
    const current = history[stepNum];
    const winner = calculateWinner(current.squares);
    let fullBoard = false;

    const moves = history.map((step, move) => {
      let desc = `Restart Game`;

      if (move > 0) {
        let player = (move % 2) === 0 ? 'O' : 'X';
        let thisMove = history[move].squares;
        let prevMove = history[move - 1].squares;
        let difference = thisMove.findIndex((square, i) => square !== prevMove[i]);
        desc = `${player} plays in square ${difference + 1}`;

        let moveWinner = calculateWinner(thisMove);
        if (moveWinner) desc += ' and wins!!'
      }

      if (move >= 9) fullBoard = true;

      return (
        <li key={move}>
          <button
            onClick={() => this.jumpTo(move)}
            className={move === stepNum ? 'active' : ''}
          >
            {desc}
          </button>
        </li>
      )
    });

    let status;

    if (winner) status = `${winner} is the Winner!!`;
    else if (fullBoard) status = 'DRAW!';
    else status = `Next player: ${this.state.xTurn ? 'X' : 'O'}`;


    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    );
  }
}


export default Game