export const getFirstNote = (snapshot) => {
  if (snapshot.docs[0]) {
    const firstNoteData = snapshot.docs[0].data();
    return {
      id: snapshot.docs[0].id,
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
