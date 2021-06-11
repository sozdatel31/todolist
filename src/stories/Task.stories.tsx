import React from 'react';
import {Story, Meta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import Task, {TaskPropsType} from "../Task";

export default {
    title: 'Example/Task',
    component: Task,

} as Meta;

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

const baseArgs = {
    changeTaskStatus: action("change status"),
    changeTaskTitle: action("change Title"),
    removeTask: action("remove")
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {id: '1', isDone: true, title: "JS"},
}
;
export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {id: '1', isDone: false, title: "JS"},

}
;