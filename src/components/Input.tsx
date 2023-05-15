import { useEffect, useRef, useState } from "react"
import { AppDispatch } from "../store/store"
import { useDispatch } from 'react-redux'
import {  fetchAddTodo } from "../store/todoSlice"




const Input = () => {
  const [inputValue, setInputValue] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch<AppDispatch>()


  /*----------HandleInputChange----------*/
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }


  /*----------HandleSubmitChange----------*/
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newTodo = { id: Date.now(), title: inputValue, completed: false };
    dispatch(fetchAddTodo(newTodo));
    setInputValue('')
    inputRef.current?.focus()
  }


  useEffect(() => {
    inputRef.current?.focus()
  }, [])
  

  return (
    <section className="w-full flex flex-col justify-center gap-4 pt-6 px-2">

        <form className='w-full flex' onSubmit={handleSubmit}>
            <input ref={inputRef} type='text' value={inputValue} onChange={handleInputChange} placeholder='Enter your todo...' className="w-full px-3 py-4 outline-none border-none text-[1.1rem] rounded-sm" />
            <button className="bg-purple-600 px-4 text-white rounded-tr rounded-br transition-colors hover:bg-purple-700">Add</button>
        </form>

    </section>
  )
}

export default Input