'use strict';
//Require dependencies
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');


module.exports = yeoman.generators.Base.extend({
  //Configurations will be loaded here.
  //Ask for user input
  prompting: function() {
    var done = this.async();
    this.prompt({
      type: 'input',
      name: 'name',
      message: 'Your project name',
      //Defaults to the project's folder name if the input is skipped
      default: this.appname
    }, function(answers) {
      this.props = answers
      this.log(answers.name);
      done();
    }.bind(this));
  },
  //Writing Logic here
  //Writing Logic here
  writing: {
    //Copy the configuration files
    config: function() {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'), {
          name: this.props.name
        }
      );
      this.fs.copy(
        this.templatePath('_config.json'),
        this.destinationPath('config.json')
      );
    },

    //Copy application files
    app: function() {
      //index file
      this.fs.copyTpl(
        this.templatePath('_index.html'),
        this.destinationPath('index.html'), {
          name: this.props.name
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
        this.templatePath('_src/_styles/_test.scss'),
        this.destinationPath('src/styles/test.scss')
      );
      this.fs.copy(
        this.templatePath('_src/_styles/_main.scss'),
        this.destinationPath('src/styles/main.scss')
      );
    },
    //Install Dependencies
    install: function() {
      this.installDependencies({
        callback:function(){
          this.spawnCommand('npm', ['run jspminstall']);
        }
      });
    }
  },

});
