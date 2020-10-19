import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';
import Enzyme, {mount, shallow, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
// import { render } from '@testing-library/react';
//connecting enzyme to enzyme react adapter
Enzyme.configure({adapter: new Adapter()});

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

const state = {
  turnData:  {
    books: ['Almost the same', 'Night in desert', 'Metro', 'Stalker'],
      author: {
      name : 'Strugatskie brothers',
      imageUrl: 'images/authors/Strug.jpg',
      imageSource: 'Wikimedia Commons',
      books: ['Stalker', 'Roadside picnic']
      }
  },
  highlight: 'none'
};

describe("Smal Stupid Test", () => {
  it("should pass", () => {
    expect(1 + 1).toBe(2);
  });
});

describe("Author Quiz", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<AuthorQuiz {...state} onAnswerSelected={()=>{}}/>, div);
  });
});

describe ("When no answer has been selected", ()=> {
  let wrapper;
  beforeAll(()=> {
    wrapper = mount(<AuthorQuiz {...state} onAnswerSelected={()=>{}}/>);
  });

  it("should have no background color", () => {
    expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('');
  });
});

describe ("When wrong answer has been selected", ()=> {
  let wrapper;
  beforeAll(()=> {
    wrapper = mount(<AuthorQuiz {...(Object.assign({}, state, {highlight: 'wrong'}))} onAnswerSelected={()=>{}}/>);
  });

  it("should have red color", () => {
    expect(wrapper.find("div.row.turn").props().style.backgroundColor).toBe('red');
  });
});

describe ("When the first answer is selected", () => {
  let wrapper;
  const handleAnswerSelected = jest.fn();//creates a mock function

  beforeAll(()=> {
    wrapper= mount(<AuthorQuiz {...state} onAnswerSelected={handleAnswerSelected}/>);
    wrapper.find('.answer').first().simulate('click');
  });

  it("onAnswerSelected should be called", ()=> {
    expect(handleAnswerSelected).toHaveBeenCalled(); 
  });

  it("should recieve Almost the same", ()=> {
    expect(handleAnswerSelected).toHaveBeenCalledWith("Almost the same");
  });
})
