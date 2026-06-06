# @automatons/typescript-client-axios
[![CI/CD](https://github.com/openapi-automatons/typescript-client-axios/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/openapi-automatons/typescript-client-axios/actions/workflows/ci-cd.yml)
[![codecov](https://codecov.io/gh/openapi-automatons/typescript-client-axios/branch/main/graph/badge.svg)](https://codecov.io/gh/openapi-automatons/typescript-client-axios)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![npm downloads](https://img.shields.io/npm/dw/@automatons/typescript-client-axios)](https://www.npmjs.com/package/@automatons/typescript-client-axios)

## What is @automatons/typescript-client-axios
This is the [axios](https://axios-http.com/) client generator for openapi-automatons.
Only use it via openapi-automatons.

Since v2 this package is **ESM-only** and requires **Node.js >= 22**. `axios` is a peer dependency.

Each generated operation returns a `Promise<AxiosResponse<T>>`, so consumers can write
`const { data } = await api.xxx()`. Non-2xx responses reject (axios default).

## Generated client
```ts
import axios from "axios";
import { PetsApi } from "./clients";

const api = new PetsApi({
  axios, // optional: a custom axios instance
  security: { bearerAuth: () => getToken() }, // auth for the document's security schemes
});

const { data } = await api.showPetById("1");
```

## How can I use @automatons/typescript-client-axios?
This library is designed to be used by [openapi-automatons](https://github.com/openapi-automatons/openapi-automatons).
Please read the [readme](https://github.com/openapi-automatons/openapi-automatons/blob/main/README.md) of [openapi-automatons](https://github.com/openapi-automatons/openapi-automatons) for how to use it.
