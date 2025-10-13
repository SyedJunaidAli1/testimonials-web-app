import { signUp } from '@/server/users'
import React from 'react'

const page = () => {
  return (
    <div>
      <button onClick={signUp}>signup</button>
    </div>
  )
}

export default page
