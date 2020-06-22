import * as utils from "../utils";

export const getNoteTitle = (noteContent) => {
  let title = "";
  if (noteContent) {
    let result = 0;
    const findTitleStart = (val) => {
      let startIndex = val.indexOf(">") + 1;
      let subStr = val.substring(startIndex);
      result = result + startIndex;
      if (subStr.indexOf("<") === 0) {
        findTitleStart(subStr); // recursive
      }
      return result;
    };
    const firstIndex = findTitleStart(noteContent);
    const temp = noteContent.substring(firstIndex);
    const substringLastIndex = temp.indexOf("<");
    const lastIndex =
      substringLastIndex > 0 ? firstIndex + substringLastIndex : 0;
    title = utils.htmlDecoder(noteContent.substring(firstIndex, lastIndex));
    return title;
  }
};
