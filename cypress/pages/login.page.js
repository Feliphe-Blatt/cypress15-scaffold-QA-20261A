class LoginPage {
  go() {
    cy.visit('/login');
  }

  fillCredentials(user, pass) {
    cy.get('#user').type(user);
    cy.get('#password').type(pass);
  }

  submit() {
    cy.get('#login').click();
  }
}

export default new LoginPage();
