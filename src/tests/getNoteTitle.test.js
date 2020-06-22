import { getNoteTitle } from "../utils/getNoteTitle";

const outputs = { eng: "This is Title", chi: "這是標題", empty: "" };
const testDatas = [
  { input: "<p>This is Title</p>", lang: "eng" },
  { input: "<h1>This is Title</h1>", lang: "eng" },
  { input: "<h2>This is Title</h2><p>This is Content</p>", lang: "eng" },
  {
    input:
      "<ul><li>This is Title</li><li>This is Content X</li><li>This is Content Y</li></ul>",
    lang: "eng",
  },
  { input: "<h3>這是標題</h3>", lang: "chi" },
  { input: "<b>這是標題</b>", lang: "chi" },
  {
    input: "<ul><ol><li>這是標題</li></ol></ul>",
    lang: "chi",
  },
  { input: "<h4></h4>", lang: "empty" },
];

test("getNoteTitle", () => {
  for (let i = 0; i < testDatas.length; i++) {
    expect(getNoteTitle(testDatas[i].input)).toBe(outputs[testDatas[i].lang]);
  }
});
