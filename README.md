([French version](README-fr.md))

# mocha-error-reporters

When a test fails due to an unexpected error, mocha-error-reporters appends the full error in JSON format to the test report.

## Test report example
```
1 passing (5ms)
  1 failing

  1) Test Example
       Test with error:
     Error: Pow!
      at Context.it (test/testData/testExample.js:9:17)
  
  Full Error:
  {
    "additionnalAttribute": "The key to understand this bug",
    "name": "Error",
    "message": "Pow!",
    "stack": "Error: Pow!\n    at Context.it (test/testData/testExample.js:9:17)"
  }
```

Without mocha-error-reporters, the Full Error section would ne be present and it would be impossible to read ```additionnalAttribute``` which may be *the key to understand this bug*. All additionnal attributes (ex: inner error) will be fully serialized; thanks to the npm package [serialize-error](https://www.npmjs.com/package/serialize-error).

## To Install

In your project, run this npm command:

``` npm install mocha-error-reporters --save-dev ```

## Usage
Call mocha with:

`mocha --require mocha-error-reporters --reporter=specWithFullErrors`

mocha-error-reporters provides 8 reporters:
*  [specWithFullErrors](https://mochajs.org/#spec)
*  [minWithFullErrors](https://mochajs.org/#min)
*  [dotWithFullErrors](https://mochajs.org/#dot-matrix)
*  [listWithFullErrors](https://mochajs.org/#list)
*  [nyanWithFullErrors](https://mochajs.org/#nyan)
*  [xUnitWithFullErrors](https://mochajs.org/#xunit)
*  [progressWithFullErrors](https://mochajs.org/#progress)
*  [landingWithFullErrors](https://mochajs.org/#landing-strip) 

## Custom reporters
Mocha [allows you to define custom reporters](https://github.com/visionmedia/mocha/wiki/Third-party-reporters). 

The code snippet below shows how unexpected errors can be serialized in your custom reporters. 

```javascript
const { extendReporterWithFullErrors } = require('mocha-error-reporters');
const yourCustomReporter;
const yourCustomReporterWithFullErrors = extendReporterWithFullErrors(yourCustomReporter);
```

## License

The source code of this project is distributed under the [MIT License](LICENSE).

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## Code of Conduct

Participation in this poject is governed by the [Code of Conduct](CODE_OF_CONDUCT.md).
