import React, { useState, ChangeEvent } from 'react'
import { Button } from '@mui/material'

export const AddVideo = (props) => {

  // //video
  const handleVidChange = (e) => {
    if (e.target.value) {
      const videoPath = URL.createObjectURL(e.target.files[0])
      props.setVideoOutput(videoPath)
      props.setVideoFile(e.target.files[0])
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
          onChange={handleVidChange}
        />
      </Button>
    </div>
  )
}
