"use client"

import React from 'react'
import { useGlobalState } from '../context/globalProvider'
import Tasks from '../Components/Tasks/Tasks';

function page() {
  const {unimportantTasks} = useGlobalState();
  return (
    <Tasks title="All Important Tasks" tasks={unimportantTasks}/>
  )
}

export default page