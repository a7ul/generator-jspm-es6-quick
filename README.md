# generator-jspm-es6-quick [![NPM version][npm-image]][npm-url]

[![Dependency Status][daviddm-image]][daviddm-url]
> yo generator for projects using jspm es6 sass along with optional react or angular or vanilla es6 . Supports live reload . No nonsense . No task runners required. Peace of mind B)

## Installation

First, install [Yeoman](http://yeoman.io) and generator-jspm-es6-quick using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-jspm-es6-quick
```

Then generate your new project:

```bash
yo jspm-es6-quick
```

##Features

- ES6 - using babel/traceur (jspm)
- JSPM - for module loading
- SASS
- Live Reload ( via browser-sync using npm scripts)
- Angular / No Frameworks
- Doesn't Use Gulp or any task runner. Thanks to awesome JSPM :)

##How to use the generated project



###To start the app in development mode (No bundling)

`npm run serve`

This launches a development server from browser-sync and watches for any change in files

For managing dependencies,css,etc use jspm

###For production build

`npm run bundle`

This creates a bundle file in bundle/ which is injected in config by jspm. So now jspm uses the bundled file to load the frontend app.

Hence the file system structure remains same for both production and development .. Jspm handles both the workflows seamlessly.

##Notes

The files like JS, CSS,etc which are to be bundled go inside `src/` and are managed using jspm's import and module loaders .

The files like images, assets , html views ,etc which are not to be bundled along are to be kept in `assets/`.

Thus, when we run `npm run bundle` it only creates a bundle of the files in src

I hope this boilerplate serves u well :D

##More Details ?

For more details on how to use the generator checkout
[https://github.com/master-atul/jspm-es6-boilerplate](https://github.com/master-atul/jspm-es6-boilerplate)

The generator is based on the above project

## Getting To Know Yeoman

Yeoman has a heart of gold. He&#39;s a person with feelings and opinions, but he&#39;s very easy to work with. If you think he&#39;s too opinionated, he can be easily convinced. Feel free to [learn more about him](http://yeoman.io/).

## License

MIT © [Atul](http://atulr.com)


[npm-image]: https://badge.fury.io/js/generator-jspm-es6-quick.svg
[npm-url]: https://npmjs.org/package/generator-jspm-es6-quick
[travis-image]: https://travis-ci.org/master-atul/generator-jspm-es6-quick.svg?branch=master
[travis-url]: https://travis-ci.org/master-atul/generator-jspm-es6-quick
[daviddm-image]: https://david-dm.org/master-atul/generator-jspm-es6-quick.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/master-atul/generator-jspm-es6-quick
