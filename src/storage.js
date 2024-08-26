class StorageClass {
    _getStorage(isLocalStorage = true) {
      return isLocalStorage ? window.localStorage : window.sessionStorage
    }
  
    getItem(item, isLocalStorage) {
      return this._getStorage(isLocalStorage).getItem(item)
    }
  
    setItem(item, value, isLocalStorage) {
      this._getStorage(isLocalStorage).setItem(item, value)
    }
  
    removeItem(item, isLocalStorage) {
      this._getStorage(isLocalStorage).removeItem(item)
    }
  
    clear() {
      localStorage.clear()
      sessionStorage.clear()
    }
  }
  
  export const Storage = new StorageClass()
  