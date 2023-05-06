/* eslint-disable no-unused-vars */

import { useState } from "react"
import { MeditationList, MeditationModal, Modal, TaskContainer, UserStats } from "../../components"
import styles from "./index.module.css"

import meditationTypes from '../../../assets/meditations.json'

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
      {modal ? <Modal setOpen={setModal} content={<MeditationModal {...meditation} />} /> : null}
      <div className="layout">
        <div className={styles["container"]}>
          <UserStats />

          <MeditationList items={meditationTypes} setMeditation={handleSelectMeditation} />

          <TaskContainer />
        </div>
      </div>

    </>
  )
}
