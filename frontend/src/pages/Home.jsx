import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../features/auth/authSlice'
import Calender from '../components/Calender'

const Home = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    if(!user) {
      navigate('/login')
    }
  }, [user, navigate])

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/login')
  }

  return (
    <div className='flex flex-col'>
      <header className='flex justify-between items-center px-5 w-full h-20 shadow-sm bg-white'>
        <h1 className='text-2xl font-bold'>CalenderApp</h1>
        
        <ul className='flex gap-2'>
          {user ? (<>
            <li>
              <button onClick={onLogout} className='px-5 py-3 font-bold'>Logout</button>
            </li>
          </>) : (<>
            <li>
              <Link to='/login' className='px-5 py-3 font-bold'>Login</Link>
            </li>
            <li>
              <Link to='/register' className='px-5 py-3 font-bold'>Register</Link>
            </li>
          </>)}
          
        </ul>
      </header>

      <div>
        <Calender />
      </div>

    </div >
  )
}

export default Home