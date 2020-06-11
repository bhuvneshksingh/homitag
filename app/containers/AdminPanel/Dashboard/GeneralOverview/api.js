import request from 'utils/request';
import { newsApi } from 'utils/apiRoutes';

export const getNewsService = () => request(newsApi(1, 3));
