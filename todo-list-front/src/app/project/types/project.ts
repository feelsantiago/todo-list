import { Todo } from '../../todo/types/todo';

export interface Project {
    _id: string;
    name: string;
    todos: Todo[];

    isDeleted: boolean;
}

export interface ProjectCreateRequest {
    name: string;
}

export type ProjectEditRequest = ProjectCreateRequest;
