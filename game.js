const PIECES = {
    P: '♟', // Black Pawn
    N: '♞', // Black Knight
    B: '♝', // Black Bishop
    R: '♜', // Black Rook
    Q: '♛', // Black Queen
    K: '♚', // Black King
    p: '♙', // White Pawn
    n: '♘', // White Knight
    b: '♗', // White Bishop
    r: '♖', // White Rook
    q: '♕', // White Queen
    k: '♔'  // White King
};

class ChessGame {
    constructor() {
        this.board = this.initializeBoard();
        this.selectedSquare = null;
        this.validMoves = [];
        this.currentPlayer = 'white'; // white or black
        this.moveHistory = [];
        this.init();
    }

    initializeBoard() {
        const board = Array(64).fill(null);
        
        // Set up black pieces (top)
        board[0] = 'R'; board[1] = 'N'; board[2] = 'B'; board[3] = 'Q';
        board[4] = 'K'; board[5] = 'B'; board[6] = 'N'; board[7] = 'R';
        for (let i = 8; i < 16; i++) board[i] = 'P';
        
        // Set up white pieces (bottom)
        for (let i = 48; i < 56; i++) board[i] = 'p';
        board[56] = 'r'; board[57] = 'n'; board[58] = 'b'; board[59] = 'q';
        board[60] = 'k'; board[61] = 'b'; board[62] = 'n'; board[63] = 'r';
        
        return board;
    }

    init() {
        this.render();
        this.attachEventListeners();
    }

    getSquareColor(index) {
        const row = Math.floor(index / 8);
        const col = index % 8;
        return (row + col) % 2 === 0 ? 'light' : 'dark';
    }

    render() {
        const chessboard = document.getElementById('chessboard');
        chessboard.innerHTML = '';

        for (let i = 0; i < 64; i++) {
            const square = document.createElement('div');
            square.className = `square ${this.getSquareColor(i)}`;
            square.id = `square-${i}`;
            square.dataset.index = i;

            if (this.selectedSquare === i) {
                square.classList.add('selected');
            }

            if (this.validMoves.includes(i)) {
                square.classList.add('valid-move');
                if (this.board[i]) {
                    square.classList.add('capture');
                }
            }

            const piece = this.board[i];
            if (piece) {
                const span = document.createElement('span');
                span.textContent = PIECES[piece];
                span.className = `piece ${piece === piece.toLowerCase() ? 'white-piece' : 'black-piece'}`;
                square.appendChild(span);
            }

            square.addEventListener('click', () => this.handleSquareClick(i));
            chessboard.appendChild(square);
        }

        this.updateStatus();
    }

    handleSquareClick(index) {
        const piece = this.board[index];

        // If a square is already selected
        if (this.selectedSquare !== null) {
            // If clicking the same square, deselect
            if (this.selectedSquare === index) {
                this.selectedSquare = null;
                this.validMoves = [];
                this.render();
                return;
            }

            // If it's a valid move
            if (this.validMoves.includes(index)) {
                this.movePiece(this.selectedSquare, index);
                this.selectedSquare = null;
                this.validMoves = [];
                this.switchPlayer();
                this.render();
                return;
            }

            // If clicking a piece of the same player, select that piece instead
            if (piece && this.isPieceOfCurrentPlayer(piece)) {
                this.selectedSquare = index;
                this.validMoves = this.calculateValidMoves(index);
                this.render();
                return;
            }

            // Otherwise deselect
            this.selectedSquare = null;
            this.validMoves = [];
        }

        // Select a piece if it belongs to the current player
        if (piece && this.isPieceOfCurrentPlayer(piece)) {
            this.selectedSquare = index;
            this.validMoves = this.calculateValidMoves(index);
            this.render();
        }
    }

    isPieceOfCurrentPlayer(piece) {
        if (this.currentPlayer === 'white') {
            return piece === piece.toLowerCase();
        } else {
            return piece === piece.toUpperCase();
        }
    }

    calculateValidMoves(index) {
        const piece = this.board[index];
        const type = piece.toLowerCase();
        const moves = [];

        switch (type) {
            case 'p':
                moves.push(...this.getPawnMoves(index));
                break;
            case 'n':
                moves.push(...this.getKnightMoves(index));
                break;
            case 'b':
                moves.push(...this.getBishopMoves(index));
                break;
            case 'r':
                moves.push(...this.getRookMoves(index));
                break;
            case 'q':
                moves.push(...this.getQueenMoves(index));
                break;
            case 'k':
                moves.push(...this.getKingMoves(index));
                break;
        }

        return moves;
    }

    getPawnMoves(index) {
        const moves = [];
        const row = Math.floor(index / 8);
        const col = index % 8;
        const piece = this.board[index];
        const isWhite = piece === piece.toLowerCase();

        // Forward move
        const direction = isWhite ? -1 : 1;
        const nextRow = row + direction;

        if (nextRow >= 0 && nextRow < 8) {
            const nextIndex = nextRow * 8 + col;
            if (!this.board[nextIndex]) {
                moves.push(nextIndex);

                // Double move from starting position
                const startRow = isWhite ? 6 : 1;
                if (row === startRow) {
                    const twoSquares = (nextRow + direction) * 8 + col;
                    if (!this.board[twoSquares]) {
                        moves.push(twoSquares);
                    }
                }
            }

            // Capture diagonally
            for (let dCol of [-1, 1]) {
                const captureCol = col + dCol;
                if (captureCol >= 0 && captureCol < 8) {
                    const captureIndex = nextRow * 8 + captureCol;
                    if (this.board[captureIndex] && !this.isPieceOfCurrentPlayer(this.board[captureIndex])) {
                        moves.push(captureIndex);
                    }
                }
            }
        }

        return moves;
    }

    getKnightMoves(index) {
        const moves = [];
        const row = Math.floor(index / 8);
        const col = index % 8;
        const knightMoves = [
            [-2, -1], [-2, 1], [-1, -2], [-1, 2],
            [1, -2], [1, 2], [2, -1], [2, 1]
        ];

        for (const [dRow, dCol] of knightMoves) {
            const newRow = row + dRow;
            const newCol = col + dCol;
            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                const newIndex = newRow * 8 + newCol;
                if (!this.board[newIndex] || !this.isPieceOfCurrentPlayer(this.board[newIndex])) {
                    moves.push(newIndex);
                }
            }
        }

        return moves;
    }

    getBishopMoves(index) {
        const moves = [];
        const directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
        this.getSlidingMoves(index, directions, moves);
        return moves;
    }

    getRookMoves(index) {
        const moves = [];
        const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        this.getSlidingMoves(index, directions, moves);
        return moves;
    }

    getQueenMoves(index) {
        const moves = [];
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];
        this.getSlidingMoves(index, directions, moves);
        return moves;
    }

    getSlidingMoves(index, directions, moves) {
        const row = Math.floor(index / 8);
        const col = index % 8;

        for (const [dRow, dCol] of directions) {
            let newRow = row + dRow;
            let newCol = col + dCol;

            while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                const newIndex = newRow * 8 + newCol;
                if (!this.board[newIndex]) {
                    moves.push(newIndex);
                } else if (!this.isPieceOfCurrentPlayer(this.board[newIndex])) {
                    moves.push(newIndex);
                    break;
                } else {
                    break;
                }
                newRow += dRow;
                newCol += dCol;
            }
        }
    }

    getKingMoves(index) {
        const moves = [];
        const row = Math.floor(index / 8);
        const col = index % 8;
        const kingMoves = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1], [0, 1],
            [1, -1], [1, 0], [1, 1]
        ];

        for (const [dRow, dCol] of kingMoves) {
            const newRow = row + dRow;
            const newCol = col + dCol;
            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                const newIndex = newRow * 8 + newCol;
                if (!this.board[newIndex] || !this.isPieceOfCurrentPlayer(this.board[newIndex])) {
                    moves.push(newIndex);
                }
            }
        }

        return moves;
    }

    movePiece(fromIndex, toIndex) {
        const piece = this.board[fromIndex];
        this.board[toIndex] = piece;
        this.board[fromIndex] = null;

        // Pawn promotion
        if (piece.toLowerCase() === 'p') {
            const row = Math.floor(toIndex / 8);
            if ((piece === 'p' && row === 0) || (piece === 'P' && row === 7)) {
                this.board[toIndex] = piece === 'p' ? 'q' : 'Q';
            }
        }

        this.moveHistory.push({ from: fromIndex, to: toIndex, piece });
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
    }

    updateStatus() {
        const statusElement = document.getElementById('statusMessage');
        const whiteStatus = document.getElementById('whiteStatus');
        const blackStatus = document.getElementById('blackStatus');

        const currentStatus = this.currentPlayer === 'white' ? 'Your Turn' : 'Waiting...';
        const otherStatus = this.currentPlayer === 'white' ? 'Waiting...' : 'Your Turn';

        statusElement.textContent = `${this.currentPlayer.charAt(0).toUpperCase() + this.currentPlayer.slice(1)}'s Turn`;
        whiteStatus.textContent = this.currentPlayer === 'white' ? 'Your Turn' : 'Waiting...';
        blackStatus.textContent = this.currentPlayer === 'black' ? 'Your Turn' : 'Waiting...';
    }

    resetGame() {
        this.board = this.initializeBoard();
        this.selectedSquare = null;
        this.validMoves = [];
        this.currentPlayer = 'white';
        this.moveHistory = [];
        this.render();
    }
}

// Initialize game
let game = new ChessGame();

// Reset button event listener
document.getElementById('resetBtn').addEventListener('click', () => {
    game.resetGame();
});