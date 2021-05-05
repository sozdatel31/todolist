import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuestype} from "../App";
import AddItemForm from "../AddItemForm";
import EditableSpan from "../EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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

export function Todolist(props: PropsType) {

    const changeTodolistTitle = (title: string) => props.changeTodolistTitle(title, props.id)
    const tasks = props.tasks.map(t => {
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)

        const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.id)
        return (
            <li key={t.id}>
                <Checkbox
                    color={"primary"}
                    checked={t.isDone}
                    onChange={changeStatus}
                />

                <EditableSpan title={t.title} changetitle={changeTaskTitle}/>
                <IconButton onClick={(() => props.removeTask(t.id, props.id))}>
                    <Delete/>
                </IconButton>
                {/*<Button*/}
                {/*    */}
                {/*    onClick={(() => props.removeTask(t.id, props.id))}>x</Button>*/}
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
    const addTask = (title: string) => {
        props.addTask(title, props.id)
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
            {tasks}
        </ul>
        <div>
            <Button
                style={{marginRight: "5px"}}
                size={"small"}
                color={"primary"}
                variant={props.todolistFilter === "all" ? "outlined" : "contained"}
                //className={props.todolistFilter === "all" ? "active-filter" : ""}
                onClick={setAllFilterValue}> All
            </Button>
            <Button
                style={{marginRight: "5px"}}
                size={"small"}
                color={"primary"}
                variant={props.todolistFilter === "active" ? "outlined" : "contained"}
                //className={props.todolistFilter === "active" ? "active-filter" : ""}
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
}