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
      default: 'appname'
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
    }];

    this.prompt(prompts, function(answers) {
      vm.props = answers;
      done();
    }.bind(this));
  },
  //Writing Logic here
  writing: {
    //Copy the configuration files
    config: function() {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'), {
          name: this.props.name,
          description: this.props.description,
          author: this.props.author
        }
      );
      this.fs.copy(
        this.templatePath('_config.js'),
        this.destinationPath('config.js')
      );
      this.fs.copy(
        this.templatePath('_.gitignore'),
        this.destinationPath('.gitignore')
      );
    },

    //Copy application files
    app: function() {
      //index file
      this.fs.copyTpl(
        this.templatePath('_index.html'),
        this.destinationPath('index.html'), {
          name: this.props.name,
          author: this.props.author
        }
      );
      /////favicon
      this.fs.copy(
        this.templatePath('_favicon.ico'),
        this.destinationPath('favicon.ico'));


      // app.js
      this.fs.copy(
        this.templatePath('_src/_app.js'),
        this.destinationPath('src/app.js'));

      // scripts
      this.fs.copy(
        this.templatePath('_src/_scripts/_main.js'),
        this.destinationPath('src/scripts/main.js')
      );

      // styles
      this.fs.copy(
        this.templatePath('_src/_styles/__test.scss'),
        this.destinationPath('src/styles/_test.scss')
      );
      this.fs.copy(
        this.templatePath('_src/_styles/_main.scss'),
        this.destinationPath('src/styles/main.scss')
      );
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
