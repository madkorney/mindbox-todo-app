export type ToDoListItem = {
  id: number;
  text: string;
  completed: boolean;
};

export const Mock_List: ToDoListItem[] = [
  { id: 0, text: 'Test task 1', completed: false },
  { id: 1, text: 'Test task 2', completed: true },
  { id: 2, text: 'Test task 3', completed: false },
];

export enum Actions {
  update,
  add,
  delete,
}

export const TODO_ITEM_HEIGHT_PX = 38; // max number of items in todo list for scroll management

export enum Filters {
  all,
  completed,
  active,
}

export type UpdateHandler = (argz: {
  item?: ToDoListItem;
  newItemText?: string;
  action: Actions;
}) => void;
