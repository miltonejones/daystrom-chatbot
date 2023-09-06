import moment from "moment";

export const groupHistory = (history, guid) => {
  const groupedHistory = Object.values(history).reduce((acc, convo) => {
    const monthYear = moment(convo.mem[0].timestamp).format("MMMM YYYY");
    const date = moment(convo.mem[0].timestamp).format("DD MMMM YYYY");
    if (!acc[monthYear]) {
      acc[monthYear] = {};
    }
    if (!acc[monthYear][date]) {
      acc[monthYear][date] = [];
    }
    acc[monthYear][date].unshift(convo);
    console.log({ keys: Object.keys(acc[monthYear]).sort().reverse() });
    acc[monthYear] = Object.keys(acc[monthYear])
      .sort()
      .reverse()
      .reduce((out, key) => {
        out[key] = acc[monthYear][key];
        return out;
      }, {});

    return acc;
  }, {});

  const sortedGroupedHistory = Object.keys(groupedHistory)
    .sort((a, b) => moment(b, "MMMM YYYY") - moment(a, "MMMM YYYY"))
    .reduce((obj, key) => {
      obj[key] = groupedHistory[key];
      return obj;
    }, {});

  Object.keys(groupedHistory).forEach((monthYear) => {
    const dates = groupedHistory[monthYear];
    groupedHistory[monthYear] = Object.keys(dates)
      .sort(
        (a, b) =>
          moment(b, "DD MMMM YYYY HH:mm") - moment(a, "DD MMMM YYYY HH:mm")
      )
      .reverse()
      .reduce((obj, key) => {
        obj[key] = dates[key];
        return obj;
      }, {});
  });

  // console.log({ sortedGroupedHistory });
  return sortedGroupedHistory;
};
