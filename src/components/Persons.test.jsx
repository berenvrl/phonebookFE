import React from "react";
import "@testing-library/jest-dom";
import {
  fireEvent,
  queryAllByPlaceholderText,
  queryByLabelText,
  render,
  screen,
} from "@testing-library/react";
import Person from "./Person";
import userEvent from "@testing-library/user-event";
import PersonForm from "./PersonForm";
import PersonsForm from "./PersonsForm";

test("renders person contact", () => {
  const person = {
    name: "Hermann Hesse",
    number: "33-21122211",
  };
  render(<Person person={person} handleDeletePerson={() => {}} />);

  //screen.debug();

  const nameElement = screen.getByText(person.name);
  const numberElement = screen.getByText(person.number);

  //screen.debug(element);

  expect(nameElement).toBeInTheDocument();
  expect(numberElement).toBeInTheDocument();
});

test("filters persons by typing", () => {
  const persons = [
    { id: 1, name: "John Black", number: "23-344556" },
    { id: 2, name: "Hello Sam", number: "24-34544556" },
    { id: 3, name: "Bye Jack", number: "23-21844556" },
  ];

  let searchValue = "";
  const setSearch = (value) => {
    searchValue = value;
  };

  render(<PersonsForm persons={persons} setSearch={setSearch} />);

  const searchInput = screen.getByPlaceholderText("Type for search");
  fireEvent.change(searchInput, { target: { value: "John" } });

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(searchValue.toLocaleLowerCase())
  );

  expect(filteredPersons).toEqual([
    { id: 1, name: "John Black", number: "23-344556" },
  ]);
  expect(searchValue).toBe("John");
});

test("clicking the button calls event handler once", async () => {
  const person = {
    name: "Hermann Hesse",
    number: "33-21122211",
  };
  const mockHandler = jest.fn();

  render(<Person person={person} handleDeletePerson={mockHandler} />);

  const user = userEvent.setup();

  const button = screen.getByText("Delete");
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(1);
});

test("<PersonForm/> updates parent and calls onSubmit", async () => {
  const handleAddBtn = jest.fn();
  const setNewName = jest.fn();
  const setNewNumber = jest.fn();

  render(
    <PersonForm
      handleAddBtn={handleAddBtn}
      setNewName={setNewName}
      setNewNumber={setNewNumber}
    />
  );

  const nameInput = screen.getByPlaceholderText("Enter a name");
  const numberInput = screen.getByPlaceholderText("Number: XX-XXXXXXXX");
  const addButton = screen.getByText("Add");
  const inputs = screen.getAllByRole("textbox");

  await userEvent.type(inputs[0], "Harry Potter");
  await userEvent.type(inputs[1], "12-34565789");
  await userEvent.click(addButton);

  expect(setNewName).toHaveBeenCalledWith("Harry Potter");
  expect(setNewNumber).toHaveBeenCalledWith("12-34565789");

  expect(handleAddBtn).toHaveBeenCalledTimes(1);
});

/*
test('renders person contact',()=>{
  const person={
    name: "Hermann Hesse",
    number: "33-21122211",
  }
  //also can be made with css selector if there is className='person' of the component
  const {container}= render(<Peron person={person}/>)
  const div= container.querySelector('.note')
  expect(div).toHaveTextContent('Hermann Hesse 33-21122211')
})
*/

/*
Notes:After installation npm install --save-dev @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom @babel/preset-env @babel/preset-react
=> 1)we added package.json
"scripts":{
  "test":"jest"
}
"jest":{
  "testEnvironment":"jsdom"
}
2)added .babelrc (to support jsx syntax)
{
  "presets": [
    "@babel/preset-env",
    ["@babel/preset-react", { "runtime": "automatic" }]
  ]
}
*/
/*
npm install --save-dev @testing-library/user-event
*/

//test coverage
//npm test -- --coverage --collectCoverageFrom='src/**/*.{jsx,js}'
