export interface ITaskShort {
  id: string;
  title: string;
  description: string;
  taskTypeId: string;
  processId: string;
}

export interface IProcessShort {
  id: string;
  name: string;
}

export interface ITaskTypeShort {
  id: string;
  name: string;
  processes: IProcessShort[];
}

export interface IStory {
  id: string;
  name: string;
  tasks: ITaskShort[];
}
