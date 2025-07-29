/**
 * board 
 * piece
 *  - pawn; queen; bishop
 * move
 *  - validateMove
 *    - isCheck
 *    - isCheckMate
 * 
 [Game]
 ├── [Board]
 │    └── [Square] (64 instances)
 ├── [Player] (2 instances)
 └── [Move History]

[Piece] (Abstract)
 ├── [Pawn]
 ├── [Rook]
 ├── [Knight]
 ├── [Bishop]
 ├── [Queen]
 └── [King]

 * 
 * 
 */

 class Position {
   constructor(row, col) {
     this.row = row;
     this.col = col;
   }

   isValid() {
     return this.row >= 0 && this.row < 8 && this.col >= 0 && this.col < 8;
   }

   equals(other) {
     return this.row === other.row && this.col === other.col;
   }
 }


 class Piece {
    constructor(color, position) {
        this.color = color;
        this.position = position
    }

    getPossibleMoves(board) {
        throw new Error("Must implement getPossibleMoves");
    }
    
    isOpponent(other) {
        return other && other.color !== this.color
    }
}

class Rook extends Piece {
    getPossibleMoves(board) {
      let moves = [];
      // Four directions: up, down, left, right
      const directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ];

      for (const [rowDir, colDir] of directions) {
        let currentRow = this.position.row + rowDir;
        let currentCol = this.position.col + colDir;

        // Keep moving in this direction until blocked
        while (
          currentRow >= 0 &&
          currentRow < 8 &&
          currentCol >= 0 &&
          currentCol < 8
        ) {
          const targetPos = new Position(currentRow, currentCol);
          const pieceAtTarget = board.getPieceAt(targetPos);

          if (!pieceAtTarget) {
            // Empty square - can move here
            moves.push(targetPos);
          } else if (this.isOpponent(pieceAtTarget)) {
            // Enemy piece - can capture, then stop
            moves.push(targetPos);
            break;
          } else {
            // Own piece - can't move here, stop
            break;
          }

          currentRow += rowDir;
          currentCol += colDir;
        }
      }

      return moves
    }
}


class Board {
    constructor() {
        this.squares = Array(8).fill(null).map(v => Array(8).fill(null))
        this.lastKingPosition = {white: null, black: null};
    }

    getPieceAt(position) {
        if(!position.isValid()) return null;
        return this.squares[position.row][position.col]
    }

    setPieceAt(position, piece) {
        if(!position.isValid()) return null;
        this.squares[position.row][position.col] = piece
        if(piece) {
            piece.position = position;
        }
        return true;
    }

    movePiece(from, to) {
        const piece = this.getPieceAt(from);
        if (!piece) return false;

        this.setPieceAt(from, null)
        this.setPieceAt(to, piece)

        this.lastKingPosition[piece.color] = to;

        return true;
    }

    findKing(color) {
      return this.lastKingPosition[color]
    }

    isInCheck(color) {
      const kingPosition = this.findKing(color)
      if(!kingPosition) return false;

      const opponentColor = color === 'white' ? 'black' : 'white';

      for(let row = 0; row < 8; row++) {
        for(let col = 0; col < 8; col++) {
          const piece = this.squares[row][col]

          if(piece && piece.color === opponentColor) {
            const moves = piece.getPossibleMoves(this)

            if(moves.some(move => move.equals(kingPosition))) {
              return true
            }
          }
        }
      }

      return false
    }
}

class King extends Piece {
  getPossibleMoves(board) {
    const moves = [];

    // All 8 directions around the king
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    for (const [rowDir, colDir] of directions) {
      const newRow = this.position.row + rowDir;
      const newCol = this.position.col + colDir;
      const targetPos = new Position(newRow, newCol);

      if (!targetPos.isValid()) continue;

      const pieceAtTarget = board.getPieceAt(targetPos);

      // Can move to empty square or capture opponent
      if (!pieceAtTarget || this.isOpponent(pieceAtTarget)) {
        moves.push(targetPos);
      }
    }

    return moves;
  }
}


class ChessGame {
  constructor() {
    this.board = new Board();
    this.currentPlayer = "white";
    this.gameOver = false;
  }

  makeMove(from, to) {
    const piece = this.board.getPieceAt(from);

    if (!piece) {
      return { success: false, error: "No piece at source" };
    }

    if (piece.color !== this.currentPlayer) {
      return { success: false, error: "Not your piece" };
    }

    const possibleMoves = piece.getPossibleMoves(this.board);
    const isLegalMove = possibleMoves.some((move) => move.equals(to));

    if (!isLegalMove) {
      return { success: false, error: "move is not possible" };
    }

    if (this.wouldExposeKingToCheck(from, to)) {
      return {
        sucess: false,
        error: "cannot make move, as king would be in check",
      };
    }

    this.board.movePiece(from, to);
    this.switchPlayer();

    const inCheck = this.board.isInCheck(this.currentPlayer);

    return { sucess: true, check: inCheck };
  }

  wouldExposeKingToCheck(from, to) {
    // Make a temporary move
    const piece = this.board.getPieceAt(from);
    const capturedPiece = this.board.getPieceAt(to);

    this.board.movePiece(from, to);

    // Check if current player's king is in check
    const inCheck = this.board.isInCheck(piece.color);

    // Undo the move
    this.board.setPieceAt(from, piece);
    this.board.setPieceAt(to, capturedPiece);

    return inCheck;
  }

  switchPlayer() {
    this.currentPlayer === "white" ? "black" : "white";
  }
}


// Quick test
const board = new Board();
const rook = new Rook('white', new Position(0, 0));
board.setPieceAt(new Position(0, 0), rook);

console.log('Rook moves from corner:');
const moves = rook.getPossibleMoves(board);
moves.forEach(pos => console.log(`Row ${pos.row}, Col ${pos.col}`));

console.log("Rook moves from corner, with another rook at 0,0 :");
const secondRow = new Rook("white", new Position(0, 7));
board.setPieceAt(new Position(0, 7), rook);

const movesWithConflict = rook.getPossibleMoves(board);
movesWithConflict.forEach((pos) =>
  console.log(`Row ${pos.row}, Col ${pos.col}`)
);

// Set up a simple scenario
const game = new ChessGame();

// Place some pieces manually for testing
const whiteKing = new King('white', new Position(0, 4));
const blackRook = new Rook('black', new Position(7, 4));

game.board.setPieceAt(new Position(0, 4), whiteKing);
game.board.setPieceAt(new Position(7, 4), blackRook);

console.log('Is white king in check?', game.board.isInCheck('white'));

// Try to move the king
const result = game.makeMove(
  new Position(0, 4), 
  new Position(0, 5)
);

console.log('Move result:', result);


/***
 * 
 * 
 * process:
 * - data
 *  - piece
 *  - board
 *  - game
 *  - position
 * - behaviour
 *  - move
 *  - validate
 *  - attack
 *  - capture
 *  - check
 * 
 * - mapping
 *  - piece.move()
 *  - board.validate()
 *  - game.enforce()
 *  - position.calculate
 */



/**
 * 
 * 
 * step 1:

game: {players, activePlayer, state: started | finished | paused, }
board: { state, moveHistory }
piece: { position, color}
position: { row, col}

step 2:

game: {
  start() {}

}

board: {
  initialize() {}
  isValidMove() {} // checks for boundaries, if move causes a check, 
  addPiece(piece) {}
  removePiece(piece) {}
  undoMove() {}
}

piece: {
  getAvailableMoves() {},
  move(from, to) {}
  getColor() {}
}

position: {
  update(row, col) {}

}

step 3

- piece, position
- game, board


ANSWER:


step 1:

game: { id, players, currentPlayer, status, startTime, moveHistory, winner }
board: { squares, enPassantTarget, castlingRights, halfMoveClock, fullMoveNumber }
piece: { id, type, color, position, hasMoved }
position: { row, col }
player: { id, name, color, type, timeRemaining }
move: { from, to, piece, capturedPiece, specialType, notation, timestamp }


step 2:

game: {makeMove(from, to), start(), changePlayer(), isCurrentPlayerInCheck(), undeMove(), isCheckMate()}
board: {getPieceAt(positio ), setPieceAt(position), moviePiece(from, to), isEmpty(position), addCapturedPiece(piece), removeCapturedPiece(piece)}
piece: { getPossibleMovies, isOpponent(other), canCapture(target)}
position: {}
player: { getRemainingTime() }
move: {}

 */

