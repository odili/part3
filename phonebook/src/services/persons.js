import axios from 'axios';

const baseUrl = '/api/persons';

const getAll = () => {
  return axios.get(baseUrl).then(res => res.data);
};

const create = newContact => {
  return axios.post(baseUrl, newContact).then(res => res.data);
};

const update = (id, newContact) => {
  return axios.put(`${baseUrl}/${id}`, newContact).then(res => res.data);
};

const deleteContact = id => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, create, update, deleteContact };
