import axios from "axios";

class Api {
  
  async GetNotes(user) {

    try {
      return await axios.get(`https://api-notes-k22z.onrender.com/notes/${user}`);
    } catch (error) {
      return error.message;
    }
  }

  async PostNotes(id, title, note) {
    try {
      return await axios.post("https://api-notes-k22z.onrender.com/notes", {
        user: id,
        title: title,
        note: note,
      });
    } catch (error) {
      return error;
    }
  }

  async DeleteNotes(id) {
    try {
      await axios.delete(`https://api-notes-k22z.onrender.com/notes/${id}`);
    } catch (error) {
      return error;
    }
  }

  PatchNotes(title, note, id) {
    try {
      return axios.patch(`https://api-notes-k22z.onrender.com/notes/${id}`, {
        title: title,
        note: note,
      });
    } catch (error) {
      return error;
    }
  }

  ValidLogin(email, password) {

try {
  
  return axios.post('http://localhost:2904/signin', {
  email: email,
  password: password
  })
  
} catch (error) {

  return error.message
}
    
  }
}

export default new Api();
