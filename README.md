# Next.js TypeScript Material UI quality checking project

Includes TypeScript, Material UI, ESLint, Jest, and React Testing Library

## Deploy your own

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=next-example):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/MileTwo/nextjs-typescript-material-ui-eslint-jest)

## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example https://github.com/MileTwo/nextjs-typescript-material-ui-eslint-jest
# or
yarn create next-app --example https://github.com/MileTwo/nextjs-typescript-material-ui-eslint-jest
```

Deploy it to the cloud with [Vercel](https://vercel.com/new?utm_source=github&utm_medium=readme&utm_campaign=next-example) ([Documentation](https://nextjs.org/docs/deployment)).

## Scripts

All scripts can be run by prefixing with `npm run`, for example `npm run build`

### build

Builds the production application in the .next folder.

### dev

Starts the application in development mode with hot-code reloading, error reporting, and more:

The application will start at http://localhost:3000 by default. The default port can be changed with -p, like so:

```bash
npm run dev -p 4000
```

### format

Runs ESLint and Prettier auto-formatting.

### lint

Runs ESLint static code analysis based on your `.eslintrc` configuration

### start

Starts the application in production mode. The application should be compiled with `npm run build` first.

The application will start at http://localhost:3000 by default. The default port can be changed with -p, like so:

```bash
npm run start -p 4000
```

### test

Runs Jest unit tests to validate changes between commits

### type-check

Runs TypeScript compiler to validate there are no type errors between commits

### quality

Runs `type-check`, `lint`, and `test` to make an better developer experience catching preventable quality errors.
