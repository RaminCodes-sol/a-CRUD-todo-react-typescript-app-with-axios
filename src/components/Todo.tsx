import { TodoType } from "../store/interfaces"
import { BiEditAlt } from "react-icons/bi"
import { HiTrash } from "react-icons/hi"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../store/store"
import { fetchDeleteTodo, fetchEditTodo, fetchUpdateCompletedTodo } from "../store/todoSlice"
import { FormEvent, useRef, useState } from "react"




const Todo:React.FC<TodoType> = ({ id, title, completed }) => {
  const [isEditable, setIsEditable] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch<AppDispatch>()
  

  /*--------DeleteTodo--------*/
  const deleteTodo = (id: number) => {
    dispatch(fetchDeleteTodo(id))
  }


  /*--------CompleteTodo--------*/
  const completeTodo = (id: number, completed: boolean) => {
    dispatch(fetchUpdateCompletedTodo({ id, completed: !completed }))
  }


  /*--------HandleInputChange--------*/
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }


  /*--------EditTodo--------*/
  const editTodo = (e: FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault()
    if (inputValue === '') {
      return
    }
    if (isEditable) {
        dispatch(fetchEditTodo({ id, title: inputValue }))
        setInputValue('')
        setIsEditable(false)
    }
  }


  return (
    <li className="bg-purple-700 rounded text-white mb-2 px-3 py-3 grid">

      {/*----------Title-&-EditInput----------*/}
      {
        isEditable
          ?
            <form className="flex mb-6 lg:m-0" onSubmit={(e) => editTodo(e, id)}>
              <input type="text" ref={inputRef} value={inputValue} onChange={handleInputChange} placeholder="new Text..." className="text-black px-2 py-[.6rem] text-l rounded-tl rounded-bl border-none outline-none" />
              <button className="bg-[magenta] px-3 rounded-tr rounded-br">Edit</button>
            </form>
          : 
            <h3 className="mb-5">{title}</h3>
      }


      {/*----------Action-Buttons----------*/}
      <div className="justify-self-end flex items-center gap-5">
        <input type='checkbox' checked={completed} onChange={() => completeTodo(id, completed)} className="w-[27px] h-[27px] cursor-pointer outline-none border-none"/>
        <button onClick={() => {
            setIsEditable(prevState => !prevState)
            setInputValue(title)
            inputRef.current?.focus()
          }} className="bg-[magenta] text-2xl p-[.1rem] rounded">
          <BiEditAlt />
        </button>
        <button onClick={() => deleteTodo(id)} className="bg-red-500 text-2xl p-[.1rem] rounded"><HiTrash /></button>
      </div>

    </li>
  )
}

export default Todo