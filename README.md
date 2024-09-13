# TypeScript Developer Technical Assessment

# PLEASE SEE MY NOTES AT THE BOTTOM 🫡
[🚨👉Jump to it right here 👈🚨](#thoughts-feedback)

These exercises are designed to assess your technical skills and see how you
solve problems.

There is no right answer here, and work-in-progress code is fine, as long as you
can explain what you were working on during the interview.

Thanks, and good luck!

## Instructions

1. Read the information below.
2. Complete the assessment by performing the two exercises.
3. Return the completed assessment for review as directed.

### Installation

Given a local environment with NodeJS 20:

```
npm install
```

You may need to perform some additional setup the first time you run Cypress.

Everything else should work out of the box.

### Utilities

This repository includes `prettier` to help you keep your work formatted:

```
npm run format <file path>
```

```
npm run format:all
```

### Exercise One

Last Call Media's [website](https://lastcallmedia.com) breaks every time we push
code to it! We want your help to add some tests to help us automate some basic
quality control.

The form on https://lastcallmedia.com/contact sometimes allows users to
submit without filling out the CAPTCHA. We would like to verify that the form
**cannot** be submitted without solving the CAPTCHA (note: no need to actually
perform a successful submission here).

Use [Cypress](https://www.cypress.io/) to create these tests. The tests will be
run locally, and will run against production (https://lastcallmedia.com).

[Cypress Testing Library](https://testing-library.com/docs/cypress-testing-library/intro)
is also available to you.

A basic Cypress environment is already set up for you in the `cypress` directory
of this repository.

Your tests should be inside of the `cypress/e2e` directory.

To run tests locally using the Cypress GUI:

```
npm run cypress:open
```

### Exercise Two

Write a function that accepts a collection of numbers and returns the sum of the
odd numbers.

This function should be exported from a module so that it can be reused
elsewhere.

Your solution should include unit tests that assert the function works as
expected using [Jest](https://jestjs.io/).

Consider edge cases, maintainability, and the needs of future users of this
function.

Your module and unit tests should be inside of the `src` directory.

Your unit tests should end with the `.spec.ts` file extension.

To run tests locally:

```
npm run test
```

## Thoughts/ Feedback

Hello! Thank you for taking the time to look at my submission. I tried to time-box myself to just a few hours but that's a very hard thing to do with how much I love writing Cypress tests.
I could've spent way too much time adding even more, I've missed using it compared to my recent tool usage (WebDriverIO).

### Improvements

Before I began I added:

1. A setup script
2. I added Faker.js to make inputting dummy values a bit more dynamic and less of a pain
3. An `.nvmrc` file to explicitly lock version control
4. Eslint to provide some code-consistency and some guard-rails for my test-writing
5. A `.prettierrc` file so that my editor (VS Code) could do some auto-formatting that doesn't conflict with eslint's wants & needs
6. Modified the `cypress.config.ts` to include a baseUrl so that testing only requires a `beforeEach()` referencing `cy.visit('/')`
7. I altered the Cypress open command to default to e2e and chrome to save some clicks.

### Exercise 1

I did some exploratory testing before writing automation code just to get a feel for the website and had a good feel for it.

I wrote the basic test case around verifying the CAPTCHA valdiation message appearing if the user attempts to submit the form without completing the CAPTCHA.

Only from there did I break out and try to add other tests around page validation, ensuring all the page elements load, as well as other small tests such as:
email format validation, email length validation, etc.

You'll notice a skipped test, that was from an attempt to trigger the supposed case where the form lets you submit without needing to complete the captcha but to no avail with my brute-force attempt. I even attempted to add random delays to see if that was a potential cause.

#### Future Improvements for Cypress work

- I would've loved to have time to add custom Cypress commands around getById and little helper functions
- I wanted to stay DRY but some pieces were less feasible with the time-given. Example: `enterField(...)` it could be useful if one could have access to the source and have assurances that sharing functionality is safe to do.
- Viewport testing, ensuring that everything performs the same regardless of desktop vs mobile viewports.
- Finishing the test/ logic I have around dismissing the popup only if it appears, I didn't have the time to figure out how to suppress the timeout/ go another route with searching for elements from `cy.get('body')` and evaluating that way.

### Exercise 2

- This was pretty straight-forward, I initially had the logic do an "odd-check" via `number % 2 === 1` only to forget about negative numbers. I ended up flipping the logic to check for a lack of equality against `0` instead.
- My unit tests should cover most cases that can appear with such a function, including bigINT values, zero-length arrays, negative numberes.
- I ran into a bit of a snag with decimal numbers not acting how I want them to, forgetting that a %2 on a decimal just returns the decimal, so I had to split up the number and only mod the decimal (in the tenths / hundredths... place). It was messy but it works.
- Future tests that could be included but are more testing the number system of TS/ JS are around floating point precision and how it falls off, from the mantissa just not being big enough after a certain point.
