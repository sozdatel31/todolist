import {FilterValuestype, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../Todolist/Todolist";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";

type RemoveTaskActionType = {
    type: "REMOVE_TASK"
    taskID: string,
    todolistID: string

}
type AddTaskActionType = {
    type: "ADD_TASK",
    taskTitle: string,
    todolistID: string
}
type ChangeTaskStatusType = {
    type: "CHANGE_STATUS_TASK",
    taskID: string,
    taskIsDone: boolean,
    todolistID: string
}
type ChangeNameTaskType = {
    type: "NAME_TASK",
    taskID: string,
    title: string,
    todolistID: string
}


export type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusType
    | ChangeNameTaskType
    | AddTodoListAT
    | RemoveTodoListAT


export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE_TASK": {
            let copyState = {...state}
            copyState[action.todolistID] = copyState[action.todolistID].filter(task => task.id !== action.taskID)
            return copyState
        }
        case "ADD_TASK":
            const task: TaskType = {
                id: v1(),
                title: action.taskTitle,
                isDone: false
            }
            let newTasksTodolist = [task, ...state[action.todolistID]]
            return {...state, [action.todolistID]: newTasksTodolist}
        case "CHANGE_STATUS_TASK":
             let copyState2 = {...state}
            copyState2[action.todolistID] = copyState2[action.todolistID].map(t => t.id === action.taskID ? {...t, isDone: action.taskIsDone} : t)
             return copyState2
            // let copyState = {...state}
            // let updateTaskTodolist = copyState[action.todolistID].map(task=> {
            //     task.id === action.taskID ? {...task, isDone: action.taskIsDone} : task
            // })
            // return {
            //     ...state, [action.todolistID]: updateTaskTodolist
            // }
        case "NAME_TASK": {
            let copyState = {...state}
            copyState[action.todolistID] = {
                ...state[action.todolistID].map(t => t.id === action.taskID ? {
                    ...t,
                    title: action.title
                } : t)
            }
            return copyState
        }
        case "ADD-TODOLIST": {
            return {...state, [action.id]: []}
        }
        case "REMOVE-TODOLIST": {
            let copyState = {...state}
            delete copyState[action.todolistID]
            return copyState
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskID: string, todolistID: string): RemoveTaskActionType => {
    return {
        type: "REMOVE_TASK",
        taskID: taskID,
        todolistID: todolistID
    }
}
export const addTaskAC = (taskTitle: string, todolistID: string): AddTaskActionType => {
    return {
        type: "ADD_TASK",
        taskTitle: taskTitle,
        todolistID: todolistID
    }
}

export const changeTaskStatusAC = (taskID: string, taskIsDone: boolean, todolistID: string): ChangeTaskStatusType => {
    return {
        type: "CHANGE_STATUS_TASK",
        taskID: taskID,
        taskIsDone: taskIsDone,
        todolistID: todolistID
    }
}
export const changeNameTaskAC = (taskID: string, title: string, todolistID: string): ChangeNameTaskType => {
    return {
        type: "NAME_TASK",
        taskID: taskID,
        title: title,
        todolistID: todolistID
    }
}
// export const AddTodolistAC = (todolistTitle: string): AddTodoListAT => {
//     return {
//         type: "ADD-TODOLIST",
//         title: todolistTitle,
//     }
// }