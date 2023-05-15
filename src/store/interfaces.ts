

export interface TodoType {
    id: number,
    title: string,
    completed: boolean
}

export interface InitialStateType {
    todos: TodoType[],
    loading: boolean,
    updating: boolean
}


