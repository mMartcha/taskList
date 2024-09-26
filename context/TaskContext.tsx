import { createContext, ReactNode, useState } from "react";


export type TaskProps ={
    id: string
    tarefaText: string
    data: string
    isChecked: boolean
    taskProgress: number
    taskPriority: string
    editModalOpen: boolean
}

type TaskContextProps={
    taskList: TaskProps[]
    setTaskList: React.Dispatch<React.SetStateAction<TaskProps[]>>
    tarefaText: string
    setTarefaText: React.Dispatch<React.SetStateAction<string>>
    data: string
    setData: React.Dispatch<React.SetStateAction<string>>
    taskProgress: number
    setTaskProgress: React.Dispatch<React.SetStateAction<number>>
    taskPriority: string
    setTaskPriority: React.Dispatch<React.SetStateAction<string>>
    editModalOpen: boolean
    setEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    selectedTask: TaskProps
    setSelectedTask: React.Dispatch<React.SetStateAction<TaskProps>>
    moreOptions: boolean
    SetMoreOptions:React.Dispatch<React.SetStateAction<boolean>>
}

type TaskContextProviderProps ={
    children: ReactNode
}
export const TaskContext = createContext({} as TaskContextProps)


export function TaskContextProvider({children}:TaskContextProviderProps){

    const [taskList, setTaskList] = useState<TaskProps[]>([])

    const [tarefaText, setTarefaText] = useState('')
    const [data, setData] = useState('')
    const [taskPriority, setTaskPriority] = useState('')
    const [taskProgress, setTaskProgress] = useState(0)    
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [selectedTask, setSelectedTask] = useState<TaskProps>({} as TaskProps)
    const [moreOptions, SetMoreOptions] = useState(false) 

    return(
        <TaskContext.Provider value={{
            taskList,setTaskList,
            tarefaText,setTarefaText,
            data, setData,
            taskProgress, setTaskProgress,
            taskPriority, setTaskPriority,
            editModalOpen, setEditModalOpen,
            selectedTask, setSelectedTask,
            moreOptions, SetMoreOptions
        }}>
            {children}

        </TaskContext.Provider>
    )
}

