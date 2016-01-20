var TIME_ZONE = (
  process.env.SAUCE_TIMEZONE ||
  (process.env.TZ || '').split('/')[1]
);

var customLaunchers = [
  37,
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
    timeZone: TIME_ZONE
  };

  return launchers;
}, {});

module.exports = function(config) {
  const options = {
    frameworks: ['mocha'],
    files: [
      'node_modules/chai/chai.js',
      'node_modules/babel-polyfill/dist/polyfill.js',
      'test/**/*.spec.js'
    ],
    preprocessors: {
      'test/**/*.js': ['babel']
    },
    client: {
      args: [TIME_ZONE]
    },
    reporters: ['dots'],
    colors: true,
    autoWatch: true,
    singleRun: true,
    concurrency: Infinity,
    babelPreprocessor: {
      options: {
        presets: ['es2015']
      }
    },
    browsers: ['Chrome']
  };

  if (process.env.SAUCE_USERNAME && process.env.SAUCE_ACCESS_KEY) {
    options.reporters.push('saucelabs');
    options.customLaunchers = customLaunchers;
    options.browsers = Object.keys(customLaunchers);
    options.sauceLabs = {
      testName: 'Date tests',
      tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
    };
  }

  config.set(options);
};
