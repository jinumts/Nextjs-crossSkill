"use client";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";
export default function ImagePicker({ label, name }) {
  const imageRef = useRef();

  const [pickedImage, setPickedImage] = useState("");
  function handlePicClick() {
    imageRef.current.click();
  }
  function handleImageChange(event) {
    const file = event.target.files[0];
    if (!file) {
      setPickedImage(null);
      return;
    }
    const fileReader = new FileReader()
    fileReader.onload = () =>{
        setPickedImage(fileReader.result)
    }
    fileReader.readAsDataURL(file)
  }
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.control}>
        <div className={classes.preview}>
            {!pickedImage && <p>No images picked yet!</p>}
            {pickedImage && (
                <Image src={pickedImage}
                alt="The image selected by the user"
                fill
                />
            )}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageRef}
          onChange={handleImageChange}
          required
        />
        <button
          className={classes.button}
          type="button"
          onClick={handlePicClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}