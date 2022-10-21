import React, {useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
function Camera() {
    const navigate = useNavigate();
    var loggedIn = false;
    loggedIn = sessionStorage.getItem("token");
    useEffect(() => {
        if (!loggedIn) {
            navigate("/");
        }
    },);
    const webcamRef = useRef(null);
    const [url1, setUrl1] = useState(null);
    const [url2, setUrl2] = useState(null);
    const [url3, setUrl3] = useState(null);
    const videoConstraints = {
        facingMode: "environment",
    };

    const capturePhoto = (e) => {
        const imageSrc = webcamRef.current.getScreenshot();
        if (url1 == null) {
            setUrl1(imageSrc);
        }
        else if (url2 == null) {
            setUrl2(imageSrc);
        }
        else if (url3 == null) {
            setUrl3(imageSrc);
        }
    };
    const onUserMedia = (e) => {
        console.log(e);
    };

    const setUrl = (e) => {
        setUrl1(null);
        setUrl2(null);
        setUrl3(null);
    }



    const handleClick = (e) => {
        function dataURItoBlob(dataURI) {
            // convert base64/URLEncoded data component to raw binary data held in a string
            var byteString;
            if (dataURI.split(',')[0].indexOf('base64') >= 0)
                byteString = atob(dataURI.split(',')[1]);
            else
                byteString = unescape(dataURI.split(',')[1]);
            // separate out the mime component
            var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
            // write the bytes of the string to a typed array
            var ia = new Uint8Array(byteString.length);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            return new Blob([ia], { type: mimeString });
        }


        var blob1 = dataURItoBlob(url1);
        var blob2 = dataURItoBlob(url2);
        var blob3 = dataURItoBlob(url3);

        var files1 = new File([blob1], 'face1.jpg', { type: 'image/jpeg' });
        var files2 = new File([blob2], 'face2.jpg', { type: 'image/jpeg' });
        var files3 = new File([blob3], 'face3.jpg', { type: 'image/jpeg' });

        var data = new FormData();
        data.append("files1", files1);
        data.append("files2", files2);
        data.append("files3", files3);

        data.append("model", JSON.stringify({
            rollno: sessionStorage.getItem("rollno"),
            name: sessionStorage.getItem("name"),
            address: sessionStorage.getItem("address"),
            email: sessionStorage.getItem("email"),
            mobile: sessionStorage.getItem("mobile"),
        }));

        for (let [name, value] of data) {
            alert(`${name} = ${value}`); // key1 = value1, then key2 = value2
        }

        var  URL = '/api/student';
        axios.post(URL,{
            method: "POST",
            headers: {
                "auth-token":sessionStorage.getItem('token')
          },
          body: data
        })
            .then((res) => {
                console.log(res);
                alert('Image uploaded successfully..');
            })
            .catch((err) => alert("Details Upload Error"));

    }
    return (
        <>
            <div style={{
                backgroundColor: "black",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "120vh",
                marginTop: "-20px"
            }}>
                <br></br>
                <Webcam
                    ref={webcamRef}
                    audio={false}
                    height={350}
                    width={100 + '%'}
                    screenshotFormat="image/png"
                    videoConstraints={videoConstraints}
                    onUserMedia={onUserMedia}
                    mirrored={true}
                />
                <center>
                    <button type="button" onClick={capturePhoto} className="btn btn-primary" style={{ margin: "5px" }}>Capture</button>
                    <button type="button" onClick={setUrl} className="btn btn-danger" style={{ margin: "5px" }}>Refresh</button>
                    <button type="button" onClick={handleClick} className="btn btn-success" style={{ margin: "5px" }}>Submit</button>
                </center>

                {url1 && (<div> <center>
                    &nbsp;<img width={32 + '%'} style={{ display: "inline-block", margin: 0.3 + '%' }} src={url1} alt="1" />
                    {url2 && (<img src={url2} width={32 + '%'} style={{ display: "inline-block", margin: 0.3 + '%' }} alt="2" />)}
                    {url3 && (<img src={url3} width={32 + '%'} style={{ display: "inline-block", margin: 0.3 + '%' }} alt="3" />)}
                </center></div>)}

            </div>
        </>
    );
}

export default Camera;
