// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-junit-reporter'),
      require('karma-coverage'),
      require('karma-sonarqube-unit-reporter'),
      require('karma-coverage-istanbul-reporter')
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/SDR-WebApp'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }, 
        {type: 'lcov',dir:'test/karma-coverage/coverage/lcov'}
      ]
    },
    junitReporter: {
     outputDir: 'testresults/junit',
     outputFile: 'unit-test-result.xml',
     useBrowserName: false
    },
    coverageReporter: {
     type : 'cobertura',
     dir : 'testresults',
     subdir:'coverage',
     file: 'coverage.xml'
    },
    sonarQubeUnitReporter: {
      sonarQubeVersion: 'LATEST',
      outputDir: "testresults/junit",
      outputFile: 'unit-test-result.xml',
      overrideTestDescription: true,
      testPaths: ['./src'],
      testFilePattern: '.spec.ts',
      useBrowserName: false
    },
    coverageIstanbulReporter: {
      // reports can be any that are listed here: https://github.com/istanbuljs/istanbuljs/tree/73c25ce79f91010d1ff073aa6ff3fd01114f90db/packages/istanbul-reports/lib
      reports: ['html', 'lcovonly', 'text-summary', 'cobertura'],
 
      // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
      dir: 'testresults/coverage',
 
      // Combines coverage information from multiple browsers into one report rather than outputting a report
      // for each browser.
      combineBrowserReports: true,
 
      // if using webpack and pre-loaders, work around webpack breaking the source path
      fixWebpackSourcePaths: true,
 
      // Omit files with no statements, no functions and no branches covered from the report
      skipFilesWithNoCoverage: true,
 
      // Most reporters accept additional config options. You can pass these through the `report-config` option
      'report-config': {
        // all options available at: https://github.com/istanbuljs/istanbuljs/blob/73c25ce79f91010d1ff073aa6ff3fd01114f90db/packages/istanbul-reports/lib/html/index.js#L257-L261
        html: {
          // outputs the report in ./coverage/html
          subdir: 'html'
        }
      },
    },
    reporters: ['progress', 'kjhtml','coverage','junit',"sonarqubeUnit",'coverage-istanbul'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};
