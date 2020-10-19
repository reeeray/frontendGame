import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';
// import { render } from '@testing-library/react';

const authors =[
  {
    name : 'Stanislav Lem',
    imageUrl: 'images/authors/Lem.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['Solaris', 'Invincible', 'Star diaries']
  },
  {
    name : 'Strugatskie brothers',
    imageUrl: 'images/authors/Strug.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['Stalker', 'Roadside picnic', 'Almost the same', 'Night in desert']
  },
  {
    name : 'Dmitrii Glukhovskii',
    imageUrl: 'images/authors/Glux.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['Metro 2033', 'Metro 2034', 'Metro 2035', 'Metro Last night']
  },
  {
    name : 'Gogol Nikolai',
    imageUrl: 'images/authors/Gogol.jpg',
    imageSource: 'Wikimedia Commons',
    books: ['Players', 'Revisor', 'Taras Bulba', 'Vii']
  },
];

function getTurnsData(authors) {
  const allBooks = authors.reduce(function(p, c, i) {
    return p.concat(c.books);
  }, []);
  const fourRandomBooks = shuffle(allBooks).slice(0, 4);
  const answer = sample(fourRandomBooks);
  
  return {
    books: fourRandomBooks,
    author: authors.find((author) =>
     author.books.some((title) =>
      title === answer))  
    }
}

const state = {
  turnData: getTurnsData(authors),
  highlight: 'none'
};

function onAnswerSelected(answer) {
  const isCorrect = state.turnData.author.books.some((book) => book === answer);
  state.highlight = isCorrect ? 'correct' : 'wrong';
  render();
}

function render() {
  ReactDOM.render(
    <AuthorQuiz {...state} onAnswerSelected={onAnswerSelected}/>,
    document.getElementById('root')
  );
};
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
