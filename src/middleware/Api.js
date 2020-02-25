import axios from "axios";

export default axios.create({
  baseURL: `https://www.intouchpay.co.rw/api/requestpayment/`
});
