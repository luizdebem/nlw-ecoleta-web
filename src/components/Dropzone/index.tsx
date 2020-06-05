import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload } from 'react-icons/fi';

import './styles.css';

interface Props {
  onFileUploaded: (file: File) => void;
}

const DropzoneComponent: React.FC<Props> = ({ onFileUploaded }) => { // onFileUploaded é desestruturação dos props
  const [selectedFileUrl, setSelectedFileurl] = useState('');

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const fileUrl = URL.createObjectURL(file);
    setSelectedFileurl(fileUrl);
    onFileUploaded(file);
  }, [onFileUploaded])
  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*'
  })

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" />

      {selectedFileUrl
        ? <img src={selectedFileUrl} alt="Point's thumbnail" />
        : (
          <p><FiUpload /> Imagem do estabelecimento</p>
        )
      }
    </div>
  )
}

export default DropzoneComponent;