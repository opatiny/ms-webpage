# A debug web page for my micromouse robot

## Introduction

This repository contains a React GUI for the debug of my micromouse project: [`opatiny/micromouse`](https://github.com/opatiny/micromouse). The development of the page is done in this repository and run locally to facilitate debug. It is then built and uploaded on the robot, which will serve it as a web page over WiFi.

## Development

Use the command `npm run dev` in order to compile the project on the fly and serve it locally.

## Build

The project can be built into standard JS using

```
npm run build
```

To ensure the build works whatever the IP address of the robot is, remove all occurrences of the IP in the `build/assets/index-XXX.js` file.

Serve to check result:

```
npx http-server
```
