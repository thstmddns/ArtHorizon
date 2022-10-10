import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { authApi, piecesApi } from "../../api/api";

import NavBar from "../../components/NavBar";

const TailwindPieces = () => {
  const { pieceSeq } = useParams();
  const [piece, setPiece] = useState();

  useEffect(() => {
    const fetchPieceDetail = async () => {
      try {
        const { data } = await piecesApi.getPieceDetail(pieceSeq);
        setPiece(data);
        console.log("data:", data);
      } catch (error) {
        console.error("what");
      }
    };
    fetchPieceDetail();
  }, [pieceSeq]);

  const handleBookmark = () => {
    authApi
      .setBookmark(pieceSeq)
      .then((res) => console.log("북마크완료"))
      .catch((err) => console.error("에러뭐임:", err));
  };

  return (
    <React.Fragment>
      <NavBar />
      <section className="text-gray-600 body-font">
        {piece && (
          <div
            className="mx-auto flex justify-center items-center"
            style={{
              backgroundImage: "url(https://picsum.photos/1920/1080/?blur=10​)",
            }}
          >
            <img
              alt="gallery"
              className="object-contain rounded"
              src="https://picsum.photos/1080/1920"
              style={{ maxWidth: "73vw", maxHeight: "90vh" }}
            />
            <div
              className="flex flex-col"
              style={{ width: "23vw", maxHeight: "90vh" }}
            >
              hello
              <button
                type="button"
                className="py-2.5 px-5 mr-2 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                onClick={handleBookmark}
              >
                북마크
              </button>
              <button
                type="button"
                className="py-2.5 px-5 mr-2 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                작품 결제
              </button>
              <button
                type="button"
                className="py-2.5 px-5 mr-2 my-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                ???
              </button>
            </div>
          </div>
        )}
      </section>
    </React.Fragment>
  );
};

export default TailwindPieces;
