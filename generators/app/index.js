'use strict';
//Require dependencies
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

var welcome =
  '\n     _-----_' +
  '\n    |       |' +
  '\n    |' + '--(o)--' + '|   .--------------------------.' +
  '\n   `---------´  |    ' + 'Welcome to Yeoman,' + '    |' +
  '\n    ' + '( ' + '_' + '´U`' + '_' + ' )' + '   |   ' + 'JSPM ES6 Generator!  ' + '  |' +
  '\n    /___A___\\   \'__________________________\'' +
  '\n     |  ~  |' +
  '\n   __' + '\'.___.\'' + '__' +
  '\n ´   ' + '`  |' + '° ' + '´ Y' + ' `\n';

console.log(welcome);


module.exports = yeoman.generators.Base.extend({
  //Configurations will be loaded here.
  //Ask for user input
  prompting: function() {
    var done = this.async();
    var vm = this;

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'Your project name',
      //Defaults to the project's folder name if the input is skipped
      default: 'testApp',
      validate: function(choice) {
        return (choice.indexOf(' ') === -1) ? true : (function() {
          console.log('\nNo space in name ! Enter again !');
          return false;
        }());
      }
    }, {
      type: 'input',
      name: 'description',
      message: 'Project description',
      default: 'jspm es6 project'
    }, {
      type: 'input',
      name: 'author',
      message: 'Author',
      default: vm.user.git.name() + ' <' + vm.user.git.email() + '>'
    }, {
      type: 'list',
      name: 'framework',
      message: 'Choose the framework / library ? ',
      choices: ['angular', 'react', 'no framework - just es6'],
      default: 'no framework - just es6'
    }];

    this.prompt(prompts, function(answers) {
      vm.props = answers;
      console.log(answers);
      done();
    }.bind(this));
  },
  //Writing Logic here
  writing: {
    //Copy the configuration files
    config: function() {
      this.fs.copyTpl(
        this.templatePath('common/_package.json'),
        this.destinationPath('package.json'), {
          name: this.props.name,
          description: this.props.description,
          author: this.props.author,
          framework: this.props.framework
        }
      );
      this.fs.copy(
        this.templatePath('common/_jspm.browser.js'),
        this.destinationPath('jspm.browser.js')
      );

      this.fs.copyTpl(
        this.templatePath('common/_jspm.config.js'),
        this.destinationPath('jspm.config.js'),{
          framework:this.props.framework
        }
      );

      this.fs.copy(
        this.templatePath('common/_.gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('common/.jshintrc'),
        this.destinationPath('.jshintrc')
      );
    },

    //Copy application files
    app: function() {
      //index file
      this.fs.copyTpl(
        this.templatePath('common/_index.html'),
        this.destinationPath('index.html'), {
          name: this.props.name,
          author: this.props.author,
          framework: this.props.framework
        }
      );
      /////favicon
      this.fs.copy(
        this.templatePath('common/_favicon.ico'),
        this.destinationPath('favicon.ico'));


      // app.js
      this.fs.copyTpl(
        this.templatePath('common/_src/_app.js'),
        this.destinationPath('src/app.js'), {
          framework: this.props.framework
        });

      if (this.props.framework === 'angular') {
        this.fs.copyTpl(
          this.templatePath('angular/_src/_scripts/_main.js'),
          this.destinationPath('src/scripts/main.js'), {
            name: this.props.name
          }
        );
        this.fs.copy(
          this.templatePath('angular/_src/_scripts/_main.router.js'),
          this.destinationPath('src/scripts/main.router.js')
        );
        this.fs.copy(
          this.templatePath('angular/_src/_scripts/_controllers/_mainController.js'),
          this.destinationPath('src/scripts/controllers/mainController.js')
        );
        this.fs.copy(
          this.templatePath('angular/_src/_scripts/_controllers/_aboutController.js'),
          this.destinationPath('src/scripts/controllers/aboutController.js')
        );
      } else if (this.props.framework === 'react') {
        // scripts
        this.fs.copy(
          this.templatePath('react/_src/_scripts/_main.jsx'),
          this.destinationPath('src/scripts/main.jsx')
        );
        // scripts
        this.fs.copy(
          this.templatePath('react/_src/_scripts/_hello-world.jsx'),
          this.destinationPath('src/scripts/hello-world.jsx')
        );
      } else {
        // scripts
        this.fs.copy(
          this.templatePath('common/_src/_scripts/_main.js'),
          this.destinationPath('src/scripts/main.js')
        );
      }

      // styles
      this.fs.copy(
        this.templatePath('common/_src/_styles/__test.scss'),
        this.destinationPath('src/styles/_test.scss')
      );
      this.fs.copy(
        this.templatePath('common/_src/_styles/_main.scss'),
        this.destinationPath('src/styles/main.scss')
      );

      if (this.props.framework === 'angular') {
        this.fs.copy(
          this.templatePath('angular/_assets/_views/_main.html'),
          this.destinationPath('assets/views/main.html')
        );
        this.fs.copy(
          this.templatePath('angular/_assets/_views/_about.html'),
          this.destinationPath('assets/views/about.html')
        );
        this.fs.copy(
          this.templatePath('angular/_assets/_images/dummy.jpg'),
          this.destinationPath('assets/images/dummy.jpg')
        );
      }
    },
    //Install Dependencies
    install: function() {
      var vm = this;
      this.installDependencies({
        callback: function() {
          var jspmInstall = vm.spawnCommand('npm', ['run', 'jspminstall']);
          jspmInstall.on('close', function(code) {
            if (code === 0) {
              console.log(' Hi , You have installed it successfully !');
            } else {
              console.log(' Some issues happened while doing jspm install. Please re run jspm install. Oh and make sure you had done npm install -g jspm before!');
            }
            var msg = '\n To start off .. Run npm run serve ' +
              '\n For production build .. Run npm run bundle ' +
              '\n This command will internally run jspm bundle , hence index.html will now use the bundle instead' +
              '\n For more details look up the readme for : https://github.com/master-atul/jspm-es6-boilerplate' +
              '\n ===========================================' +
              '\n In short:' +
              '\n ---------' +
              '\n For Development = npm run serve ' +
              '\n For Production: npm run bundle';
            console.log(msg);
          });
        }
      });
    }
  },

});
