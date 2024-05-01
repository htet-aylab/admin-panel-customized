export const setLocalStorage = async (key : string, value : string) => {
  return await Promise.resolve().then(() => {
    localStorage.setItem(key, value);
  });
};

export const getLocalStorage = async (key : string) => {
  return await Promise.resolve().then(() => {
    localStorage.getItem(key);
  });
};

export const deleteLocalStorage = async (key : string) => {
  return await Promise.resolve().then(() => {
    localStorage.removeItem(key);
  });
};

export const validateToken = () => {
  return localStorage.getItem("token");
};
