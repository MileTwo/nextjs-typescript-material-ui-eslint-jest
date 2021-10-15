# 🚨 Archived and moved to [MileTwo/nextjs-ts](https://github.com/MileTwo/nextjs-ts) 🚨

We archived this repository for two reasons
- This repo is used in our CLI tool for creating new nextjs projects [create-m2-app](https://www.npmjs.com/package/create-m2-app). In our version <0.4.x we had three templates in this one repository: `next`, `next-prisma-rest`, and `nest-prisma-graphql`. We wanted to rename it but if we did so it would cause breaking changes to the users using `create-m2-app` with older versions.
-  This repository serving as three repo's was challenging us to maintain and review PR's. We realized this wasn't going to be easy to maintain and share the load for open source maintanance. So we decided to split them up. In the split up version 0.4.0 of `create-m2-app` split out the [prisma-rest](https://github.com/MileTwo/nextjs-ts-prisma-rest) and the [prisma-graphql](https://github.com/MileTwo/nextjs-ts-prisma-auto-graphql) repositories. In version `0.5.0` we archived the repository you are viewing and moved it to [nextjs-ts](https://github.com/MileTwo/nextjs-ts).

Huge shoutout to all the contributors and maintainers on this project! You should still see yourself on our all-contributors list in the new repository

# Next.js TypeScript Material UI quality checking project
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-6-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Includes TypeScript, Material UI, ESLint, Jest, and React Testing Library

-   [Deploy your own](#deploy-your-own)
-   [How to use](#how-to-use)
-   [Scripts](#scripts)
    -   [build](#build)
    -   [dev](#dev)
    -   [format](#format)
    -   [lint](#lint)
    -   [start](#start)
    -   [test](#test)
    -   [type-check](#type-check)
    -   [quality](#quality)
-   [Accessibility ](#accessibility)

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

```bash
npm run build
```

### dev

Starts the application in development mode with hot-code reloading, error reporting, and more:

The application will start at http://localhost:3000 by default. The default port can be changed with -p, like so:

```bash
npm run dev -- -p 4000
```

### format

Runs ESLint and Prettier auto-formatting.

```bash
npm run format
```

### lint

Runs ESLint static code analysis based on your `.eslintrc` configuration

```bash
npm run lint
```

### start

Starts the application in production mode. The application should be compiled with `npm run build` first.

The application will start at http://localhost:3000 by default. The default port can be changed with -p, like so:

```bash
npm run start -p 4000
```

### test

Runs Jest unit tests to validate changes between commits

```bash
npm run test
```

### type-check

Runs TypeScript compiler to validate there are no type errors between commits

```bash
npm run type-check
```

### quality

Runs `type-check`, `lint`, and `test` to make an better developer experience catching preventable quality errors.

```bash
npm run quality
```

## Accessibility

### @axe-core/react

Runs in development environment and logs accessibility error results in dev tools console. Tool implementation is in `pages/_app.tsx`.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://johnfay.dev"><img src="https://avatars.githubusercontent.com/u/46365891?v=4?s=100" width="100px;" alt=""/><br /><sub><b>John Fay</b></sub></a><br /><a href="https://github.com/MileTwo/nextjs-typescript-material-ui-eslint-jest/commits?author=keonik" title="Code">💻</a> <a href="https://github.com/MileTwo/nextjs-typescript-material-ui-eslint-jest/commits?author=keonik" title="Documentation">📖</a> <a href="#maintenance-keonik" title="Maintenance">🚧</a> <a href="#infra-keonik" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a></td>
    <td align="center"><a href="http://renestep.com"><img src="https://avatars.githubusercontent.com/u/22155535?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Ren Estep</b></sub></a><br /><a href="https://github.com/MileTwo/nextjs-typescript-material-ui-eslint-jest/commits?author=storiesOfRen" title="Code">💻</a> <a href="#a11y-storiesOfRen" title="Accessibility">️️️️♿️</a> <a href="#maintenance-storiesOfRen" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://heystevegray.dev/"><img src="https://avatars.githubusercontent.com/u/66500112?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Steve Gray</b></sub></a><br /><a href="https://github.com/MileTwo/nextjs-typescript-material-ui-eslint-jest/commits?author=heystevegray" title="Code">💻</a> <a href="https://github.com/MileTwo/nextjs-typescript-material-ui-eslint-jest/commits?author=heystevegray" title="Documentation">📖</a> <a href="#maintenance-heystevegray" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/jenniferOlsen"><img src="https://avatars.githubusercontent.com/u/5099732?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Jenny Olsen</b></sub></a><br /><a href="https://github.com/MileTwo/nextjs-typescript-material-ui-eslint-jest/commits?author=jenniferOlsen" title="Documentation">📖</a></td>
    <td align="center"><a href="https://github.com/bcanfield"><img src="https://avatars.githubusercontent.com/u/12603953?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Brandin Canfield</b></sub></a><br /><a href="#maintenance-bcanfield" title="Maintenance">🚧</a> <a href="#infra-bcanfield" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#security-bcanfield" title="Security">🛡️</a></td>
    <td align="center"><a href="http://linkedin.com/in/lucasguissgusmao"><img src="https://avatars.githubusercontent.com/u/37088202?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Lucas Guiss Gusmão</b></sub></a><br /><a href="https://github.com/MileTwo/nextjs-typescript-material-ui-eslint-jest/commits?author=lucasguiss" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
