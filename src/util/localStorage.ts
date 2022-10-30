const LOCAL_STORAGE_PREFIX = 'RS_React_Q3';

class StorageWorker {
  private myStorageSearchPromptKey;

  constructor() {
    this.myStorageSearchPromptKey = `${LOCAL_STORAGE_PREFIX}_SearchPrompt`;
  }

  get searchPrompt() {
    const data = localStorage.getItem(this.myStorageSearchPromptKey);
    const res = data ? JSON.parse(data) : {};
    return res;
  }

  set searchPrompt(newValue) {
    localStorage.setItem(this.myStorageSearchPromptKey, JSON.stringify(newValue));
  }

  deleteDataFromStorage = () => {
    localStorage.clear();
  };
}

const StorageInstance = new StorageWorker();

export default StorageInstance;
