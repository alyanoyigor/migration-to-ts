import { Loader } from './loader';

export class AppLoader extends Loader {
  constructor() {
    super('https://nodenews.herokuapp.com/', {
      apiKey: '3c36fdbbc1824a4282562c7fc76b310e',
    });
  }
}
