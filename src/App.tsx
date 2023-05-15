import { useDispatch, useSelector } from "react-redux"
import Input from "./components/Input"
import Todos from "./components/Todos"
import { AppDispatch, RootState } from "./store/store"
import { fetchTodosData } from "./store/todoSlice"
import { useEffect } from "react"




const App = () => {
  const { todos, loading, updating } = useSelector((state: RootState) => state)
  const dispatch = useDispatch<AppDispatch>()

  
  useEffect(()=> {
    dispatch(fetchTodosData())
  }, [])


  return (
    <div id='app'>
      <div className="w-full max-w-[570px] mx-auto">
        <Input />
        <Todos todos={todos} loading={loading} updating={updating} />
      </div>
    </div>
  )
}

export default App
