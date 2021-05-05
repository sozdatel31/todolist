import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist/Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons"
import {
    AddTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    RemoveTodolistAC,
    todoListsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeNameTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuestype = "all" | "active" | "completed"
export type TodolistType = {
    title: string,
    filter: FilterValuestype,
    id: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}


function AppWithRedux() {
    //BLL:

    const todolistID_1 = v1()
    const todolistID_2 = v1()

    let todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    let dispatch = useDispatch()

    function addTask(title: string, todolistID: string) {
        let action = addTaskAC(title, todolistID)
        dispatch(action)
    }
    function changeTaskStatus(taskID: string, newIsDoneValue: boolean, todolistID: string) {
        let action = changeTaskStatusAC(taskID, newIsDoneValue, todolistID)
        dispatch(action)
    }
    function changeTaskTitle(taskID: string, title: string, todolistID: string) {
       dispatch(changeNameTaskAC(taskID, title, todolistID))
    }
    function removeTask(taskID: string, todolistID: string) {
        let action = removeTaskAC(taskID, todolistID)
        dispatch(action)
    }

    function changeTodolistTitle(title: string, todolistID: string) {
       dispatch(changeTodolistTitleAC(todolistID, title))
    }

    function removeTodolist(todolistID: string) {
        let action = RemoveTodolistAC(todolistID)
        dispatch(action)
    }

    function addTodolist(title: string) {
        let action = AddTodolistAC(title)
        dispatch(action)

    }
    function changeTodoListFilter(newFilterValue: FilterValuestype, todolistID: string) {

        dispatch(changeTodolistFilterAC(todolistID, newFilterValue))
    }



//UI:
    function getTaskForTodolist(todoList: TodolistType): Array<TaskType> {
        switch (todoList.filter) {
            case "active":
                return tasks[todoList.id].filter(t => t.isDone === false)
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone === true)
            default:
                return tasks[todoList.id]
        }
    }
    const todoListComponents = todolists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={6} style={{padding: "20px"}}>
                    <Todolist
                        removeTodolist={removeTodolist}
                        id={tl.id}
                        titleN={tl.title}
                        todolistFilter={tl.filter}
                        tasks={getTaskForTodolist(tl)}
                        changeTodoListFilter={changeTodoListFilter}
                        changeTaskStatus={changeTaskStatus}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button variant={"outlined"} color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container={true} style={{padding: "20px 0px "}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container={true} spacing={5}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
