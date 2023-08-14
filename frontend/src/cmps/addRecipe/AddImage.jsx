import React, { useState, ChangeEvent } from 'react'
import { Button } from '@mui/material'

export const AddImage = (props) => {

  // //image
  const handleImgChange = async (e) => {
    const newImage = e.target.files[0]
    if (newImage) {
      const imgPath = {
        src: await convertBase64(newImage),
        alt: e.target.files[0].name
      }
      const imgPre = URL.createObjectURL(newImage)

      props.setOutputImg(imgPre)
      props.setImageFile(imgPath)
    }
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  return (
    <div>
      <Button
        variant="contained"
        component="label"
      >
        Upload image
        <input
          type="file"
          hidden
          onChange={handleImgChange}
        />
      </Button>
    </div>
  )
}
