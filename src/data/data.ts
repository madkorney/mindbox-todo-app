export type ToDoListItem = {
  id: number;
  text: string;
  completed: boolean;
};

export const Mock_List: ToDoListItem[] = [
  { id: 0, text: 'do the app', completed: false },
  { id: 1, text: 'style app', completed: false },
  { id: 2, text: 'submit application', completed: false },
  { id: 3, text: 'tsask 4', completed: true },
  { id: 4, text: 'tsask 5', completed: false },
  { id: 5, text: 'tsask 6', completed: false },
];

export enum Actions {
  update,
  add,
  delete,
}

export const ItemsNumberToDisplay = 7; // max number of items in todo list for scroll management

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
