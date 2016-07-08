import React from 'react';

const PianoKeyNote = (props) => {

    const {
        note,
        semiNote,
        playNoteHandler,
        stopNoteHandler,
        playingVoices,
        octave
        } = props;

    function getClassName (color, key) {
        const voiceLabel = key + '-' + octave;

        let result = 'key-' + color + ' no-select';

        if (playingVoices.indexOf(voiceLabel) !== -1) {
            result += ' playing';
        }

        return result;

    }

    function semiNoteKey () {
        if (semiNote) {
            return (
                <div className={getClassName('black', semiNote.key)}
                     onMouseDown={(e) => playNoteHandler(e, semiNote.key)}
                     onTouchStart={(e) => playNoteHandler(e, semiNote.key)}
                     onMouseOut={() => stopNoteHandler(null, semiNote.key)}
                     onMouseUp={(e) => stopNoteHandler(e, semiNote.key)}
                     onTouchEnd={(e) => stopNoteHandler(e, semiNote.key)}><span>{semiNote.label}</span>
                </div>
            );
        } else {
            return '';
        }
    }

    return (
        <div className={getClassName('white', note.key)}
             onMouseDown={(e) => playNoteHandler(e, note.key)}
             onTouchStart={(e) => playNoteHandler(e, note.key)}
             onMouseOut={() => stopNoteHandler(null, note.key)}
             onMouseUp={(e) => stopNoteHandler(e, note.key)}
             onTouchEnd={(e) => stopNoteHandler(e, note.key)}><span>{note.label}</span>

            {semiNoteKey()}
        </div>
    );
};

export default PianoKeyNote;
