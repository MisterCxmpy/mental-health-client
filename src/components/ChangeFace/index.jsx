import { useState } from "react"

const faces = ["😐", "😀", "😚", "😋", "😎", "😂", "😍", "🤩", "🙂", "😆", "😛", "😝", "😜", "🤑", "😲", "🙃", "🤗", "🤪", "🤓"]

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
    <div onMouseOver={getRandomFace}>
      {face}
    </div>
  )
}
