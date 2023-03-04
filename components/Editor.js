import { useEffect, useState } from 'react';

import { CheckCircleIcon } from '@heroicons/react/solid';

import {
  useNote,
  useDispatchNote,
  useNotes,
  useDispatchNotes,
} from '../modules/AppContext';

import RandomID from '../modules/RandomID';

const Editor = () => {
  const currentNote = useNote();
  const setCurrentNote = useDispatchNote();

  const notes = useNotes();
  const setNotes = useDispatchNotes();

  const [title, setTitle] = useState('Hola');
  const [body, setBody] = useState(
    `There once was a ship that put to sea
and the name of the ship was the billy old tea`
  );
  const [noteID, setNoteID] = useState(null);
  const [noteAction, setNoteAction] = useState('add');
  const [isSaved, setIsSaved] = useState(false);

  const updateField = (e) => {
    let field = e.target;

    setBody(field.value);

    field.style.height = 'inherit';

    let computed = window?.getComputedStyle(field);

    let height =
      parseInt(computed.getPropertyValue('border-top-width'), 10) +
      parseInt(computed.getPropertyValue('padding-top'), 10) +
      field.scrollHeight +
      parseInt(computed.getPropertyValue('padding-bottom'), 10) +
      parseInt(computed.getPropertyValue('border-bottom-width'), 10);

    field.style.height = `${height}px`;
  };

  const saveNote = () => {
    if (title && body) {
      let id = noteID || RandomID(title.slice(0, 5), 5);

      let note = {
        id,
        title,
        body,
      };

      try {
        if (noteAction == 'edit') {
          setNotes({ note, type: 'edit' });
          console.log({ note, noteAction, noteID, notes });
        } else {
          setNotes({ note, type: 'add' });
        }

        setIsSaved(true);

        note = { title: '', body: '' };

        setTitle(note.title);
        setBody(note.body);

        setCurrentNote(note);
      } catch (error) {
        console.log({ error });
      }
    }
  };

  useEffect(() => {
    if (title && body) setIsSaved(false);
    else setIsSaved(true);
  }, [title, body]);

  useEffect(() => {
    if (currentNote.title && currentNote.body) {
      setTitle(currentNote.title);
      setBody(currentNote.body);
      setNoteID(currentNote.id);
      setNoteAction(currentNote.action);
    }
  }, [currentNote]);

  return (
    <div className={'editor'}>
      <div className={'wrapper'}>
        <div className="editing-area">
          <div className="title">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className={'form-input'}
              placeholder="Title"
            />
          </div>
          <div className="body">
            <textarea
              value={body}
              onChange={(e) => updateField(e)}
              name="note-body"
              id="note-body"
              className="form-textarea"
              cols="10"
              rows="2"
              placeholder="Write something spec ✨"
            ></textarea>
          </div>
        </div>
        <ul className={'options'}>
          <li className={'option'}>
            <button
              onClick={saveNote}
              disabled={isSaved}
              className="cta flex gap-2 items-end"
            >
              <CheckCircleIcon className="h-5 w-5 text-blue-500" />
              <span className="">{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Editor;
