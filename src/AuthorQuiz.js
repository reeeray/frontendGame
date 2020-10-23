import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css';

function Hero() {
  return (<div className="row">
    <div className="jumbotron col-10 offset-1">
      <h1>Author Quiz</h1>
      <p>Select the book writer by the author shown</p>
    </div>
  </div>)
}

function Book({title, onClick}) {
  return (<div className="answer" onClick={() => {onClick(title);}}>
    <h4>{title}</h4>
  </div>)
}

function Turn({author, books, highlight, onAnswerSelected}) {
  function highlightToBgColor(highlight) {
    const mapping = {
      'none': '',
      'correct': 'green',
      'wrong': 'red'
    };
    return mapping[highlight];
  }
  return (<div className="row turn" style={{backgroundColor: highlightToBgColor(highlight)}}>
    <div className="col-4 offset-1">
      <img src={author.imageUrl} className="authorImage" alt="Author" />
    </div>
    <div className="col-6">
      {books.map((title) => <Book title={title} key={title} onClick={onAnswerSelected}/> )}
    </div>
  </div> 
  );
}

//Typing of data structure
Turn.propTypes = {
  author: Proptypes.shape({
    name: Proptypes.string.isRequired,
    imageUrl: Proptypes.string.isRequired,
    imageSource: Proptypes.string.isRequired,
    books: Proptypes.arrayOf(Proptypes.string).isRequired
  }),
  books: Proptypes.arrayOf(Proptypes.string).isRequired,
  onAnswerSelected: Proptypes.func.isRequired,
  highlight: Proptypes.string.isRequired
}

function Continue({show, onContinue}) {
  return (
  <div className="row continue">
    {show ?
      <div className="col-11">
        <button className="btn btn-primary btn-lg float-right" onClick={onContinue}>Continue</button>
      </div>
    : null }
  </div>
  );
}

function Footer() {
  return (<div id="footer" className="row">
    <div className="col-12">
      <p className="text-muted credit">All images are from <a href="https://commons.wikimedia.org/wiki/Main_Page">Wikimedia Commons</a>
      and are in the public domain.</p>
    </div>
  </div>)
}

// class AuthorQuiz extends Component {
//   render() {
//     return (
//       <div className="container-fluid">
//         <Hero />
//         <Turn />
//         <Continue />
//         <Footer/>
//       </div>
//     );
//   }
// }

function mapStateToProps (state) {
  return {
    turnData: state.turnData,
    highlight: state.highlight
  };
}

  function mapDispatchToProps (dispatch) {
    return {
      onAnswerSelected: (answer) => {
        dispatch({type: 'ANSWER_SELECTED', answer});
      },
      onContinue: () => {
        dispatch({type: 'CONTINUE'})
      }
    };
}

const AuthorQuiz = connect(mapStateToProps, mapDispatchToProps)
  (function ({turnData, highlight, onAnswerSelected, onContinue}){
    return (
      <div className="container-fluid">
        <Hero />
        <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected}/>
        <Continue show={highlight === 'correct'} onContinue={onContinue}/>
         <p><Link to="/add" >Add an author</Link></p>
        <Footer/>
      </div>
    );
});

export default AuthorQuiz;
