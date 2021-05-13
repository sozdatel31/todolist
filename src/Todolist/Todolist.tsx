import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import {FilterValuestype} from "../App";
import AddItemForm from "../AddItemForm";
import EditableSpan from "../EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TodolistType} from "../AppWithRedux";
import Task from "../Task";

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
    changeTaskTitle: (taskID: string, title: string, todolistID: string) => void
    changeTodolistTitle: (title: string, todolistID: string) => void
}


export const Todolist = React.memo((props: PropsType) => {

    const removeTask = useCallback((taskId: string) => props.removeTask(taskId, props.id), [props.removeTask])

    const changeTaskStatus = useCallback((taskId: string, newIsDoneValue: boolean) => props.changeTaskStatus(taskId, newIsDoneValue, props.id), [props.changeTaskStatus])

    const changeTaskTitle = useCallback((taskId: string, newValue: string) => props.changeTaskTitle(taskId, newValue, props.id), [props.changeTaskTitle])

    const changeTodolistTitle = useCallback((title: string) => props.changeTodolistTitle(title, props.id), [props.changeTodolistTitle, props.id])
    // const tasks = getTaskForTodolist().map(t => {
    //     const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
    //
    //     const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.id)
    //     const removeTask = () => props.removeTask(t.id, props.id)
    //     return (
    //         <li key={t.id}>
    //             <Checkbox
    //                 color={"primary"}
    //                 checked={t.isDone}
    //                 onChange={changeStatus}
    //             />
    //
    //             <EditableSpan title={t.title} changetitle={changeTaskTitle}/>
    //             <IconButton onClick={(() => props.removeTask(t.id, props.id))}>
    //                 <Delete/>
    //             </IconButton>
    //         </li>
    //     )
    // },)
    const setAllFilterValue = useCallback(() => {
        props.changeTodoListFilter("all", props.id)
    }, [props.changeTodoListFilter, props.id])
    const setActiveFilterValue = useCallback(() => {
        props.changeTodoListFilter("active", props.id)
    }, [props.changeTodoListFilter, props.id])
    const setCompletedFilterValue = useCallback(() => {
        props.changeTodoListFilter("completed", props.id)
    }, [props.changeTodoListFilter, props.id])

    const removeTodolist = () => props.removeTodolist(props.id)
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    function getTaskForTodolist(): Array<TaskType> {
        switch (props.todolistFilter) {
            case "active":
                return props.tasks.filter(t => t.isDone === false)
            case "completed":
                return props.tasks.filter(t => t.isDone === true)
            default:
                return props.tasks
        }
    }

    return <div>
        <h3>
            <EditableSpan title={props.titleN} changetitle={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>

        <ul style={{listStyle: "none", padding: "0px"}}>
            {getTaskForTodolist().map(t => <Task
                key={t.id}
                task={t}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}/>
            )}
        </ul>
        <div>
            <Button
                style={{marginRight: "5px"}}
                size={"small"}
                color={"primary"}
                variant={props.todolistFilter === "all" ? "outlined" : "contained"}
                onClick={setAllFilterValue}> All
            </Button>
            <Button
                style={{marginRight: "5px"}}
                size={"small"}
                color={"primary"}
                variant={props.todolistFilter === "active" ? "outlined" : "contained"}
                onClick={setActiveFilterValue}>Active
            </Button>
            <Button
                style={{marginRight: "5px"}}
                size={"small"}
                color={"primary"}
                variant={props.todolistFilter === "completed" ? "outlined" : "contained"}
                //className={props.todolistFilter === "completed" ? "active-filter" : ""}
                onClick={setCompletedFilterValue}>Completed
            </Button>
        </div>
    </div>
})