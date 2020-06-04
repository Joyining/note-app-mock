import * as utils from "../utils";

export const getNoteTitle = (noteContent) => {
  let title = "";
  if (noteContent) {
    let result = 0;
    const findTitleStart = (val) => {
      let startIndex = val.indexOf(">") + 1;
      result = result + startIndex;
      let subStr = val.substring(result);
      if (subStr.indexOf("<") === 0) {
        findTitleStart(subStr); // recursive
      }
      return result;
    };
    const firstIndex = findTitleStart(noteContent);
    let temp = noteContent.substring(firstIndex);
    title = utils.htmlDecoder(
      noteContent.substring(firstIndex, temp.indexOf("<") + firstIndex)
    );
    return title;
  }
};
