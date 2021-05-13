import React, {useCallback, useReducer, useState} from 'react';
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

    const addTask = useCallback((title: string, todolistID: string) => {
        let action = addTaskAC(title, todolistID)
        dispatch(action)
    }, [dispatch])

    const changeTaskStatus = useCallback((taskID: string, newIsDoneValue: boolean, todolistID: string) => {
        let action = changeTaskStatusAC(taskID, newIsDoneValue, todolistID)
        dispatch(action)
    }, [dispatch])

    const changeTaskTitle = useCallback((taskID: string, title: string, todolistID: string) => {
        dispatch(changeNameTaskAC(taskID, title, todolistID))
    }, [dispatch])

    const removeTask = useCallback((taskID: string, todolistID: string) => {
        let action = removeTaskAC(taskID, todolistID)
        dispatch(action)
    }, [dispatch])

    const changeTodolistTitle = useCallback((title: string, todolistID: string) => {
        dispatch(changeTodolistTitleAC(todolistID, title))
    }, [dispatch])

    const removeTodolist = useCallback((todolistID: string) => {
        let action = RemoveTodolistAC(todolistID)
        dispatch(action)
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        let action = AddTodolistAC(title)
        dispatch(action)

    }, [dispatch])

    const changeTodoListFilter = useCallback((newFilterValue: FilterValuestype, todolistID: string)=> {

        dispatch(changeTodolistFilterAC(todolistID, newFilterValue))
    }, [dispatch])


//UI:

    const todoListComponents = todolists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={6} style={{padding: "20px"}}>
                    <Todolist
                        removeTodolist={removeTodolist}
                        id={tl.id}
                        titleN={tl.title}
                        todolistFilter={tl.filter}
                        tasks={tasks[tl.id]}
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
