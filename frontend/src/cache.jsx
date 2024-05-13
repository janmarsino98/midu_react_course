export function saveInCache(key, value) {
  const valueInJSON = JSON.stringify(value);
  localStorage.setItem(key, valueInJSON);
}

export function getFromCache(key) {
  const valueInJSON = localStorage.getItem(key);
  return valueInJSON ? JSON.parse(valueInJSON) : null;
}

export function removeFromCache(key) {
  localStorage.removeItem(key);
}
