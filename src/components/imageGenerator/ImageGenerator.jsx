import React, { useState, useRef } from "react";
import image from "../assets/default_image.svg";
import "./ImageGenerator.css";
import Loader from "../loader/Loader";

const ImageGenerator = () => {
  const [image_url, setImage_url] = useState("/");
  let inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getImage = async () => {
    if (inputRef.current.value === "".trim()) {
      setError("Error! Must have a search term");
      setTimeout(() => {
        setError("");
      }, 2500);
      return;
    }

    try {
      const response = await fetch(
        "https://api.openai.com/v1/images/generations",

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer 5cfd9860-3467-458f-98e5-d10267753c39",
            "User-Agent": "Chrome",
          },
          body: JSON.stringify({
            prompt: `${inputRef.current.value}`,
            n: 1,
            size: "512x512",
          }),
        }
      );

      const data = await response.json();
      const data_array = data.data;
      setImage_url(data_array[0].url);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
      alert(err.message);
    }
  };

  return (
    <div className='ai-image-generator'>
      <div className='header'>
        AI image<span> generator</span>
      </div>
      <div className='img-loading'>
        <div className='image'>
          <img src={image_url === "/" ? image : image_url} alt=' no-image' />
          <div className='loading-container'>
            <Loader loading={loading} />
          </div>
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
          className='generate-btn button button--B'
          onClick={() => {
            getImage();
          }}
        >
          <div className='glow_back'></div>
          <div className='glow_front'></div>
          <div className='twinkle_white'></div>
          <div className='twinkle_color'></div>
          <div className='reflection_top'></div>
          <div className='reflection_bottom'></div>
          <div className='shine'></div>
          <div className='shine_shadow_R'></div>
          <span className='text'>generate</span>
        </div>
      </div>
      <div className='error'>{error && <p>{error}</p>}</div>
    </div>
  );
};

export default ImageGenerator;
