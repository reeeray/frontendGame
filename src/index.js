import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm';
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
function resetState() {
  return {
    turnData: getTurnsData(authors),
    highlight: ''
  };
}

// function reducer(state, action) {
//   return state;
// }

// let store = Redux.createStore(reducer);
let state = resetState();

function onAnswerSelected(answer) {
  const isCorrect = state.turnData.author.books.some((book) => book === answer);
  state.highlight = isCorrect ? 'correct' : 'wrong';
  render();
}

function App() {
  // return <ReactRedux.Provider store={store}>
  return <AuthorQuiz {...state} 
              onAnswerSelected={onAnswerSelected}
              onContinue={() => {
              state = resetState();
              render();
            }} />;
    {/* </ReactRedux.Provider> */}
}

const AuthorWrapper = withRouter(({ history }) => 
  <AddAuthorForm onAddAuthor={(author) => {
    authors.push(author);
    history.push('/');
  }} />
);

function render() {
  ReactDOM.render(
    <BrowserRouter>
      <React.Fragment>
        <Route exact path= "/" component={App } />
        <Route path= "/add" component={AuthorWrapper} />
      </React.Fragment>
    </BrowserRouter>,
    document.getElementById('root')
  );
};
render();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
