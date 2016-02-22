export default class MainController {
  constructor() {
    this.testVar = 'main controller';
  }

  test() {
    let vm = this;
    console.log('Main Controller test: ',vm.testVar);
  }

}
