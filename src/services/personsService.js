import axios from "axios";
const baseUrl = "/api/persons";

//authorization
let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

//getting all persons data
const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

//post with authorization
const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);

  return response.data;
};

//update a number of a person with authorization
const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const result = await axios.put(`${baseUrl}/${id}`, newObject, config);

  return result.data;
};

//deleting a person with authorization
const deletePerson = async (url) => {
  const config = {
    headers: { Authorization: token },
  };
  if (config.headers.Authorization) {
    const result = await axios.delete(url, config);
    return result.data;
  }
};

export default {
  getAll,
  create,
  update,
  deletePerson,
  baseUrl,
  setToken,
};
