# Handlebars Compiler

![](https://travis-ci.org/IvoVermeer/npm-handlebars-compiler.svg?branch=master)

[Handlebars Compiler](https://www.npmjs.com/package/handlebars-compiler "Package on npmjs.com") will compile your handlebars template files into a single .js file using handlebars [precompiler](http://handlebarsjs.com/precompilation.html). The templates are inserted into `Handlebars.templates`.

It provides a `.run()` method to process the templates once.The provided `.watch()` method will `fs.watch()` your templates folder and is provided for use in a live server such as [live-server](https://www.npmjs.com/package/live-server).

## Installing

Install the compiler using `npm install handlebars-compiler`.

## Usage

``` javascript
    const handlebarsCompiler = require('handlebars-compiler');
    const templatesCompiler = handlebarsCompiler.setup('templates', 'html', 'public/js/templates.js');

    // templatesCompiler will now offer two functions:
    templatesCompiler.run();
    // will run the compiler once as:
    // handlebars templates -e html -f public/js/templates.js

    templatesCompiler.watch();
    // will setup a watcher on your templates folder and
    // update the ../templates.js file when you modify a template.
```

#### setup()

>`.setup(watchFolder, extension, output)`

Setup the compiler to watch the `watchFolder`, for files with a specific `extension` and compile it to `output`. `output` should be included in your index.html or loaded into your app any other way you wish.
Returns a new object with the `.run()` and `.watch()` functions.

#### run()

>`.run([callback])`

Will run `handlebars` just once as `handlebars watchFolder -e extension -f output`.
The `callback` is optional. If not provided, it will log default information to the console.

#### watch()

>`.watch([callback])`

Will setup an `fs.watch()` on the watchfolder, running `.run()` every time a modification is triggered.
The `callback` here is passed to the   `.run()` function and is optional as well.

## Contributing

Feel free to contribute, just fork and do a pull request!

Once downloaded, run `npm install` for dependencies. Run `npm test` (or `mocha`) to run the tests.

`test/templates/testExtraTemplate.html` and `test/public/js/templates.js` are ignored in `.gitignore`. Make sure you add any files not needed in the repo(ie. created by any extra tests you write).
