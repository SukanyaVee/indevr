import React from 'react';
import Dropzone from 'react-dropzone';
import glam from 'glamorous';


const DropZone = (props) => {

    // --------------
    // This is the function that uploads the image and returns the URL from AWS.
    // Place it in the component where DropZone is used, and pass it as the onDrop prop.
    // You will need to import request  from 'superagent';
    // --------------
    // const onDrop = (files) => {
    //     request.post('/api/upload')
    //     .attach('image', files[0])
    //     .end((error, response) => {
    //         if(error) console.log(error);
    //         console.log('File Uploaded Succesfully');
    //         console.log(response.text); //Return image URL
    //     })
    // }

    // --------------
    // You can override the default styling by passing a style object with the style prop
    // --------------
    const style= {
        height: 200,
        width: 200,
        border: '5px dashed var(--main-grey)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 10
    }

    return (
        <Main>
            <Dropzone onDrop={props.onDrop} multiple={ false } accept="image/png" style={props.style || style}>
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
