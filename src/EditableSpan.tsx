import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changetitle: (title: string) => void
}

function EditableSpan(props: EditableSpanPropsType) {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)

    }
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.changetitle(title)
    }
    return (
        editMode
            ? <TextField
                color={"primary"}
                variant={"standard"}
                value={title}
                autoFocus
                onBlur={offEditMode}
                onChange={changeTitle}
            /> : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
    //     <input
    //     value={title}
    //     autoFocus
    //     onBlur={offEditMode}
    //     onChange={changeTitle}
    // /> : <span onDoubleClick={onEditMode}>{props.title}</span>


}

export default EditableSpan