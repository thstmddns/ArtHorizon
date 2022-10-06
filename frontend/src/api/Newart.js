import axios from "axios";
import baseurl from "./BaseUrl";

const Newart = (page) => {
  const url = `${baseurl}/pieces/recent`;
  axios
    .get(url, {
      params: {
        page: page,
      },
    })
    .then((res) => {
      const content = res.content;
      const totalPage = res.totalPage;
      return [content, totalPage];
    })
    .catch((err) => {
      alert(err);
    });
};

export default Newart;