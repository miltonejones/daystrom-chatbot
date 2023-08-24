import moment from "moment";

export const groupHistory = (history) => {
  const groupedHistory = Object.values(history).reduce((acc, convo) => {
    const monthYear = moment(convo.mem[0].timestamp).format("MMMM YYYY");
    const date = moment(convo.mem[0].timestamp).format("DD MMMM YYYY");
    if (!acc[monthYear]) {
      acc[monthYear] = {};
    }
    if (!acc[monthYear][date]) {
      acc[monthYear][date] = [];
    }
    acc[monthYear][date].push(convo);
    return acc;
  }, {});
  Object.keys(groupedHistory).forEach((monthYear) => {
    const dates = groupedHistory[monthYear];
    groupedHistory[monthYear] = Object.keys(dates)
      .sort(
        (a, b) =>
          moment(b, "DD MMMM YYYY HH:mm") - moment(a, "DD MMMM YYYY HH:mm")
      )
      .reduce((obj, key) => {
        obj[key] = dates[key];
        return obj;
      }, {});
  });
  return groupedHistory;
};
