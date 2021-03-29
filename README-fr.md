([Version anglaise](README.md))
<a id='french-version' class='anchor' aria-hidden='true'></a>

# mocha-error-reporters

Lorsqu'un test échoue à cause d'une erreur inattendue, mocha-error-reporters ajoute l'erreur complète en format JSON au rapport de test.

## Exemple de rapport de test
```
1 passing (5ms)
  1 failing

  1) Test Example
       Test with error:
     Error: Pow!
      at Context.it (test/testData/testExample.js:9:17)
  
  Full Error:
  {
    "additionnalAttribute": "Essentiel pour comprendre ce bogue",
    "name": "Error",
    "message": "Pow!",
    "stack": "Error: Pow!\n    at Context.it (test/testData/testExample.js:9:17)"
  }
```
Sans mocha-error-reporters, la section Full Error ne serait pas présente et il serait impossible de lire l'attribut ```additionnalAttribute``` qui est peut être *essentiel pour comprendre ce bogue*. Tous les attributs supplémentaires (ex: inner error) seront sérialisés correctement; grâce au package npm [serialize-error](https://www.npmjs.com/package/serialize-error).

## Installation

Dans votre projet, exécutez cette commande npm:

``` npm install mocha-error-reporters --save-dev ```

## Utilisation
Appelez mocha avec:

`mocha --require mocha-error-reporters --reporter=specWithFullErrors`

mocha-error-reporters comprend 8 reporters:
*  [specWithFullErrors](https://mochajs.org/#spec)
*  [minWithFullErrors](https://mochajs.org/#min)
*  [dotWithFullErrors](https://mochajs.org/#dot-matrix)
*  [listWithFullErrors](https://mochajs.org/#list)
*  [nyanWithFullErrors](https://mochajs.org/#nyan)
*  [xUnitWithFullErrors](https://mochajs.org/#xunit)
*  [progressWithFullErrors](https://mochajs.org/#progress)
*  [landingWithFullErrors](https://mochajs.org/#landing-strip) 

## Reporters personnalisés
Mocha [vous permet de définir des reporters personnalisés](https://github.com/visionmedia/mocha/wiki/Third-party-reporters). 

L'extrait de code ci-dessous montre comment les erreurs inattendues peuvent être sérialisées dans vos reporters personnalisés

```javascript
const { extendReporterWithFullErrors } = require('mocha-error-reporters');
const yourCustomReporter;
const yourCustomReporterWithFullErrors = extendReporterWithFullErrors(yourCustomReporter);
```

## Licence et propriété intellectuelle

Le code source de ce projet est libéré sous la licence [MIT License](LICENSE).

## Contribuer

Voir [CONTRIBUTING.md](CONTRIBUTING.md)

## Code de Conduite

La participation à ce projet est réglementée par le [Code de Conduite](CODE_OF_CONDUCT.md)
