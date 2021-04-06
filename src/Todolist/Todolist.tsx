import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuestype} from "../App";
import AddItemForm from "../AddItemForm";
import EditableSpan from "../EditableSpan";

export type TaskType = {
    title: string;
    id: string;
    isDone: boolean;
}
type PropsType = {
removeTodolist: (todolistID: string) => void
    id: string;
    titleN: string;
    todolistFilter: FilterValuestype
    tasks: Array<TaskType>
    changeTodoListFilter: (newFilterValue: FilterValuestype, todolistID: string) => void
    removeTask: (taskID: string, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, newIsDoneValue: boolean, todolistID: string) => void
    changeTaskTitle: (taskID: string, title:string, todolistID: string) => void
    changeTodolistTitle: (title: string, todolistID: string) => void
}

export function Todolist(props: PropsType) {
    const changeTodolistTitle = (title:string) => props.changeTodolistTitle(title, props.id)
    const tasks = props.tasks.map(t => {
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)

        const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.id)
        return (
            <li key={t.id}>
                <input
                    onChange={changeStatus}
                    type="checkbox"
                    checked={t.isDone}/>
                    <EditableSpan title={t.title} changetitle={changeTaskTitle}/>
                <button onClick={(() => props.removeTask(t.id, props.id))}>x</button>
            </li>
        )
    })
    const setAllFilterValue = () => {
        props.changeTodoListFilter("all", props.id)
    }
    const setActiveFilterValue = () => {
        props.changeTodoListFilter("active", props.id)
    }
    const setCompletedFilterValue = () => {
        props.changeTodoListFilter("completed", props.id)
    }

    const removeTodolist = () => props.removeTodolist(props.id)
    const addTask = (title: string) => {props.addTask(title, props.id)}

    return <div>
        <h3>
        <EditableSpan title={props.titleN} changetitle={changeTodolistTitle}/>
        <button onClick={removeTodolist}>X</button>
        </h3>
        <AddItemForm addItem={addTask} />

        <ul>
            {tasks}
        </ul>
        <div>
            <button
                className={props.todolistFilter === "all" ? "active-filter" : ""}
                onClick={setAllFilterValue}> All
            </button>
            <button
                className={props.todolistFilter === "active" ? "active-filter" : ""}
                onClick={setActiveFilterValue}>Active
            </button>
            <button
                className={props.todolistFilter === "completed" ? "active-filter" : ""}
                onClick={setCompletedFilterValue}>Completed
            </button>
        </div>
    </div>
}