describe("Repeating tests with Bypassing UI", () => {
  beforeEach(() => {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);

    const user = {
      name: "Jon Snow",
      username: "JonSnow",
      password: "jonsnow123,",
    };

    cy.request("POST", `${Cypress.env("BACKEND")}/users`, user);
    cy.visit("");

    cy.login({ username: "JonSnow", password: "jonsnow123," });

    /* without custom cy command
      cy.request("POST", "http://localhost:3001/api/users/", user);
      cy.request("POST", `${Cypress.env('BACKEND')}/login`, {
        username: "JonSnow",
        password: "jonsnow123,",
      }).then((response) => {
        localStorage.setItem(
          "loggedPersonAppUser",
          JSON.stringify(response.body)
        );
        cy.visit("");
      }); */
  });

  it("a new person can be added", () => {
    cy.createPerson({ name: "David Clark", number: "34-33333333" });

    /*without custom cy command
    cy.contains("Jon Snow logged in!");

    cy.contains("add contact +").click();
    cy.get("#newName").type("Amanda Clark");
    cy.get("#newNumber").type("33-33333333");
    cy.contains("Add").click();
    cy.contains("Amanda Clark 33-33333333");*/
  });
});

describe("Persons App", () => {
  beforeEach(() => {
    // cy.visit("http://localhost:5173"); defined in cypress.config.js
    cy.visit("");
  });

  it("registration form can be opened", () => {
    cy.contains("Register").click();
    cy.get("#username").type("JonSnow");
    cy.get("#name").type("Jon Snow");
    cy.get("#password").type("jonsnow123,");
    cy.get("#register-button").click();
  });

  it("front page can be opened", () => {
    cy.contains("Login to Application");
    cy.contains("Don't have an account?");
  });

  it("user can login", () => {
    cy.contains("Login").click();
    cy.get("#username").type("JonSnow");
    cy.get("#password").type("jonsnow123,");
    cy.get("#login-button").click();

    cy.contains("Jon Snow logged in!"); //login successful
  });

  it("login fails with wrong password", () => {
    cy.contains("Login").click();
    cy.get("#username").type("JonSnow");
    cy.get("#password").type("wrongpassword");
    cy.get("#login-button").click();

    cy.get(".error").contains("Username and password should be correct"); // be sure to print error message with correct div
    cy.get(".error").should(
      "contain",
      "Username and password should be correct"
    );
    cy.get(".error").should("have.css", "color", "rgb(237, 52, 52)");
    cy.get("html").should("not.contain", "Beren Varol logged in!");
  });
});

describe("PersonsApp contact creation", () => {
  beforeEach(() => {
    cy.visit("");

    it("registration form can be opened", () => {
      cy.contains("Register").click();
      cy.get("#username").type("JonSnow");
      cy.get("#name").type("Jon Snow");
      cy.get("#password").type("jonsnow123,");
      cy.get("#register-button").click();
    });

    cy.contains("Login").click();
    cy.get("#username").type("JonSnow");
    cy.get("#password").type("jonsnow123,");
    cy.get("#login-button").click();
    cy.contains("Jon Snow logged in!"); //login successful
  });
  it("a new person can be added", () => {
    cy.contains("add contact +").click();
    cy.get("#newName").type("David Clark");
    cy.get("#newNumber").type("34-33333333");
    cy.contains("Add").click();
    cy.contains("David Clark 34-33333333");
  });
});
