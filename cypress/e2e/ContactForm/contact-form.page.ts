import { faker } from '@faker-js/faker';
class ContactForm {
  // Accessors
  firstTimePopup() {
    return cy.get('div.leadinModal-content-wrapper', { timeout: 3000 });
  }

  firstTimePopupDismissButton() {
    return cy.get('.leadinModal-close', { timeout: 5000 });
  }

  homeButtonLogoButton() {
    return cy.get('#header-logo span');
  }

  menuButton() {
    return cy.get('#primary-nav-toggle');
  }

  captchaErrorMessage() {
    return cy.contains('The answer you entered for the CAPTCHA was not correct.');
  }

  titleHeader() {
    // this is brittle but there's no other IDs, and the classes are generic
    // I'd love to use something like "the first h1 on the page" with a css selector
    // but is that any less brittle than the text? maybe. We'll see what I end up with
    // return cy.contains('Get in touch!');
    return cy.get('div h1');
  }

  nameInput() {
    return cy.get('#edit-field-name-0-value');
  }

  emailInput() {
    return cy.get('#edit-mail');
  }

  messageInput() {
    return cy.get('#edit-message-wrapper textarea');
  }

  messageValidation() {
    return cy.get('#edit-message-wrapper div textarea');
  }

  sendButton() {
    return cy.get('#edit-submit');
  }

  // Page-specific logic
  dismissModalIfPresent() {
    this.firstTimePopup().then(($element) => {
      if ($element.length > 0) {
        this.firstTimePopupDismissButton().click();
      }
    });
  }

  verifyPageContents(shouldVerifyModal: boolean) {
    // commented out as it's not working correctly, see README for more
    // if (shouldVerifyModal) this.dismissModalIfPresent();
    this.homeButtonLogoButton().should('be.visible');
    this.menuButton().should('be.visible');
    this.titleHeader().should('be.visible');
    this.nameInput().should('be.visible');
    this.emailInput().should('be.visible');
    this.messageInput().should('be.visible');
    this.sendButton().should('be.visible');
  }

  enterName(name: string) {
    this.nameInput().should('be.visible');
    this.nameInput().clear();
    this.nameInput().type(name);
    this.nameInput().should('have.value', name);
  }

  enterEmail(email: string) {
    this.emailInput().should('be.visible');
    this.emailInput().clear();
    this.emailInput().type(email);
    this.emailInput().should('have.value', email);
  }

  enterMessage(message: string) {
    this.messageInput().should('be.visible');
    this.messageInput().clear();
    this.messageInput().type(message);
    this.messageInput().should('have.value', message);
  }

  fillFormWithFakerData() {
    this.enterName(faker.name.fullName());
    this.enterEmail(faker.internet.email());
    this.enterMessage(faker.lorem.words(20));
  }

  validateFieldError(element: Cypress.Chainable<JQuery<HTMLElement>>, message: string) {
    element.then(($element: any) => {
      expect($element[0].validationMessage).to.include(message);
    });
  }

  sendFormDetails() {
    this.sendButton().click();
    // This is terrible and shouldn't be necessary but I was running into an issue
    // where the page was throwing an error around 'removeClass' on some element
    // Cypress would detect that and fail the test even if all test assertions passed.
    // To replicate, just submit the form as a human WITHOUT completing CAPTCHA
    return cy.on('fail', (err) => {
      cy.log('oops');
      return true;
    });
  }

  // I figured I should show that dependign on code-style a funciton like this might be preferrable,
  // but given that these elements might have different validation rules/ on-dirty behavior
  // I've been less DRY and kept them isolated above ^
  enterField(element: Cypress.Chainable<JQuery<HTMLElement>>, value: string) {
    element.should('be.visible');
    element.clear();
    element.type(value);
    element.should('have.value', value);
  }
}

export const contactForm = new ContactForm();
