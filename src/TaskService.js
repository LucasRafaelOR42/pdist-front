import axios from "axios";

const apiURL = "http://localhost:8080/task/";

export const findAllTasks = async () => {
  const response = await axios.get(apiURL);
  return response.data;
};

export const createTask = async (task) => {
  const url = apiURL + "create/";
  await axios.post(url, task);
};

export const updateTask = async (id, newTask) => {
  const url = apiURL + `update/${id}/`;
  axios.put(url, newTask);
};

export const deleteTask = async (id) => {
  const url = `${apiURL}delete/${id}/`;
  axios.delete(url);
};
