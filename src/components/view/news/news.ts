import { IArticles } from '../../interfaces/interfaces';
import './news.css';

export class News {
  draw(data: IArticles[]) {
    const NEWS_AMOUNT = 10;
    const SECOND_NUM = 2;
    const news = data.length >= NEWS_AMOUNT ? data.filter((_item: IArticles, idx: number) => idx < NEWS_AMOUNT) : data;

    const fragment = document.createDocumentFragment();
    const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

    news.forEach((item: IArticles, idx: number) => {
      let newsClone = <HTMLElement>newsItemTemp?.content.cloneNode(true);
      if (newsClone) {
        if (idx % SECOND_NUM) {
          const newsItem = newsClone.querySelector('.news__item');
          newsItem?.classList.add('alt');
        }
        const newsPhoto: HTMLElement | null = newsClone.querySelector('.news__meta-photo');
        newsPhoto ? (newsPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`) : null;
        const newsAuthor = newsClone.querySelector('.news__meta-author');
        newsAuthor ? (newsAuthor.textContent = item.author || item.source.name) : null;
        const newsDate = newsClone.querySelector('.news__meta-date');
        newsDate
          ? (newsDate.textContent = item.publishedAt.slice(0, NEWS_AMOUNT).split('-').reverse().join('-'))
          : null;

        const newsDescrTitle = newsClone.querySelector('.news__description-title');
        const newsDescrSource = newsClone.querySelector('.news__description-source');
        const newsDescrContent = newsClone.querySelector('.news__description-content');
        const readMoreLink = newsClone.querySelector('.news__read-more a');
        newsDescrTitle ? (newsDescrTitle.textContent = item.title) : null;
        newsDescrSource ? (newsDescrSource.textContent = item.source.name) : null;
        newsDescrContent ? (newsDescrContent.textContent = item.description) : null;
        readMoreLink ? readMoreLink.setAttribute('href', item.url) : null;
      }

      fragment.append(newsClone);
    });

    const newsHTML = document.querySelector('.news');
    newsHTML ? (newsHTML.innerHTML = '') : null;
    newsHTML?.appendChild(fragment);
  }
}
