//Login to App
Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3001/api/login", {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("loggedPersonAppUser", JSON.stringify(body));
    cy.visit("http://localhost:5173");
  });
});

//Create a person
Cypress.Commands.add("createPerson", ({ name, number }) => {
  cy.request({
    url: "http://localhost:3001/api/persons",
    method: "POST",
    body: { name, number },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("loggedPersonAppUser")).token
      }`,
    },
  });
  cy.visit("http://localhost:5173");
});

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
