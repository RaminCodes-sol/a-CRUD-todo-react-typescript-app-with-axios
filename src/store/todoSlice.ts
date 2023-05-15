import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { InitialStateType, TodoType } from './interfaces'



axios.defaults.baseURL = 'http://localhost:3000'
const delay = (time: number) => new Promise(resolve => setTimeout(resolve, time))



/*----------Fetch-Todos-Data----------*/
export const fetchTodosData = createAsyncThunk(
    'todos/fetchTodosData', 
    async () => {
        await delay(400)
        const response = await axios.get<TodoType[]>('/todos')
        return response.data
    }
)


/*----------Fetch-Add-Todo----------*/
export const fetchAddTodo = createAsyncThunk(
    'todos/fetchAddTodo', 
    async (newTodo: TodoType) => {
        await delay(300)
        const response = await axios.post<TodoType>('/todos', newTodo)
        return response.data
    }
)


/*----------Fetch-Delete-Todo----------*/
export const fetchDeleteTodo = createAsyncThunk(
    'todo/fetchDeleteTodo',
    async (id: number) => {
        await delay(300)
        await axios.delete(`/todos/${id}`)
        return id
    }
)


/*----------Fetch-Update-Completed-Todo----------*/
export const fetchUpdateCompletedTodo = createAsyncThunk(
    'todos/fetchUpdateCompletedTodo',
    async ({ id, completed }: { id: number, completed: boolean }) => {
        await delay(300)
        const response = await axios.patch(`/todos/${id}`, { completed })
        return response.data
    }
)


/*----------Fetch-Edit-Todo----------*/
export const fetchEditTodo = createAsyncThunk(
    'todos/fetchEditTodo',
    async ({ id, title }: { id: number, title: string }) => {
        await delay(300)
        const response = await axios.patch(`/todos/${id}`, { title })
        return response.data
    }
)




/*----------Initial-State----------*/
const initialState: InitialStateType = {
    todos: [],
    loading: false,
    updating: false
}


const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        /*----------Get-Todos----------*/
        builder
            .addCase(fetchTodosData.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchTodosData.fulfilled, (state, { payload }: PayloadAction<TodoType[]>) => {
                state.loading = false
                state.todos = payload
            })
            .addCase(fetchTodosData.rejected, (state) => {
                state.loading = false
            })


        /*----------Add-Todo----------*/
        builder
            .addCase(fetchAddTodo.pending, (state) => {
                state.updating = true
            })
            .addCase(fetchAddTodo.fulfilled, (state, { payload }: PayloadAction<TodoType>) => {
                state.updating = false
                state.todos = [payload, ...state.todos]
            })


        /*----------Delete-Todo----------*/
        builder
            .addCase(fetchDeleteTodo.pending, (state) => {
                state.updating = true
            })
            .addCase(fetchDeleteTodo.fulfilled, (state, { payload }) => {
                state.updating = false
                state.todos = state.todos.filter(todo => todo.id !== payload)
            })


        /*----------Complete-Todo----------*/
        builder
           .addCase(fetchUpdateCompletedTodo.pending, (state) => {
                state.updating = true
           })
           .addCase(fetchUpdateCompletedTodo.fulfilled, (state, { payload }: PayloadAction<TodoType>) => {
                state.updating = false
                state.todos = state.todos.map(todo => todo.id === payload.id ? { ...todo, completed: payload.completed } : todo)
           })


        /*---------Edit-Todo----------*/
        builder
           .addCase(fetchEditTodo.pending, (state) => {
                state.updating = true
           })
           .addCase(fetchEditTodo.fulfilled, (state, { payload }: PayloadAction<TodoType>) => {
                state.updating = false
                state.todos = state.todos.map(todo => todo.id === payload.id ? { ...todo, title: payload.title } : todo)
           })

    }
})

export default todoSlice.reducer