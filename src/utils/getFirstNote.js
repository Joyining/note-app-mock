export const getFirstNote = (allNotes) => {
  if (allNotes[0]) {
    const firstNoteData = allNotes[0];
    return {
      id: firstNoteData.id ? firstNoteData.id : "",
      content: firstNoteData.content ? firstNoteData.content : "",
      title: firstNoteData.title ? firstNoteData.title : "",
      notebookId: firstNoteData.notebookId ? firstNoteData.notebookId : "",
      notebookName: firstNoteData.notebookName
        ? firstNoteData.notebookName
        : "",
      lastModifiedTime: firstNoteData.lastModifiedTime
        ? firstNoteData.lastModifiedTime
        : "",
      createdTime: firstNoteData.createdTime ? firstNoteData.createdTime : "",
    };
  } else {
    return {};
  }
};
