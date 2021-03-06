import { Platform } from '@angular/cdk/platform';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ShareButtonBase } from './base';
import { IShareButton, ShareMetaTags } from '../share.models';

export class FacebookButton extends ShareButtonBase {

  supportShareCount = true;

  protected _supportedMetaTags: ShareMetaTags = {
    url: 'u'
  };

  get desktop(): string {
    return `https://www.facebook.com/sharer/sharer.php?`;
  }

  constructor(protected _props: IShareButton,
              protected _url: () => string,
              protected _http: HttpClient,
              protected _platform: Platform,
              protected _document: Document,
              protected _windowSize: string,
              protected _disableButtonClick: (disable: boolean) => void) {
    super(_props, _url, _http, _platform, _document, _windowSize, _disableButtonClick);
  }

  shareCount(url: string): Observable<number> {
    return this._http.get(`https://graph.facebook.com?id=${url}`).pipe(
      map((res: any) => +res.share.share_count)
    );
  }
}
