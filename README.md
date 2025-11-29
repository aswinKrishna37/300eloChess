# 300eloChess

A modern, minimalistic chess learning and playing platform built with a clean black and white aesthetic.

## About

**300eloChess** is an interactive chess website designed to teach chess fundamentals and provide a platform for two-player chess games. The website features detailed explanations of chess pieces, their movements, and rules, along with a fully functional interactive chess board where players can play against each other.

### Key Features

- **Educational Content**: Learn about all chess pieces and their unique movement patterns
- **Interactive Chess Board**: Play chess with another player in real-time
- **Modern Design**: Clean, minimalistic black and white UI with smooth animations
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations**: Elegant fade-in effects and typing animations for engaging user experience
- **Full Chess Logic**: Complete implementation of chess rules including:
  - Pawn promotion
  - All piece movement rules
  - Valid move highlighting
  - Move history tracking
  - Game reset functionality

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Design**: Custom CSS with modern animations and responsive design
- **Chess Logic**: Pure JavaScript implementation of chess mechanics

## Pages

### Home Page (`index.html`)
- Welcome section with typing animation
- Detailed chess pieces guide with icons and movement descriptions
- Call-to-action to start playing

### Game Page (`game.html`)
- Interactive 2D chess board
- Real-time player status display
- Valid move highlighting
- Game controls (New Game, Back to Home)

## How to Play

1. Open `index.html` in your web browser
2. Click the "Play Game" button to navigate to the game board
3. White pieces move first
4. Click on a piece to select it (valid moves will be highlighted in yellow)
5. Click on a highlighted square to move the piece
6. Continue alternating turns until the game concludes
7. Use "New Game" to reset and play again

## Project Structure

```
ChessWebsite/
├── index.html          # Home page with chess education
├── game.html           # Interactive chess game board
├── styles.css          # All styling and animations
├── script.js           # Home page scripts
├── game.js             # Chess game logic
├── Images/             # Image assets
│   └── cropped_circle_image.png
├── AI/                 # AI-related resources
├── source/             # Source files
└── README.md           # This file
```

## Features Breakdown

### Chess Pieces
- ♔ King - Moves one square in any direction
- ♕ Queen - Moves any distance horizontally, vertically, or diagonally
- ♖ Rook - Moves horizontally or vertically any distance
- ♗ Bishop - Moves diagonally any distance
- ♘ Knight - Moves in L-shaped pattern
- ♙ Pawn - Moves forward with special capture rules

### Visual Design
- **Color Scheme**: Pure black and white with yellow highlights
- **Typography**: System font stack for modern, clean appearance
- **Animations**:
  - Fade-in effects for page elements (1-2 seconds)
  - Typing animation for main heading
  - Smooth hover transitions
  - Board state updates with instant visual feedback

### Game Features
- Two-player gameplay
- Valid move calculation for each piece type
- Visual indication of selected pieces and valid moves
- Pawn promotion on reaching the opposite end
- Turn-based system with clear player status
- Move history tracking
- Game reset functionality

## Development Notes

- The application is fully client-side; no server required
- All chess logic is implemented in vanilla JavaScript
- Responsive design uses CSS Grid and Flexbox
- Animations use CSS keyframes for optimal performance
- The game board uses Unicode chess pieces for universal compatibility

## Browser Compatibility

Works on all modern browsers:
- Chrome/Chromium
- Firefox
- Safari
- Edge

## Future Enhancements

Potential additions for future versions:
- Chess engine for single-player mode
- Move validation with checkmate detection
- Opening move database
- Game save/load functionality
- Online multiplayer support
- Elo rating system
- Move notation (PGN)

## Made with AI

This project was created entirely using AI assistance, including design, development, and implementation of all features. The minimalistic design philosophy and smooth animations were AI-optimized for the best user experience.

## License

Feel free to use and modify this project for educational purposes.

## Author

Developed by Aswin Krishna with AI assistance

---

**Enjoy playing chess! ♔**