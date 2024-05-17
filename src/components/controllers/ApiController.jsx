import axios from "axios";

const url = "https://api-notes-amber.vercel.app";

class ApiController {
  async GetNotes(user) {
    try {
      return await axios.get(`${url}/notes/${user}`);
    } catch (error) {
      return error.message;
    }
  }

  async PostNotes(id, title, note) {
    try {
      return await axios.post(`${url}/notes`, {
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
      await axios.delete(`${url}/notes/${id}`);
    } catch (error) {
      return error;
    }
  }

  PatchNotes(title, note, id) {
    try {
      return axios.patch(`${url}/notes/${id}`, {
        title: title,
        note: note,
      });
    } catch (error) {
      return error;
    }
  }

  ValidLogin(email, password) {
    try {
      return axios.post(`${url}/signin`, {
        email: email,
        password: password,
      });
    } catch (error) {
      return error.message;
    }
  }

  async PostUser(data) {
    try {
      return await axios.post(
        "https://api-notes-amber.vercel.app/signup",
        data
      );
    } catch (error) {
      return error;
    }
  }
}

export default new ApiController();
