import axios from "axios";
import baseurl from "./BaseUrl";

const SendSerach = (item, type, page) => {
  const 

  url = `${baseurl}/search/${type}?page=${page}`;
  axios
    .get(url, {
      params: {
        pieceTitle: item,
      },
    })
    .then((res) => {
      const results = res.results;
      const totalPage = res.totalPage;
      return { results, totalPage }
    })
    .catch((err) => {
      err;
    });
};

export default SendSerach;
