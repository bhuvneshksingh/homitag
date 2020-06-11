/* eslint-disable no-plusplus */
import request from 'utils/request';
import { newsApi, forumTopicsApi, catalogApi, orderApi } from 'utils/apiRoutes';
import Moment from 'moment/moment';

export const getNewsService = () => request(newsApi(1, 3));
export const getForumsTopicService = () => request(forumTopicsApi(1, 3));

export const getDailyActiveUsers = async () => ({
  dataPoints: [65, 59, 80, 81, 56, 55, 40],
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  total: 5000
});

export const getNewListingsAdded = async (createdAtGreater, createdAtLess) => {
  const records = [];
  let moreRecords = true;
  let page = 1;
  const perPage = 250;
  let total = 0;
  while (moreRecords) {
    // eslint-disable-next-line no-await-in-loop
    const res = await request((catalogApi(page, perPage, Moment(createdAtGreater).toISOString()  , Moment(createdAtLess).toISOString())));    
    if(!res || !res.data)
      throw new Error('Error on new listing added response');

    // eslint-disable-next-line prefer-destructuring
    total = res.data.total;
    
    records.push(...res.data.data);
    page += 1;
 
    if(res.data.data.length < perPage)
      moreRecords = false;
  }

  const response = {};
  const startDate = Moment(createdAtGreater).startOf('day');
  const endDate = Moment(createdAtLess).startOf('day');
  const daysDiff = Math.abs(startDate.diff(endDate,'days'));

  for (let index = 0; index <= daysDiff; index++) {
    response[startDate.toISOString().substring(0, 10)] = 0;
    startDate.add(1,'days');
  }

  for (let index = 0; index < records.length; index++) {
    const element = records[index];
    const dateOnly = new Date(element.createdAt).toISOString().substring(0, 10);
    
    response[dateOnly] += 1;
  }

  return {
    dataPoints: Object.values(response),
    labels: Object.keys(response),
    total
  }
};

export const getNewOrdersPlaced = async (createdAtGreater, createdAtLess) => {
  const records = [];
  let moreRecords = true;
  let page = 1;
  const perPage = 200;
  let total = 0;
  while (moreRecords) {
    // eslint-disable-next-line no-await-in-loop
    const res = await request((orderApi(page, perPage, Moment(createdAtGreater).toISOString()  , Moment(createdAtLess).toISOString())));    
    if(!res || !res.data)
      throw new Error('Error on new listing added response');

    // eslint-disable-next-line prefer-destructuring
    total = res.data.total;
    
    records.push(...res.data.data);
    page += 1;
 
    if(res.data.data.length < perPage)
      moreRecords = false;
  } 

  const response = {};
  const startDate = Moment(createdAtGreater).startOf('day');
  const endDate = Moment(createdAtLess).startOf('day');
  const daysDiff = Math.abs(startDate.diff(endDate,'days'));

  for (let index = 0; index <= daysDiff; index++) {
    response[startDate.toISOString().substring(0, 10)] = 0;
    startDate.add(1,'days');
  }

  for (let index = 0; index < records.length; index++) {
    const element = records[index];
    const dateOnly = new Date(element.createdAt).toISOString().substring(0, 10);
    
    response[dateOnly] += 1;
  }

  return {
    dataPoints: Object.values(response),
    labels: Object.keys(response),
    total
  }
};

export const getReturnsRequested = async () => ({
  dataPoints: [65, 59, 80, 81, 56, 55, 40],
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  total: 6000
});

export const getClaimFiled = async () => ({
  dataPoints: [65, 59, 80, 81, 56, 55, 40],
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  total: 300
});

export const getItemsReported = async () => ({
  dataPoints: [65, 59, 80, 81, 56, 55, 40],
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  total: 6
});