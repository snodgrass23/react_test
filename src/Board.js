import React from 'react';

const NUM_ROWS = 3;
const NUM_COLS = 3;

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        num={i + 1}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  renderRow(i) {
    let col = i * NUM_COLS;

    return (
      <div key={`row${i}`} className="board-row">
        { Array(NUM_COLS).fill(null).map((_, i) => this.renderSquare(i + col)) }
      </div>
    );
  }

  render() {
    return (
      <div>
        { Array(NUM_ROWS).fill(null).map((_, i) => this.renderRow(i)) }
      </div>
    );
  }
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      { props.value }
      <span className="squareNumber">{props.num}</span>
    </button>
  );
}

export default Board