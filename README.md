# Foal Monorepo Example

Boilerplate for an application with a selection of technologies.

## Prerequisites

1. Install [Node.js](https://nodejs.org/)
2. Install [Yarn](https://yarnpkg.com/)
3. Install [Docker](https://www.docker.com/)
4. Install [`path-exists`](https://www.npmjs.com/package/path-exists-cli)
    ```sh
    yarn global add path-exists-cli
    ```
5. Install [VS Code](https://code.visualstudio.com/)

## Getting Started

1. Install all dependencies from the root of the project

```sh
yarn install
```

2. Start the database.
   ```sh
   docker compose up -d
   ```
3. Open `app.code-workspace` with VS Code.
4. Press `F5` or go to the `Run and Debug` section and launch `Debug (workspace)`.
5. This will launch the server and the client. The debugger automatically pauses when the server starts. Click the `Continue` button to continue launching the app.

## Technologies

- [TypeScript](https://www.typescriptlang.org/)
- [Foal](https://foalts.org/)
- [TypeORM](https://typeorm.io/)
- [Create React App](https://create-react-app.dev/)
- [Docker](https://www.docker.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Redux](https://redux.js.org/)
- [Redux Saga](https://redux-saga.js.org/)
- [Jest](https://jestjs.io/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Yarn](https://yarnpkg.com/)
- [Husky](https://typicode.github.io/husky/)

## Philosophy

The first thing you'll notice is that this project is built as a monorepo. By managing all of the pieces of the system in a single place, this aids in velocity as the entire system can be modified at the same time. 

The different packages are separated using ideas outlined in [_Righting Software_](https://rightingsoftware.org/). This document will go in to a high-level explanation of each of the layers.

```
Utility
  ⬇️
Access
  ⬇️
Engine
  ⬇️
Manager
  ⬇️
 App
```

Packages in a given layer can use packages in a layer below them but never above them. The only time a project can reach "across" in a layer is when using a "common". "Common" packages can be thought of as a base package for a given layer.  They should provide functionality that is useful across the layer.

### Utility

Utility projects provide tools that are helpful across multiple layers. Think of things like logging, type helpers, etc. Utility folders are notorious for becoming dumping grounds for everything. Here, utility projects should be thought of as extensions of the standard library. If some functionality is useful across layers, it is likely a utility project.

### Access

The access layer deals with accessing data sources. This is where everything to do with the database is handled.  They should act as a layer of abstraction over the database rather than a 1:1 translation. For example, the `@access/task` package actually uses a `todo` table internally but a `todo` is only one version of a potential "task".  Therefore, `@access/task` exposes it's data as "tasks" rather than the low-level "todo".

Access layer packages are only all allowed to reference Utility packages.

### Engine

Engines are responsible for things like validation and transformation. One way to think of them is as logic units. They should create and validate data in a way that makes the work in a Manager simpler.

Engine layer packages are allowed to reference Utility and Access packages.

### Manager

Managers are responsible for business logic. They should be capable of taking in minimal data and executing an entire use case. The goal is to make them read in nearly simple language.

Manager layer packages are allowed to reference Utility, Access, and Engine packages.

### App

The App layer is really any sort of end-user level application. In this case, we have a server and client.

#### Server

The server acts as the orchestrator of interactions. It's allowed to call in to Managers and relays those calls to the web client.

#### Client

The client is a graphical front-end for the server. The intended design is to use a [backend for frontend](https://samnewman.io/patterns/architectural/bff/) pattern. All of the logic lives on the server and the client acts as a dumb terminal for that logic.

## Creating New Packages

To make it easier to create your own packages for each layer, there is a `new` script. The script takes in a package type (as defined by layer) and a name. It will take care of putting together the necessary boilerplate for you.

```
Usage: yarn new [type] [name]
```

### Example

```sh
$ yarn new engine validation
```
