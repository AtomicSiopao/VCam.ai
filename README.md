# VCam.ai
VCam.ai Website Test Scripts using Cypress + Page-Object Model Design Pattern

## Integrations
Report Generation: Mochawesome

## Setup

### Environment Configuration

This repository is configured to run Cypress tests against different environments (development, staging, live). To get started, you will need to create a `cypress.env.json` file to store the environment-specific variables.

1.  **Create the environment file:**

    Copy the example file to create your own local environment configuration:

    ```bash
    cp cypress.env.json.example cypress.env.json
    ```

2.  **Update the values:**

    Open `cypress.env.json` and replace the placeholder values with the actual credentials and URLs for each environment. This file is included in `.gitignore` and will not be committed to the repository.

### Running Tests

You can run the Cypress tests for a specific environment using the following npm scripts:

*   **Development:**
    ```bash
    npm run cy:dev
    ```

*   **Staging:**
    ```bash
    npm run cy:staging
    ```

*   **Live:**
    ```bash
    npm run cy:live
    ```
