import React from 'react';
import Board from './Board'
import { calculateWinner } from './Utilities'

class Game extends React.Component {
  constructor(props) {
    super(props);
    const initialState = Array(9).fill(null);
    this.state = {
      history: [{
        squares: initialState
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
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNum];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? `Go to move #${move}` : `Go to game start`;
      return (
        <li key={move }>
          <button onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      )
    });

    let status = winner ? `Winner: ${winner}` : `Next player: ${this.state.xTurn ? 'X' : 'O'}`;

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