import axios from "axios";

const url = "https://api-notes-amber.vercel.app";

class ApiController {
  async GetNotes(user: string){
    try {
      return await axios.get(`${url}/notes/${user}`);
    } catch (error) {
      return error
    }
  }

  async PostNotes(id: string, title: string, note: string) {
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

  async DeleteNotes(id: string) {
    try {
      await axios.delete(`https://api-notes-amber.vercel.app/notes/${id}`);
    } catch (error) {
      return error;
    }
  }

  PatchNotes(title: string, note: string, id: string) {
    try {
      return axios.patch(`${url}/notes/${id}`, {
        title: title,
        note: note,
      });
    } catch (error) {
      return error;
    }
  }

  ValidLogin(email: string, password: string) {
    try {
      return axios.post(`${url}/signin`, {
        email: email,
        password: password,
      });
    } catch (error) {
      return error
    }
  }

  async PostUser(data :any) {
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
