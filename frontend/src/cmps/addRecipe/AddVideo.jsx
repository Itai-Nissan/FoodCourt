import React, { useState, ChangeEvent } from 'react'
import { Button } from '@mui/material'

export const AddVideo = (props) => {

  // //video
  const handleVideoChange = async (e) => {
    const newVideo = e.target.files[0]
    if (newVideo) {
      const videoPath = {
        src: await convertBase64(newVideo),
        alt: e.target.files[0].name
      }
      const videoPre = URL.createObjectURL(newVideo)

      props.setVideoOutput(videoPre)
      props.setVideoFile(videoPath)
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
        Upload recipe video
        <input
          type="file"
          hidden
          onChange={handleVideoChange}
        />
      </Button>
    </div>
  )
}
