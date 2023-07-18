import React, { useState, useRef } from "react";
import Tesseract from "tesseract.js";
import preprocessImage from "./Preprocess";
import processText from "./Postprocess";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const Scan = ({ handleAutofill }) => {
  const videoRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraStarted, setCameraStarted] = useState(false);
  const [extractedText, setExtractedText] = useState(""); // New state for extracted text
  const cropperRef = useRef(null);

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      const canvas = cropperRef.current?.cropper.getCroppedCanvas();
      const dataURL = canvas.toDataURL("image/jpeg");
      setCapturedImage(dataURL);
    }
  };

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setCameraStarted(true); // Set the cameraStarted flag to true
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });
  };

  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      console.log(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const captureImage = () => {
    if (!cameraStarted) {
      alert("Camera not started!");
      return;
    }

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    video.pause();
    video.srcObject.getTracks()[0].stop();

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    context.putImageData(preprocessImage(canvas), 0, 0);

    const dataURL = canvas.toDataURL("image/jpeg");
    setCapturedImage(dataURL);
  };

  const processImage = () => {
    if (!capturedImage) {
      // Close the camera if no image is captured
      const video = videoRef.current;
      video.pause();
      video.srcObject.getTracks()[0].stop();
      return;
    }

    Tesseract.recognize(capturedImage, "ron", {
      logger: (m) => console.log(m),
    }).then(({ data: { text } }) => {
      const processedText = processText(text);
      console.log(processedText);
      setExtractedText(processedText); // Update the extracted text state
      window.extractedText = processText(processedText);
    });
  };

  const resetState = () => {
    setCapturedImage(null);
    setCameraStarted(false);
    setExtractedText("");
  };

  return (
    <>
      {!capturedImage ? (
        <>
          <div>
            <button class="button-4" onClick={startCamera}>
              Start Camera
            </button>
            <button class="button-4" onClick={captureImage}>
              Capture Image
            </button>
          </div>
          <video ref={videoRef} autoPlay />
        </>
      ) : (
        <>
          <div className="button-container">
            <button class="button-4" onClick={processImage}>
              Extract Text
            </button>
            <button class="button-4" onClick={resetState}>
              Reset
            </button>
          </div>
          <p className="extracted-text-p">Extracted Text: {extractedText}</p>{" "}
          {/* Display the extracted text */}
          <img src={capturedImage} alt="Captured" />
          <br></br>
          <button
            className="button-4"
            style={{ float: "right" }}
            onClick={getCropData}
          >
            Crop Image
          </button>
          <Cropper
            src={capturedImage}
            style={{ height: 400, width: "100%" }}
            // Cropper.js options
            zoomTo={0.5}
            initialAspectRatio={1}
            crop={onCrop}
            ref={cropperRef}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            guides={true}
          />
        </>
      )}
    </>
  );
};

export default Scan;
