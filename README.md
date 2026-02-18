# Birl Tech Test

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, start the development server:

```bash
npm run dev
```

In a new terminal, run the type checker in watch mode:

```bash
npm run typecheck:watch
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

A mock DB has been provided using static data found in `./src/db` along with some helper functions to query the data. You can use these functions to retrieve the data you need for the dashboard. The data is structured as follows:

- `customers`: An array of customer objects, each with an `id`, `firstName`, `lastName`, and `email`.
- `orders`: An array of order objects, each with an `id`, `customerId`, `product`, and `amount`.

## Goal

A developer has been tasked with creating a dashboard and they have only got part way through the build. They have asked you to take over and finish the work. The dashboard is designed to display customers and their orders. The developer has introduced a number of bugs into the system that they have not had time to fix. Your task is to fix the bugs and add a new feature to the system.

During this tech test, you will be asked to interrogate a mock dashboard that displays customers and their orders. You will be required to look at a number of bugs that have been introduced into the system and fix them. You will also be asked to add a new feature to the system. The test is designed to be completed within 30 minutes, but feel free to take as much time as you need in the slot we have. This is not a test of how much you can get done, but rather how you approach the problems and the quality of your code.

The test is designed to cover front-end and back-end development skills.

### What we're looking for:

1. How you structure your code and handle core functionality.
2. How you approach and identify potential issues in the system and how you go about fixing them.
3. Your thought process throughout the test and how you communicate your ideas and solutions.

### Requirements:

1. A user should be able to view a list of customers and their associated orders on the dashboard.
2. New feature: A user should be able to view a customer detail page by the customer's first name and last name in slug format (e.g. `/customers/john-doe`) that displays the customer's details and a list of their orders.
3. A user should be able to search and view a list of orders.
4. A user should be able to click and view a specific order in detail along with the customer associated with that order.
5. The dev environment should run on `localhost:3000` without any errors.

### FYI:

- The mock DB is not connected to a real database, so you will need to use the provided functions to query the data.
- The dashboard is built using React and TypeScript, but you are free to use any additional libraries or tools that you think would be helpful in completing the task.
- The focus of this test.
- There are active bugs so be sure to test the application thoroughly and identify any issues that may arise.

### Considerations after the initial test is complete:

1. How will errors be handled?
2. How might missing/incomplete data be handled?
3. How will you test your application?
4. Given more time, how would you extend the application?
