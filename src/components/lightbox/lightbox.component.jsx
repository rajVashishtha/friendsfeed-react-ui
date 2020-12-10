import React from 'react';
import { SRLWrapper } from 'simple-react-lightbox';

const options = {
  buttons: {
    backgroundColor: '#1C7293',
    iconColor: '#e8eddf',
    iconPadding: '7px'
  },
  caption: {
    captionColor: '#e8eddf',
    captionFontSize: '30px'
  },
  settings: {
    overlayColor: 'rgba(6, 90, 130, 1)'
  },
  thumbnails: {
    thumbnailsAlignment: 'start'
  }
}

const images = [
  {
    src: 'https://www.simple-react-lightbox.dev/docs/gallery/unsplash01.jpg',
    caption: 'Lorem ipsum dolor sit amet',
    width: 1920,
    height: 'auto'
  },
  {
    src: 'https://www.simple-react-lightbox.dev/docs/gallery/unsplash02.jpg',
    caption: 'Consecutur adiscip elit',
    width: 2000,
    height: 'auto'
  },
  {
    src: 'https://www.simple-react-lightbox.dev/docs/gallery/unsplash03.jpg',
    thumbnail:
      'https://www.simple-react-lightbox.dev/docs/gallery/thumbnails/unsplash03.jpg',
    caption: 'Commodo commodo dolore',
    width: 1024,
    height: 'auto'
  }
]

// Callback(s) to be passed to the SRLWrapper
const callbacks = {
  onSlideChange: slide => console.log(slide),
  onLightboxOpened: current => console.log(current),
  onLightboxClosed: current => console.log(current),
  onCountSlides: total => console.log(total)
}

const LightBox = () => {
  return (
      <SRLWrapper options={options} images={images} callbacks={callbacks} />
  )
}

export default LightBox;
