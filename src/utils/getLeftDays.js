import moment from 'moment';

export const getLeftDays = (endDate) => {
  return moment(endDate).diff(moment(Date.now()).format('YYYY-MM-DD'), 'days');
};
