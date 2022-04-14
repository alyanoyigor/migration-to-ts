import { Callback, ISourcesResponse, IArticlesResponse, HTMLElementEvent } from '../interfaces/interfaces';
import { AppLoader } from './appLoader';

export class AppController extends AppLoader {
  getSources(callback: Callback<ISourcesResponse>) {
    super.getResp(
      {
        endpoint: 'sources',
      },
      callback
    );
  }

  getNews(e: Event | HTMLElementEvent<HTMLElement>, callback: Callback<IArticlesResponse>) {
    let { target, currentTarget } = e;
    while (target !== currentTarget) {
      if (target instanceof HTMLElement && target?.classList.contains('source__item')) {
        const sourceId: string | null = target.getAttribute('data-source-id');
        if (
          sourceId &&
          currentTarget instanceof HTMLElement &&
          currentTarget?.getAttribute('data-source') !== sourceId
        ) {
          currentTarget?.setAttribute('data-source', sourceId);
          super.getResp(
            {
              endpoint: 'everything',
              options: {
                sources: sourceId,
              },
            },
            callback
          );
        }
        return;
      }
      target && target instanceof HTMLElement ? (target = target.parentElement) : null;
    }
  }
}
