import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuestype} from "../App";

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
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const tasks = props.tasks.map(t => {
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
        return (
            <li key={t.id}>
                <input
                    onChange={changeStatus}
                    type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
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
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.id)
        } else {
            setError("Title is requiered")
        }
        setTitle("")
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }
    const removeTodolist = () => props.removeTodolist(props.id)
    return <div>
        <h3>{props.titleN}<button onClick={removeTodolist}>X</button></h3>
        <div>
            <input
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddTask}
                className={error ? "error" : ""}
            />


            <button onClick={addTask}>+</button>
            {error && <div className={"error-text"}>{error}</div>}
        </div>
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