Angular Redux
=========================

[![Build Status](https://img.shields.io/travis/bcarroll22/ng-component-redux/master.svg?style=flat-square)](https://travis-ci.org/bcarroll22/ng-component-redux) [![npm version](https://img.shields.io/npm/v/ng-component-redux.svg?style=flat-square)](https://www.npmjs.com/package/ng-component-redux)

Angular component bindings for [Redux](https://github.com/reactjs/redux).
Inspired by [ng-redux](https://github.com/angular-redux/ng-redux) and [react-redux](https://github.com/reactjs/react-redux). A great way to manage application state in component-based applications.

## Advantages
[@wbuchwalter](https://github.com/wbuchwalter) did a great job with [ng-redux](https://github.com/angular-redux/ng-redux), and if you need to use Redux with an earlier version of Angular, be sure to check out his package. The main motivation for building this package was having the ability to build Angular 1.5 applications with Redux bindings that were component based, just like the React bindings.

Possibly the single greatest advantage of this package is that nearly all code that is written for react-redux can be directly ported to an Angular application using this package. This is because the `connect` function to create connected components works the same way, and stores are configured and used in the application almost entirely the way you would in a react-redux application.
The only exception is that this package provides a helper function that will allow you to get Angular dependencies to use in middleware. This helper can be accessed via `import injector from 'ng-component-redux'`

## Installation

This package requires Angular 1.5.3 or higher. This is because this package relies on Angular 1.5's `.component()` method, and also takes advantage of the lifecycle hooks introduced in v1.5.3.

To install this package, run:
```
npm i -S ng-component-redux
```
The preferred method of using this package is with a build system such as Browserify or Webpack and npm. If, however, you don't yet use a modern build system or npm, you can include the pre-built UMD module which can be found in the dist directory, and access it via the global `AngularRedux` object. This is not a recommended approach since many complementary redux packages are only available via npm.

## Todo
- [ ] Examples
- [ ] API documentation (In the meantime, take a look at [react-redux documentation](https://github.com/reactjs/react-redux/tree/master/docs))

## License
MIT

## Credits
Huge thank you to [@gaearon](https://github.com/gaearon/) for creating [redux](https://github.com/reactjs/redux) and [the official React bindings](https://github.com/reactjs/react-redux). This package was heavily based off of and inspired by the React bindings.

Also, many thanks to [@wbuchwalter](https://github.com/wbuchwalter) for building ng-redux, which allowed me to gain my first exposure to Redux in an Angular 1.x application.
