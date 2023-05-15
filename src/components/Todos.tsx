import Todo from "./Todo"
import { TodoType } from "../store/interfaces"
import { useLayoutEffect, useState } from "react"



interface PropsType {
  todos: TodoType[],
  loading: boolean,
  updating: boolean
}


const Todos:React.FC<PropsType> = ({ todos, loading, updating }) => {
  const [selectedValue, setSelectedValue] = useState<string>('')


  const handleChangeByFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value)
  }
   
  useLayoutEffect(() => {
    setSelectedValue('all')
  }, [])
  


  return (
    <div>

      {/*-------Filters-------*/}
      <div className="flex justify-between items-center px-3 mt-4">
        <div className="h-full my-4">
          <select value={selectedValue} onChange={handleChangeByFilter} name='actions' className='appearance-none py-2 cursor-pointer text-center bg-[magenta] transition-colors hover:bg-[#f81cf8] text-white px-3 rounded'>
            <option value='all' className="text-[.91rem] bg-white text-black">All</option>
            <option value='completed' className="text-[.91rem] bg-white text-black">Completed</option>
            <option value='uncompleted' className="text-[.91rem] bg-white text-black">unCompleted</option>
          </select>
        </div>
        { updating && <h1 className='text-center text-white'>Updating...</h1> }
      </div>
      
     
      {/*-------Loading-------*/}
      { loading && <h1 className="text-center text-white py-3">Loading...</h1> }


      {/*-------Todos-------*/}
      { todos.length === 0 && loading === false &&  <h1 className="text-center text-white">no todos</h1> }
      
      <ul className="mt-3 h-[450px] overflow-y-scroll flex flex-col px-2 pt-2">
        {
          selectedValue === 'all' 
          ? todos?.map(todo => {
              return <Todo key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} />
            })
          : todos?.map(todo => {
              if(selectedValue === 'completed' && todo.completed === true) {
                return <Todo key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} />
              } else if (selectedValue === 'uncompleted' && todo.completed === false) {
                return <Todo key={todo.id} id={todo.id} title={todo.title} completed={todo.completed} />
              }
          })
        }
      </ul>

    </div>
  )
}

export default Todos