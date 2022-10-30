const LOCAL_STORAGE_PREFIX = 'SK_ToDo_App';

class StorageWorker {
  private myStorageToDoListKey;

  constructor() {
    this.myStorageToDoListKey = `${LOCAL_STORAGE_PREFIX}_ToDoList`;
  }

  get toDoList() {
    const data = localStorage.getItem(this.myStorageToDoListKey);
    const res = data ? JSON.parse(data) : {};
    return res;
  }

  set toDoList(newValue) {
    localStorage.setItem(this.myStorageToDoListKey, JSON.stringify(newValue));
  }

  deleteDataFromStorage = () => {
    localStorage.clear();
  };
}

const StorageInstance = new StorageWorker();

export default StorageInstance;
