import { sproutApiSvc } from '../../core/services/sproutApiSvc';

export interface HomePageDTO {
  dataType: 'MARKUP' | 'MARKDOWN' | 'URL';
  data: any;
}

export const homePageService = {
  getHomePage: () => {
    return sproutApiSvc.get<HomePageDTO>(`/api/home`);
  }
};
