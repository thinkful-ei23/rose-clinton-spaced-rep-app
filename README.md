# UnHidden Figures
> Giving top women scientists the recognition they deserve.

## [Live App](https://un-hidden-figures-app-client.herokuapp.com/)
( Test Account: &nbsp; **testuser** &nbsp; / &nbsp; **password** )

UnHidden Figures is a learning application that uses a spaced repetition algorithm to teach users the names of influential women scientists. It presents a photo and an interesting fact about each scientist and requires the user to enter that scientist's name. Scientists that a user continuously identifies correctly will appear less and less frequently, while those that the user struggles with will appear more often.

![](images/screenshot-1.png)
![](images/screenshot-2.png)
![](images/screenshot-3.png)
![](images/screenshot-4.png)
![](images/screenshot-5.png)
![](images/screenshot-6.png)

<!-- ## Installation

OS X & Linux:

```sh
npm install my-crazy-module --save
```

Windows:

```sh
edit autoexec.bat
``` -->

<!-- ## Usage example

A few motivating and useful examples of how your product can be used. Spice this up with code blocks and potentially more screenshots. -->

<!-- _For more examples and usage, please refer to the [Wiki][wiki]._ -->

## Technology Stack
**Front End**:
* React (via [create-react-app](https://github.com/facebook/create-react-app)), React Router
* Redux, Redux Thunk, Redux Form
* JavaScript
* HTML, CSS

**Back End** ([Server GitHub Repo](https://github.com/thinkful-ei23/rose-clinton-spaced-rep-server))
* Node
* Express
* Passport, bcrypt (Local & JWT Authentication)
* Mongoose
<!-- * Mocha, Chai (Testing) -->

**Database**
* MongoDB

**Deployment**
<!-- **CICD** -->
<!-- * Mocha, Chai -->
<!-- * TravisCI -->
* Heroku
* mLab

## Main Project Structure

```
spaced-rep-client/
├── node_modules/ (see "Development Setup")
├── public/
│   └── index.html (static markup)
├── src/
│   ├── actions/
│   ├── components/
│   │   └── App.js (top-level component)
│   ├── reducers/
│   ├── index.js (renders `App` to index.html)
│   └── store.js (Redux store)
├── package.json (NPM dependencies)
└── README.md
```

## Development setup

To clone the repo to your local development environment, execute the following commands (requires [Node](https://nodejs.org)).

```sh
# Clone the repo
git clone https://github.com/clintonowen/kando-mvp-client.git

# Move into the project directory
cd kando-mvp-client

# Install dependencies (in /node_modules/)
npm i

# Run the test-suite:
npm test

# Run the app:
npm start
```

<!-- ## Release History

* 0.2.1
    * CHANGE: Update docs (module code remains unchanged)
* 0.2.0
    * CHANGE: Remove `setDefaultXYZ()`
    * ADD: Add `init()`
* 0.1.1
    * FIX: Crash when calling `baz()` (Thanks @GenerousContributorName!)
* 0.1.0
    * The first proper release
    * CHANGE: Rename `foo()` to `bar()`
* 0.0.1
    * Work in progress -->

## Contributing

1. Fork it (<https://github.com/yourname/yourproject/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## Authors

* Clinton Owen – [@CoderClint](https://twitter.com/CoderClint) │ clint@clintonowen.com │ [https://github.com/clintonowen](https://github.com/clintonowen)
* Rose Sorfa – rsorfa@gmail.com │ [https://github.com/Slinkys](https://github.com/Slinkys)

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[wiki]: https://github.com/yourname/yourproject/wiki