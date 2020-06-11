import request from 'utils/request';
import { verificationApi } from 'utils/apiRoutes';

export const sendCodeService = (userId, verificationType, body) =>
  request(verificationApi(userId, verificationType), body, 'POST');
export const verificationService = (userId, verificationType, body) =>
  request(verificationApi(userId, verificationType), body, 'PATCH');
