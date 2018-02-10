import React from 'react';
import Dropzone from 'react-dropzone';
import request  from 'superagent';


const DropZone = () => {

    const onDrop = (files) => {
        request.post('/api/upload')
        .attach('image', files[0])
        .end((error, response) => {
            if(error) console.log(error);
            console.log('File Uploaded Succesfully');
            console.log(response.text); //Return image URL
        })
    }

    return (
        <div>
            <Dropzone onDrop={onDrop} multiple={ false }>
                <div className="droptext">Drop a file here, or click to select a file to upload.</div>
            </Dropzone>
        </div>
    );
}

export default DropZone;
