import { useDeferredValue, useState } from 'react'
import './App.css'
import { useEffect } from 'react';

export default function App() {
  const [scale, setScale] = useState(1);
  const [origin, setOrigin] = useState("center center")
  const [seat, setSeat] = useState(0);

  const [seatCounter, setSeatCounter] = useState(1);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  })
  const heightValue = useDeferredValue(windowDimensions.height);
  const widthValue = useDeferredValue(windowDimensions.width);
  

  useEffect(() => {
    setTimeout(() => {
      setSeat(seatCounter)
    }, 2000)
  }, [seatCounter])

  useEffect(() => {
    if(scale !== 1) {
      setTimeout(() => {
        setScale(1);
        // setSeat(0);
        if(seatCounter === 7) {
          setSeatCounter(1);
        } else {
          setSeatCounter(seatCounter + 1)
        }
      }, 2000);
    }
  }, [scale])

  useEffect(() => {
    console.log(seat);
    if(seat === 0) return;
    setScale(1.5)
    switch(seat) {
      case 1:
        setOrigin("left top");
        break;
      case 2:
        setOrigin("24% top");
        break;
      case 3:
        setOrigin("36% top");
        break;
      case 4:
        setOrigin("center top");
        break;
      case 5:
        setOrigin("60% top");
        break;
      case 6:
        setOrigin("84% top");
        break;
      case 7:
        setOrigin("right top");
        break;

      default:
        setOrigin("left top");
        break;
    }
  }, [seat])

  useEffect(() => {
    window.addEventListener("resize", e => {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    })
  }, [])

  return (
    <div style={{ transform: `scale(${scale})`, transformOrigin: `${origin}` }} className='main'>
      <div style={{ width: widthValue }} className='betspots-container'>
        {
          [...new Array(7)].map((_, index) => {
            return <div className={index + 1 === seat ? "betspots-highlight" : 'betspots'} key={index} id={`bs-${index+1}`}>{index + 1}</div>
          })
        }
      </div>
      <video
        style={{ transform: `scale(${scale})`, width: widthValue, height: heightValue }}
        className='video-container'
        controls={false}
        autoPlay
        loop
        muted
      >
        <source src="https://media.geeksforgeeks.org/wp-content/uploads/20231020155223/Full-Stack-Development-_-LIVE-Classes-_-GeeksforGeeks.mp4" type="video/mp4" ></source>
    </video>
    </div>
  )
}
