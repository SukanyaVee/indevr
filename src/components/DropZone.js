import React from 'react';
import Dropzone from 'react-dropzone';
import request  from 'superagent';
import glam from 'glamorous';


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
    const style= {
        height: 150,
        width: 150,
        border: '5px dashed var(--main-grey)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 10
    }

    return (
        <Main>
            <Dropzone onDrop={onDrop} multiple={ false } accept="image/png" style={style}>
                <div className="droptext">Drop an image here, or click to select a file to upload.</div>
            </Dropzone>
        </Main>
    );
}

export default DropZone;

const Main = glam.div({
    '& .dropzone':{
        height: 100
    }
})
