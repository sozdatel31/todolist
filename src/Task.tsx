import React, {ChangeEvent, useState} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist/Todolist";

type TaskPropsType = {
   task: TaskType
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean )=> void
    changeTaskTitle: (taskId: string, newValue: string) => void
    removeTask: (taskId: string) => void
}

const Task = React.memo(({task, changeTaskStatus, changeTaskTitle,removeTask}: TaskPropsType) => {
    console.log("Task called")
    const onClickHandler = () => removeTask(task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(task.id, newIsDoneValue)
    }
    const onTitleChangeHandler = (newValue: string) => {
        changeTaskTitle(task.id, newValue)
    }
    return <li key={task.id}>
        <Checkbox
            color={"primary"}
            checked={task.isDone}
            onChange={onChangeHandler}
        />

        <EditableSpan title={task.title} changetitle={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </li>
})

export default Task