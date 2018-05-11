import React from 'react';
import PropTypes from 'prop-types';

const File = ({file, removeFile}) => {
    return(
        <li key={file.id}><a href={file.fileDirectory} target="_blank" >{file.fileName}</a> - <a href="#" onClick={(event)=>{removeFile();event.preventDefault();return false;}}><span className="remove-file">Remove File</span></a></li>
    );
}

File.propTypes = {
    file: PropTypes.object.isRequired,
    removeFile: PropTypes.func.isRequired
};

export default File;