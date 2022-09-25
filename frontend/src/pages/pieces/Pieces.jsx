import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import NavigationBar from "../../components/NavigationBar";
import Newart from "../../api/Newart";

const Pieces = () => {
  const [nowPage, setNewPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [totalPiece, setTotalPiece] = useState([]);

  useEffect(() => {
    const [pieces, totalpage] = Newart(nowPage);
    setNewPage((preState) => preState + 1);
    setTotalPiece((preState) => preState.push(pieces));
    setTotalPage(totalpage);
  }, []);

  return (
    <div>
      <NavigationBar />
      <div>Here is piece page</div>;
    </div>
  );
};

export default Pieces;
