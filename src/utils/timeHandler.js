export const getDisplayedTimeAgo = (originTime) => {
  let result = "";
  const now = new Date();
  const dateObj = originTime instanceof Date ? originTime : originTime.toDate();
  const lastModifiedDay = `${dateObj.getFullYear()}/${
    dateObj.getMonth() + 1
  }/${dateObj.getDate()}`;
  const diffInSecond = Math.floor(
    now.getTime() / 1000 - dateObj.getTime() / 1000
  );
  switch (true) {
    case diffInSecond < 60:
      result = `Few seconds ago`;
      break;
    case diffInSecond >= 60 && diffInSecond < 60 * 60:
      result = `${Math.floor(diffInSecond / 60)} minutes ago`;
      break;
    case diffInSecond >= 60 * 60 && diffInSecond < 60 * 60 * 24:
      result = `${Math.floor(diffInSecond / (60 * 60))} hours ago`;
      break;
    case diffInSecond >= 60 * 60 * 24:
      result = lastModifiedDay;
      break;
    default:
      break;
  }
  return result;
};

export const getDisplayedDate = (originTime) => {
  if (originTime) {
    const dateObj =
      originTime instanceof Date ? originTime : originTime.toDate();
    return dateObj
      ? `${dateObj.getFullYear()}/${
          dateObj.getMonth() + 1
        }/${dateObj.getDate()}`
      : "";
  }
};

export const getDisplayedTime = (originTime) => {
  if (originTime) {
    const dateObj =
      originTime instanceof Date ? originTime : originTime.toDate();
    return dateObj
      ? `${dateObj.getFullYear()}/${
          dateObj.getMonth() + 1
        }/${dateObj.getDate()}  ${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()}`
      : "";
  }
};
