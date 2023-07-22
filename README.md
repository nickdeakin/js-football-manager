
# Express TypeScript Boiler Plate

A near enough empty project with boiler plate code for a node express project, configured with
- tyescript
- eslint
- prettier
- jest
- husky

## Getting started

Clone the project
```
git clone https://github.com/nickdeakin/express-typescript-boilerplate
```

Install dependencies
```
npm i
```

Run it
```
npm run local
```

## Validation

Immediately, you can run `npm run validate`, which will *lint*, *format* and *test* the project.

This is hooked into pre-commit with husky to enforce quality code, and will automatically run when a *git commit* is initiated.

When *test* is run, the results are output to the console, and a coverage directory is produced. Go ahead and open *coverage/lcov-report/index.html* in a browser.

## Make it yours

From here, you can update the package.json with your project information, make changes to the src and commit it to your own github/lab/(other) code repository.

Run it with `npm run local:watch` to make changes and have it update automatically.

Build it with `npm run build` and run the build with `npm run start`.

## License

[ISC](https://choosealicense.com/licenses/isc/)

## Authors

- [@nickdeakin](https://www.github.com/nickdeakin)
