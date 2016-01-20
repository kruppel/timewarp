var customLaunchers = [
  38,
  39,
  40,
  41,
  42,
  43,
  44,
  45,
  46,
  47
].reduce(function(launchers, version) {
  launchers['chrome_' + version] = {
    base: 'SauceLabs',
    browserName: 'chrome',
    platform: 'Windows 7',
    version: version + '',
    timeZone: 'Tokyo'
  };

  return launchers;
}, {});

module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],
    files: [
      'node_modules/chai/chai.js',
      'node_modules/babel-polyfill/dist/polyfill.js',
      'test/**/*.spec.js'
    ],
    preprocessors: {
      'test/**/*.js': ['babel']
    },
    reporters: ['dots', 'saucelabs'],
    colors: true,
    autoWatch: true,
    singleRun: true,
    concurrency: Infinity,
    babelPreprocessor: {
      options: {
        presets: ['es2015']
      }
    },
    sauceLabs: {
      testName: 'Date tests',
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
    },
    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers),
  })
};
