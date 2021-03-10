export interface Todo {
    _id: string;
    description: string;
    completed: boolean;
    finishDate: Date;
}

export interface TodoCreateRequest {
    description: string;
}

export type TodoUpdateRequest = TodoCreateRequest;
