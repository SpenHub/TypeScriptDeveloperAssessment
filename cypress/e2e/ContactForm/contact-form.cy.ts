import { contactForm } from './contact-form.page';
import { faker } from '@faker-js/faker';

describe('Contact Form', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  describe('Page Contents', () => {
    it('Should load all elements', () => {
      contactForm.verifyPageContents(true);
    });
    it.skip('TODO: Menu button works to show menu', () => {
      // Given more time this would be a good check
    });
    it.skip('TODO: Home Button takes you home', () => {
      // Given more time this would be a good check
    });
    it.skip('TODO: Join us takes you to careers', () => {
      // Given more time this would be a good check
    });
  });
  describe('Form Valdiation', () => {
    // My attempt at trying to force the case that might exist where it lets
    // a user through when it shouldn't, but to no avail, leaving it in for humor
    for (let i = 1; i <= 50; i++) {
      it.skip(`${i} - CAPTCHA validation required on quick submission`, () => {
        contactForm.fillFormWithFakerData();
        contactForm.sendFormDetails();
        contactForm.captchaErrorMessage().should('be.visible');
      });
    }
    it('CAPTCHA validation required on quick submission', () => {
      contactForm.fillFormWithFakerData();
      contactForm.sendFormDetails();
      contactForm.captchaErrorMessage().should('be.visible');
    });
    it('CAPTCHA validation required on long submission', () => {
      cy.wait(faker.number.int(10000));
      contactForm.fillFormWithFakerData();
      contactForm.sendFormDetails();
      contactForm.captchaErrorMessage().should('be.visible');
    });

    it('Name field is required', () => {
      contactForm.sendButton().click();
      contactForm.validateFieldError(contactForm.nameInput(), 'Please fill out');
    });

    it('Email field is required', () => {
      contactForm.enterName(faker.name.firstName());
      contactForm.sendButton().click();
      contactForm.validateFieldError(contactForm.emailInput(), 'Please fill out');
    });

    it('Email field requires valid email', () => {
      contactForm.enterName(faker.name.firstName());
      contactForm.sendButton().click();
      contactForm.validateFieldError(contactForm.emailInput(), 'Please fill out');
      contactForm.enterEmail('a');
      contactForm.validateFieldError(contactForm.emailInput(), "Please include an '@'");
      contactForm.enterEmail('a@');
      contactForm.validateFieldError(contactForm.emailInput(), 'Please enter a part following');
      //
    });

    it('Email field allows for email aliases', () => {
      contactForm.enterName(faker.name.firstName());
      contactForm.enterEmail('email+alias@domain.com');
      contactForm.sendButton().click();
      contactForm.validateFieldError(contactForm.messageInput(), 'Please fill out');
    });
    it("Doesn't allow very long emails", () => {
      const LONG_EMAIL = `a@${faker.string.alphanumeric(80)}`;

      contactForm.enterName(faker.name.firstName());
      contactForm.enterMessage(faker.lorem.words(20));
      contactForm.enterEmail(LONG_EMAIL);
      contactForm.validateFieldError(contactForm.emailInput(), 'Please enter an email address');
    });

    it('Message field is required', () => {
      contactForm.enterName(faker.name.firstName());
      contactForm.enterEmail(faker.internet.email());
      contactForm.enterMessage(faker.lorem.words(20));
      contactForm.sendFormDetails();
      contactForm.validateFieldError(contactForm.messageInput(), 'Please fill out');
    });

    it('TODO: All fields are required', () => {
      // Had I more time, I would've filled this out, but given
      // that each input trips validation one at a time and not
      // all at once this woudl be a lot of repeated assertions
    });
  });
});
