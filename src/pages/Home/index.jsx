/* eslint-disable no-unused-vars */

import { useState } from "react"
import { MeditationList, MeditationModal, Modal, TaskContainer, UserStats } from "../../components"
import styles from "./index.module.css"

const meditationTypes = [
  { type: "Vipassanna", src: '/assets/booli.mp3' },
  { type: "Yoga", src: '/assets/booli.mp3' },
  { type: "Gratitude", src: '/assets/booli.mp3' },
  { type: "Compassion", src: '/assets/booli.mp3' },
  { type: "Walking", src: '/assets/booli.mp3' }
];

export default function Home() {
  const [meditation, setMeditation] = useState(null);
  const [modal, setModal] = useState(false);

  const handleSelectMeditation = (thing) => {
    console.log(thing);
    setModal(true)
    setMeditation(thing);
  }

  return (
    <>
      <div className="layout">
        <div className={styles["container"]}>
          <UserStats />

          <MeditationList items={meditationTypes} setMeditation={handleSelectMeditation} />

          <TaskContainer />
        </div>
      </div>
      {modal ? <Modal setOpen={setModal} content={<MeditationModal {...meditation} />} /> : null}
    </>
  )
}
