export default class AboutController {
  constructor() {
    this.testVar = 'About controller';
  }

  test() {
    let vm = this;
    console.log('About Controller test: ',vm.testVar);
  }

}
