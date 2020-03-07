import axios from "axios";

export default axios.create({
  baseURL: `https://www.intouchsms.co.rw/api/sendsms`
});
