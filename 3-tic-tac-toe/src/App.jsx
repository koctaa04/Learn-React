import { useState } from 'react'
import './index.css'


// eslint-disable-next-line react/prop-types
function Square({value, onSquareClick}) {
  // const [value, setValue] = useState('');

  
  return(
    <>
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
    </>
  )
}

export default function App() {
  // const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function jumpTo(move) {
    setCurrentMove(move);
    // setXIsNext(move % 2 === 0);
    
  }

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    // setXIsNext(!xIsNext);
    // setHistory([...history, nextSquares]);
    // setXIsNext(!xIsNext);
  }
  

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    return (
      <li key={move}>
        <button className='move' onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <div>{/* status */}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

// eslint-disable-next-line react/prop-types
function Board({xIsNext, squares, onPlay}) {
  // const [squares, setSquares] = useState(Array(9).fill(null));
  // const [xIsNext, setXIsNext] = useState(true);

  function handleClick(i) {    
    if (squares[i] || calculateWinner(squares)) return;

    // eslint-disable-next-line react/prop-types
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    // setSquares(newSquares);
    // setXIsNext(!xIsNext);

    onPlay(newSquares);

    // if (newSquares[i] ) {
    //   newSquares[i] = null;
    // } else {
    //   newSquares[i] = 'X';
    // }
    //   setSquares(newSquares);
  }
  
  const winner = calculateWinner(squares);
    // console.log(winner);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }
  return (
    <>
    <div className="status">{status}</div>
    <div className="board">
    <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
    <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
    <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
    <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
    <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
    <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
    <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
    <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
    <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
    </div>
    </>
  )
  
}



function calculateWinner(squares) {
  const rules = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  for (let i = 0; i < rules.length; i++) {
    const [a, b, c] = rules[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}