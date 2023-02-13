function saveToLocalStorage(key, value) {
  try {
    const serializedState = JSON.stringify(value);
    window.localStorage.setItem(key, serializedState);
  } catch (error) {
    console.log(error.message);
  }
}

function getFromLocalStorage(key) {
  try {
    const serializedState = window.localStorage.getItem(key);
    return serializedState === null ? [] : JSON.parse(serializedState);
  } catch (error) {
    console.log(error.message);
  }
}
export { saveToLocalStorage, getFromLocalStorage };
