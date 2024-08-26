import moment from 'moment';

const shortcuts = [
  {
    text: 'Today',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setHours(0, 0, 0);
      end.setHours(23, 59, 59);
      return [start, end];
    },
  },
  {
    text: 'This week',
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setDate(start.getDate() - end.getDay());
      return [start, end];
    },
  },
  {
    text: 'This Month',
    value: () => {
      const date = new Date();
      const start = new Date(date.getFullYear(), date.getMonth(), 1);
      const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      return [start, end];
    },
  },
];

export default function dateFormat(needed = [], formatToDate = false) {
  if (formatToDate) {
    shortcuts.map((obj) => {
      obj.formattedValue = [
        moment(obj.value()[0]).format('YYYY-MM-DD'),
        moment(obj.value()[1]).format('YYYY-MM-DD'),
      ];
    });
  }

  return needed.length
    ? shortcuts.filter((v) => needed.includes(v.text))
    : shortcuts;
}
