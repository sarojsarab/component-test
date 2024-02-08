## Prerequisites

Node >= v16.17.0

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Runs all the component and/or unit tests
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run playwright`

Runs all the playwright e2e tests.
You can learn more about playwright [here](https://playwright.dev/docs/intro).

## Project Structure

```
component-test/
|-- src/
|   |-- components/
|   |   |-- MultiStepForm.tsx
|   |   |-- PersonalInformation.tsx
|   |   |-- OtherInformation.tsx
|   |-- test/
|   |   |-- PersonalInformation.test.tsx
|   |   |-- OtherInformation.test.tsx
|   |   |-- MultiStepForm.test.tsx
|   |-- App.tsx
|   |-- index.tsx
|-- e2e/
|   |-- e2e.spec.ts
|-- public/
|   |-- index.html
|-- tsconfig.json
|-- playwright.config.ts
|-- package.json
|-- styles.css
|-- README.md
```

### Here's a breakdown of the structure:

- `src/`: This directory contains your React application source code.

  - `components/`: Contains individual React components.
    - `MultiStepForm.tsx`: The main component for the multi-step form.
    - `PersonalInformation.tsx`: Component for personal information form step1.
    - `OtherInformation.tsx`: Component for other information form step2.
  - `test/`: Contains the unit component tests for each individual component.
    - `PersonalInformation.test.tsx`: Component test for PersonalInformation component.
    - `OtherInformation.test.tsx`: Component test for OtherInformation component.
    - `MultiStepForm.test.tsx`: Component test for MultiStepForm component.
  - `App.tsx`: The entry point of your React application.
  - `index.tsx`: The main file that renders your React app.

- `e2e/`: This directory contains end-to-end tests using Playwright and TypeScript.

  - `e2e`.spec.ts: Test file for e2e test.

- `public/`: Public assets and HTML file.

  - `index.html`: The HTML template for your React app.

- `tsconfig.json`: TypeScript configuration file.
- `playwright.config.ts`: Playwright configuration file.
- `package.json`: NPM package configuration file.
- `styles.css`: Global styles for your application.
- `README.md`: Project documentation.
