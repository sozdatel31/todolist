import {FilterValuestype, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    todolistID: string
}
export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string,
    id: string
}
type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    todolistID: string
}

type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    newFilterValue: FilterValuestype
    todolistID: string
}

export type ActionType= RemoveTodoListAT | AddTodoListAT| ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todoListsReducer = (todoLists: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.todolistID)
        case "ADD-TODOLIST":
            // const newTodolistID = v1()
            const newTodolist: TodolistType = {
                id: action.id,
                title: action.title,
                filter: "all"
            }
            return [...todoLists, newTodolist]
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(tl => tl.id === action.todolistID ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(tl => tl.id === action.todolistID ? {...tl, filter: action.newFilterValue} : tl)
        default:
            return todoLists
    }
}

export const RemoveTodolistAC = (todolistID: string):RemoveTodoListAT => {
    return {type: "REMOVE-TODOLIST", todolistID: todolistID}
}
export const AddTodolistAC = (title: string):AddTodoListAT => {
    return {type: "ADD-TODOLIST", title: title, id: v1()}
}
