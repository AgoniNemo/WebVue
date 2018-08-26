export const parseTime = (time, cFormat) => {
    if (time.length === 0) {
      return null;
    }
    var date = new Date(parseInt(time) * 1000);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate() + ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds();

    return (Y + M + D + h + m + s);
  };
