# Oberon Client

> Frontend client for Oberon chat built in React and Redux

## Development

### Development Environment

The Oberon chat client requires the following packages to be installed:

- Node >= 6

Then install global packages:

```
npm --global install node-sass yarn
```

Install local packages:

```
yarn install
```

### Development Server

To start the Oberon chat client:

1. Create a `.envrc` file. Use the example file as a starting point: `cp .envrc.example .envrc`.

1. (Optional) Update values in `.envrc` to match the development environment.

1. Start the client server `yarn start`.

1. To ensure client authentication works correctly, configure a DNS
   service to route traffic from `localhost:4030` to `chat.dev`. We recommend
   using [puma-dev](https://github.com/puma/puma-dev).

**Note:** the client can also be run as a desktop application using `yarn
electron`.
