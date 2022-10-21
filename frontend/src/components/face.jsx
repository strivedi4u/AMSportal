import React, { useState, useEffect } from "react";
import * as faceapi from 'face-api.js';
import { useNavigate } from 'react-router-dom';
import "./css/style.css"
function Face() {
    const navigate = useNavigate();
    var loggedIn = false;
    loggedIn = sessionStorage.getItem("token");
    useEffect(() => {
        if (!loggedIn) {
            navigate("/");
        }
    },);
    const [data, getData] = useState([]);
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = () => {
        fetch("/api/student/image", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                    "auth-token":sessionStorage.getItem('token')
                
            }
        }).then((res) =>
            res.json())
            .then((response) => {
                console.log(response);
                getData(response);
            })
    }

    const getDataforAttend = (name) => {
        fetch("/api/student/" + name, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "auth-token":sessionStorage.getItem('token')
            }
        })
            .then((res) => res.json())
            .then((response) => {
                if (response.length !== 0) {
                    console.log(response);
                    fetch('/api/attend', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            "auth-token":sessionStorage.getItem('token')
                        },
                        body: JSON.stringify({
                            rollno: response[0].rollno,
                            name: response[0].name,
                            address: response[0].address,
                            email: response[0].email,
                            mobile: response[0].mobile,
                        }),
                    })
                        .then((res) => {
                            console.log("uploaded");
                        })
                        .catch((err) => alert("Details Upload Error"));
                }
            })
    }
    const handleClick = (e) => {
        const video = document.getElementById('videoInput')
        Promise.all([
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
        ]).then(start)
        function start() {
            navigator.getUserMedia(
                { video: {} },
                stream => video.srcObject = stream,
                err => console.error(err)
            )
            console.log('video added')
            recognizeFaces()
        }

        async function recognizeFaces() {
            const labeledDescriptors = await loadLabeledImages()
            const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.4)
            video.addEventListener('play', async () => {
                console.log('Playing')
                const canvas = faceapi.createCanvasFromMedia(video)
                document.body.append(canvas)
                const displaySize = { width: video.width, height: video.height }
                faceapi.matchDimensions(canvas, displaySize)
                setInterval(async () => {
                    const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()
                    const resizedDetections = faceapi.resizeResults(detections, displaySize)
                    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
                    const results = resizedDetections.map((d) => {
                        return faceMatcher.findBestMatch(d.descriptor)
                    })
                    console.log(results);
                    if (results.length === 0) {
                        console.log("Face not found");
                    } else {
                        console.log("Face found");
                        console.log(results[0]._label);
                        getDataforAttend(results[0]._label);
                    }
                    results.forEach((result, i) => {
                        const box = resizedDetections[i].detection.box
                        const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
                        drawBox.draw(canvas)
                    })
                }, 1000)
            })
        }
        function loadLabeledImages() {
            return Promise.all(
                data.map(async (item) => {
                    const descriptions = []
                    for (let i = 1; i <= 3; i++) {
                        var url = 0;
                        if (i === 1) {
                            url = "/static/" + item.image1;
                        } else if (i === 2) {
                            url = "/static/" + item.image2;
                        }
                        else {
                            url = "/static/" + item.image3;
                        }
                        var img = await faceapi.fetchImage(url);
                        var detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
                    //    console.log(item.name + i + JSON.stringify(detections))
                        descriptions.push(detections.descriptor)
                    }
                    console.log("DEScriptions " + descriptions);
                    return new faceapi.LabeledFaceDescriptors(item.name, descriptions)
                })
            )
        }
    }
    return (<>
        <meta name="viewport" content="width=device-width, initial-scale=0.45" />
        <center><video id="videoInput" width="800" height="550" muted controls /> <br></br>

            <button className="start" onClick={handleClick}>Start</button>
            <div className="mobile">
                This site can not open in mobile
            </div>
        </center></>

    );
}

export default Face;
