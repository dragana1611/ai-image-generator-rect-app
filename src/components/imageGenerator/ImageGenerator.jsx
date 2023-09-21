import React, { useState, useRef } from "react";
import image from "../assets/default_image.svg";
import "./ImageGenerator.css";
// import fs from 'node:fs'

const ImageGenerator = () => {
  const [image_url, setImage_url] = useState("/");
  let inputRef = useRef(null);
  const handleSubmit = async () => {
    if (inputRef.current.value === "".trim()) return 0;
    const engineId = "stable-diffusion-xl-1024-v1-0";
    const response = await fetch(
      // "https://api.openai.com/v1/images/generations",

      // {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization:
      //       "Bearer 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",
      //     "User-Agent": "Chrome",
      //   },
      //   body: JSON.stringify({
      //     prompt: `${inputRef.current.value}`,
      //     n: 1,
      //     size: "512x512",
      //   }),
      // }

      //   "https://api.deepai.org/api/text2img ",

      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //       // text: `${inputRef.current.value}`,
      //       "api-key": "5a4bb5d8-0072-4e66-a19f-bc312ca000bb",
      //       "User-Agent": "Chrome",
      //     },
      //     body: JSON.stringify({
      //       prompt: `${inputRef.current.value}`,
      //       n: 1,
      //       size: "512x512",
      //     }),
      //   }

      `https://api.stability.ai/v1/generation/${engineId}/text-to-image`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer sk-EDouKI3bTNnFfRjZQN00bGBfJvaz0ScZq72G1Y00HIuwRALv`,
        },
        body: JSON.stringify({
          text_prompts: [
            {
              text: `${inputRef.current.value}`,
            },
          ],

          height: 1024,
          width: 1024,

          samples: 1,
        }),
      }
    );
    if (!response.ok) {
      throw new Error(`Non-200 response: ${await response.text()}`);
    }
    const data = await response.json();

    console.log(data); 
  };

  return (
    <div className='ai-image-generator'>
      <div className='header'>
        AI image<span> generator</span>
      </div>
      <div className='img-loading'>
        <div className='image'>
          <img src={image_url === "/" ? image : image_url} alt='image' />
        </div>
      </div>
      <div className='search-box'>
        <input
          type='text'
          ref={inputRef}
          className='search-input'
          placeholder='Describe what you want to see'
        />
        <div
          className='generate-btn'
          onClick={() => {
            handleSubmit();
          }}
        >
          generate
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
