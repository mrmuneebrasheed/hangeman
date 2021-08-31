import React from "react";
import Button from "./components/Button";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
class App extends React.Component {
  constructor() {
    super();
    this.state = { words: [], selectedWordArray: [], array: [], win: false };
  }
  componentDidMount() {
    fetch("https://random-word-api.herokuapp.com/word?number=1")
      .then((result) => result.json())
      .then((result) => {
        this.setState({
          words: result,
          selectedWordArray: result[0].split(""),
        });
        for (let i = 0; i < this.state.selectedWordArray.length; i++)
          this.setState({
            array: this.state.selectedWordArray.map((char) => "-"),
          });
        console.log(this.state.selectedWordArray, this.state.array);
      });
    document.addEventListener("keypress", this.handleInput.bind(this));
  }
  handleInput(e) {
    const selectedWordArray = this.state.selectedWordArray;
    selectedWordArray.map((char, index) => {
      if (
        char.toUpperCase() === e.target.id ||
        char.toUpperCase() === e.key.toUpperCase()
      ) {
        const newArray = this.state.array;

        newArray[index] = char.toUpperCase();

        this.setState({ array: newArray });
      }
    });
    if (!this.state.array.includes("-")) this.setState({ win: true });
  }
  render() {
    const alphabets = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    return (
      <div className="card col-5 bg-light my-4 mx-auto">
        <div className="h2 text-center p-2 bg-danger text-white">
          Play Hangman Game
        </div>
        <div>
          <img
            style={{ objectFit: "contain" }}
            height="300px"
            width="100%"
            alt="Hangman"
            src="https://cdn.prdaily.com/wp-content/uploads/2016/06/Unbeatable_Hangman_Words.jpg"
          ></img>
        </div>
        {!this.state.win && (
          <div className="h1 text-center p-3 bg-white">
            {this.state.array.map((char) => `${char} `)}
          </div>
        )}
        {this.state.win && (
          <div className="h2 text-center p-3 bg-white">{`You Won, The word was ${this.state.array.join(
            ""
          )}`}</div>
        )}
        <div>
          {alphabets.map((char) => (
            <Button key={char} onClick={this.handleInput.bind(this)} id={char}>
              {char}
            </Button>
          ))}
        </div>
      </div>
    );
  }
}
export default App;
