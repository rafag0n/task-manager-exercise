# Task Manager Exercise

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

You can alternatively build and run:

```bash
npm run build && npm run start
# or
yarn build && yarn start
```

## Summary of Strategies

### Front-End

- It was built using a design system of atoms-molecules-organisms for future usage. Components could be further divided in different files for better organization;
- The main component, TaskForm, was built to be reused by both update and create pages;
- Deletion would benefit of a modal asking users to confirm their action;
- Pagination would be benefitial as well;

### Back-End

- I started building a memory storage class. However, next.js in development
wasn't friendly with it, so I decided to move to a plain JSON storage. A decorator could cleanup the calls to fetch/write the file, but overall it wouldn't scale nicely, being only usable at this exercise;
- There is a clear division of layers routers -> controllers -> repository to enable future usage of other repository or router layers, allowing other architectures such as REST/graphQL and other database solutions;
- Each layer was built to enable easy mocking and testability - which couldn't be done within the timeframe provided.
