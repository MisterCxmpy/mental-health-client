/* eslint-disable no-unused-vars */

import { useState, useEffect } from "react"
import { MeditationList, MeditationModal, Modal, TaskContainer, UserStats } from "../../components"
import styles from "./index.module.css"

import meditationTypes from '../../../assets/meditations.json'
import { useAuth } from "../../contexts/authContext"

export default function Home() {
  const { user } = useAuth()
  const [meditation, setMeditation] = useState(null);
  const [modal, setModal] = useState(false);
  const [shortTermGoals, setShortTermGoals] = useState(false);

  const handleSelectMeditation = (thing) => {
    console.log(thing);
    setModal(true)
    setMeditation(thing);
  }

  useEffect(() => {
    const getUserGoals = async () => {
      let options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: user.user_id }) }
      let response = await fetch('http://localhost:3000/user/st/goals', options)

      let data = await response.json()

      if (response.ok) {
        setShortTermGoals(data)
      }

      console.log(data)
    }

    if (user && !user?.goals.length) {
      getUserGoals()
    }

  }, [])

  return (
    <>
      {modal ? <Modal setOpen={setModal} content={<MeditationModal {...meditation} />} /> : null}
      <div className="layout">
        <div className={styles["container"]}>
          <UserStats />

          <MeditationList items={meditationTypes} setMeditation={handleSelectMeditation} />

          <TaskContainer goals={shortTermGoals} />
        </div>
      </div>

    </>
  )
}
