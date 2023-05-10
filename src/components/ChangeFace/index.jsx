import { useState } from "react"
import faces from "./faces.json"

export default function ChangeFace() {

  const [face, setFace] = useState(faces[Math.floor(Math.random() * faces.length)])

  function getRandomFace() {

    const newFace = faces[Math.floor(Math.random() * faces.length)]

    if (newFace == face) {
      getRandomFace()
    }else {
      setFace(newFace)
    }

  } 

  return (
    <div role="face" style={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center"}} onMouseOver={getRandomFace}>
      {face}
    </div>
  )
}
