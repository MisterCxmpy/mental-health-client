/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { useState, useEffect } from "react"
import { MeditationList, MeditationModal, Modal, TaskContainer, UserStats } from "../../components"
import styles from "./index.module.css"

import meditationTypes from '../../../assets/meditations.json'
import { useAuth } from "../../contexts/authContext"

export default function Home() {
  const { user, saveUser } = useAuth()
  const [meditation, setMeditation] = useState(null);
  const [modal, setModal] = useState(false);
  const [shortTermGoals, setShortTermGoals] = useState(user.st_goals || []);

  const getUserGoals = async () => {
    let options = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: user.user_id }) }
    let response = await fetch('https://mental-health-server-w9lq.onrender.com/user/st/goals', options)

    let data = await response.json()

    if (response.ok) {
      saveUser(data)
      setShortTermGoals(data.st_goals)
    }
  }

  const handleSelectMeditation = (meditation) => {
    setModal(true)
    setMeditation(meditation);
  }

  useEffect(() => {
    if (user && !user?.st_goals.length) {
      getUserGoals()
    }
  }, [])

  useEffect(() => {
   setShortTermGoals(user.st_goals)
  }, [user])

  return (
    <>
      {modal ? <Modal setOpen={setModal} content={<MeditationModal {...meditation} />} /> : null}
      <div className="layout">
        <div className={styles["container"]}>
          <UserStats />

          <MeditationList items={meditationTypes} setMeditation={handleSelectMeditation} />

          <TaskContainer goals={shortTermGoals} getUserGoals={getUserGoals} />
        </div>
      </div>

    </>
  )
}
