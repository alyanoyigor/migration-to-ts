import { ISources } from './../../interfaces/interfaces';
import './sources.css';

type ObjectData = {
  [key: string]: ISources[];
};

export class Sources {
  private objSources: ObjectData;
  constructor() {
    this.objSources = <ObjectData>{};
  }
  draw(data: ISources[]) {
    const set: Set<string> = new Set();
    data.forEach((item: ISources): void => {
      set.add(item.category);
    });
    [...set].forEach((category) => this.drawCategories(category, data));
  }
  drawCategories(category: string, data: ISources[]): void {
    const categorySources = document.querySelector('.category-sources');
    const fragmentCategory = document.createDocumentFragment();
    const sourceCategory: HTMLTemplateElement | null = document.querySelector('#sourceCategory');
    const sourceClone = <HTMLElement>sourceCategory?.content.cloneNode(true);
    const sourceLabel = sourceClone.querySelector('.category-source__label');
    sourceLabel ? (sourceLabel.textContent = category) : null;
    const objSources = this.objSources;
    const drawAlphabet = this.drawAlphabet.bind(this);
    const sourceCheckbox: HTMLInputElement | null = sourceClone.querySelector('.category-source__checkbox');
    sourceCheckbox
      ? sourceCheckbox.addEventListener('input', function () {
          const alphabetSources = document.querySelector('.alphabet-sources');
          alphabetSources ? (alphabetSources.textContent = '') : null;
          const dataFilter: ISources[] = data.filter((item: ISources) => item.category === category);
          if (this.checked) {
            objSources[category] = dataFilter;
          } else {
            delete objSources[category];
          }
          const arr = Object.values(objSources).flat(1);
          drawAlphabet(arr);
        })
      : null;
    fragmentCategory.append(sourceClone);
    categorySources?.append(fragmentCategory);
  }
  drawAlphabet(items: ISources[]): void {
    const alphabetSources = document.querySelector('.alphabet-sources');
    const alphabetObj: ObjectData = {};
    items
      .sort((a: ISources, b: ISources): number => (a.name > b.name ? 1 : -1))
      .forEach((item: ISources): void => {
        const key = item.name[0];
        if (alphabetObj.hasOwnProperty(key)) {
          alphabetObj[key].push(item);
        } else {
          alphabetObj[key] = [item];
          const letter = document.createElement('button');
          letter.className = 'alphabet-button';
          letter.textContent = key;
          letter.addEventListener('click', (e) => {
            this.drawSources(alphabetObj[key]);
          });
          alphabetSources?.append(letter);
        }
      });
  }
  drawSources(items: ISources[]): void {
    const sources = document.querySelector('.sources');
    if (sources) {
      sources.textContent = '';
    }
    items.forEach((item: ISources): void => {
      const fragment = document.createDocumentFragment();
      const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');
      const sourceClone = <HTMLElement>sourceItemTemp?.content.cloneNode(true);
      const sourceItemName = sourceClone.querySelector('.source__item-name');
      sourceItemName ? (sourceItemName.textContent = item.name) : null;
      const sourceItem = sourceClone.querySelector('.source__item');
      sourceItem ? sourceItem.setAttribute('data-source-id', item.id) : null;
      fragment.append(sourceClone);
      sources?.append(fragment);
    });
  }
}
