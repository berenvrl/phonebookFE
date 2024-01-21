import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

//getting all persons data
const getAll = () => {
  const result = axios.get(baseUrl);
  return result.then((response) => response.data);
};

//adding a new person to persons data
const create = (newaddedName) => {
  const result = axios.post(baseUrl, newaddedName);
  return result.then((response) => response.data);
};

//update a number of a person
//***currently doesnt work because its not handled in backend */
const update = (id, newObject) => {
  const result = axios.put(`${baseUrl}/${id}`, newObject);
  return result.then((response) => response.data);
};

//deleting a person from persons data
const deletePerson = (url) => {
  const result = axios.delete(url);
  return result.then((response) => response.data);
};

export default {
  getAll,
  create,
  update,
  deletePerson,
  baseUrl,
};
