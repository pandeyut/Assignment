Project Overview

# Triangle Calculator Test Harness

This repository contains a suite of automated tests for the Triangle Calculator API and its related `/version` endpoint. The tests are built using Playwright and TypeScript to ensure the API meets functional and edge case requirements.

The test harness validates:
- Triangle type determination based on side lengths.
- Proper error handling for invalid triangle inputs.
- The `/version` endpoint for application metadata and HTTP method handling.


Getting Started

Prerequisites
Ensure the following are installed:
- Node.js(v16 or higher)
- npm or yarn

Setup
1. Clone this repository:
    git clone <repository-url>
2. Navigate to the project directory:
    cd triangle-calculator-tests
3. Install dependencies:
    npm install


Run Tests

To execute all tests:
npx playwright test

To run specific test files:
npx playwright test triangle-test.spec.ts
npx playwright test version-test.spec.ts


Test Data

 Triangle API Test Cases

| Test Case ID | Input Arguments           | Expected Result/Error                        | Status Code |
|--------------|---------------------------|----------------------------------------------|-------------|
| TC01         | `[10, 10, 10]`            | Equilateral                                  | 200         |
| TC02         | `[10, '@', 1]`            | All sides should be numeric                 | 422         |
| TC03         | `[10, 10]`                | Triangle should have 3 sides                | 422         |
| TC04         | `[10, 10, 10, 5]`         | Invalid input                                | 422         |


  Version Endpoint Test Cases

| Test Case ID | Method | Input | Expected Result/Error | Status Code |
|--------------|--------|-------|-----------------------|-------------|
| VC01         | GET    | None  | Version string        | 200         |
| VC02         | POST   | None  | I'm a Teapot          | 418         |
| VC03         | PUT    | None  | I'm a Teapot          | 418         |


Notes :
- The `/version` endpoint currently returns `418 I'm a Teapot` for unsupported methods like `POST` and `PUT`. While unconventional, this behavior is documented in the test cases.
- Tests for triangle calculations are based on the assumption that invalid inputs (e.g., non-numeric sides or missing sides) are explicitly rejected with appropriate status codes and error messages.
- The test harness does not mock API responses. It validates against live API responses as they are.



