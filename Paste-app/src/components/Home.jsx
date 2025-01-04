import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToPastes, updateToPastes } from '../redux/pasteSlice'

const Home = () => {

  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const pasteId = searchParams.get('pasteId')
  const dispatch = useDispatch()


  function createPaste(){
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString()
    }

    if(pasteId){
      dispatch(updateToPastes(paste))
    }
    else{
      dispatch(addToPastes(paste))
    }

    setTitle('')
    setValue('')
    setSearchParams({})
  }

  return (
    <div>
      <div>
      <input className='p-2 rounded-2xl mt-2'
      type="text"
      placeholder='Enter title here'
      value={title}
      onChange={(e) => setTitle(e.target.value)}
       />

       <button onClick={createPaste}>
          {
            pasteId ? 'Update Paste' : 'Create Paste'
          }
       </button>

    </div>

    <div>
      <textarea className='mt-5 p-5 rounded-e-2xl min-w-[500px]'
      value={value}
      placeholder='Enter content here'
      onChange={(e) => setValue(e.target.value)}
      rows={20}
      />
    </div>
    </div>
  )
}

export default Home