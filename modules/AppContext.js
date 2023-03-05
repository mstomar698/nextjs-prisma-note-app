const { createContext, useState, useContext, useReducer } = require('react');
const NoteStateContext = createContext();
const NotesStateContext = createContext();
const NoteDispatchContext = createContext();
const NotesDispatchContext = createContext();

const notesReducer = (state, action) => {
  const { note, type } = action;
  if (type === 'add') return [...state, note];
  if (type === 'remove') {
    const noteIndex = state.findIndex((x) => x.title === note.title);
    if (noteIndex < 0) return state;
    const stateUpdate = [...state];
    stateUpdate.splice(noteIndex, 1);
    return stateUpdate;
  }
  if (type === 'replace') return note;
  if (type === 'edit') {
    let noteIndex = state.findIndex((x) => x.id === note.id);
    console.log({ state, noteIndex, note });
    if (noteIndex < 0) return state;
    state[noteIndex] = note;
  }
  return state;
};

export const NoteProvider = ({ children }) => {
  const [note, setNote] = useState({});
  const [notes, setNotes] = useReducer(notesReducer, []);

  return (
    <NoteDispatchContext.Provider value={setNote}>
      <NoteStateContext.Provider value={note}>
        <NotesDispatchContext.Provider value={setNotes}>
          <NotesStateContext.Provider value={notes}>
            {children}
          </NotesStateContext.Provider>
        </NotesDispatchContext.Provider>
      </NoteStateContext.Provider>
    </NoteDispatchContext.Provider>
  );
};

export const useDispatchNote = () => useContext(NoteDispatchContext);
export const useNote = () => useContext(NoteStateContext);
export const useDispatchNotes = () => useContext(NotesDispatchContext);
export const useNotes = () => useContext(NotesStateContext);
