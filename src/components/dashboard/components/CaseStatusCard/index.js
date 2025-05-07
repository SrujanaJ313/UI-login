import { Typography } from "@mui/material";
import React, { useState } from "react";

const CaseStatusCard = () => {
  const data = [
    {
      status: "New",
      className:
        "border-sky-300 border bg-sky-300 hover:-translate-y-1 hover:bg-sky-300 duration-300",
      numberOfCases: 20,
    },
    {
      status: "High Priority",
      className:
        "border-rose-400 border bg-rose-400 hover:-translate-y-1 hover:bg-rose-400 duration-300",
      numberOfCases: 30,
    },
    {
      status: "Overdue",
      className:
        "border-orange-400 border bg-orange-400 hover:-translate-y-1 hover:bg-orange-400 duration-300",
      numberOfCases: 10,
    },
    {
      status: "Bankruptcy",
      className:
        "border-emerald-300 border bg-emerald-300 hover:-translate-y-1 hover:bg-emerald-300 duration-300",
      numberOfCases: 50,
    },
  ];

  const [cardData, setCardData] = useState(data);

  const handleCardClick = (index) => {
    const mappedData = cardData.map(
      (card, cardIndex) => {
        return { ...card, isSelected: cardIndex === index };
      }
    );
    setCardData(mappedData);
  };

  return (
    <div className="flex w-full h-full items-center justify-between gap-6 ">
      {cardData.map((caseModel, index) => (
        <div
          className={`flex w-full flex-1 h-full cursor-pointer rounded p-5 items-center justify-between ${caseModel.className}`}
          key={index}
        >
          <div
            key={caseModel.status}
            className={`flex flex-col items-start justify-center `}
            onClick={() => handleCardClick(index)}
          >
            <Typography variant="h3" className="text-gray-700">
              {caseModel.numberOfCases}
            </Typography>
            <Typography variant="h6" className="text-gray-700">
              {caseModel.status}
            </Typography>
          </div>
          <div>
            {caseModel.status === "New" && (
              <svg
                width={60}
                height={60}
                fill="currentColor"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M965.76 576l-74.56-78.08a107.2 107.2 0 0 1-19.84-105.6l40.96-99.84a40.96 40.96 0 0 0-39.68-60.8l-107.84-0.64a107.2 107.2 0 0 1-88.64-60.48l-41.6-99.52a40.96 40.96 0 0 0-71.04-14.72l-78.08 74.24a107.2 107.2 0 0 1-105.6 19.84L280 109.76a40.96 40.96 0 0 0-60.8 39.68L216.96 256a107.2 107.2 0 0 1-60.48 88.64l-99.52 41.6a40.96 40.96 0 0 0-14.72 71.04l74.56 78.08a107.52 107.52 0 0 1 19.84 105.6L96 741.76a40.96 40.96 0 0 0 39.68 60.8l107.84 2.56A107.2 107.2 0 0 1 331.84 864l41.6 99.52a40.96 40.96 0 0 0 71.04 14.72l78.08-74.56a107.2 107.2 0 0 1 105.6-19.84l99.84 40.96a40.96 40.96 0 0 0 60.8-39.68l2.56-107.84a107.2 107.2 0 0 1 60.48-88.64l99.52-41.6a40.96 40.96 0 0 0 14.4-71.04z m-309.44 128c-18.56 3.2-43.2 0-79.36-34.56-25.28-24.96-102.72-118.08-154.88-181.12l37.76 187.52a73.92 73.92 0 0 1-1.92 39.68 51.84 51.84 0 0 1-65.6 29.12A64 64 0 0 1 352 686.72l-50.56-288A59.52 59.52 0 0 1 311.68 352a64 64 0 0 1 43.52-21.76A55.36 55.36 0 0 1 416 352c26.24 29.76 52.16 59.84 77.76 89.92 32 36.8 61.12 73.92 91.52 110.72l-39.04-195.52a64 64 0 0 1 3.2-37.12 48.64 48.64 0 0 1 39.04-32 52.8 52.8 0 0 1 40.96 9.28 71.36 71.36 0 0 1 24.64 47.04L704 630.72A55.68 55.68 0 0 1 656.32 704z"
                  fill="#5C5C66"
                />
              </svg>
            )}
            {caseModel.status === "High Priority" && (
              <svg
                width={50}
                height={50}
                fill="currentColor"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M512 51.008l-23.008 22.976-415.008 415.04-22.976 22.976 22.976 23.008 415.04 414.976 22.976 23.04 23.008-23.04L949.984 535.04l23.04-23.008-23.04-23.008L535.04 73.984 512 51.04z m0 89.984L882.016 512 512 882.016 141.984 512 512 140.992zM480 320v256h64v-256h-64z m0 320v64h64v-64h-64z"
                  fill="#5C5C66"
                />
              </svg>
            )}
            {caseModel.status === "Overdue" && (
              <svg
                width={50}
                height={50}
                fill="currentColor"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M512 959C265.129 959 65 758.871 65 512S265.129 65 512 65s447 200.129 447 447-200.129 447-447 447z m0-834c-213.734 0-387 173.266-387 387s173.266 387 387 387 387-173.266 387-387-173.266-387-387-387z m289 417H512a34 34 0 0 1-34-34V219a34 34 0 0 1 68 0v255h255a34 34 0 0 1 0 68z"
                  fill="#5C5C66"
                />
              </svg>
            )}
            {caseModel.status === "Bankruptcy" && (
              <svg
                width={50}
                height={50}
                fill="currentColor"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M901.333333 682.666667h-138.666666a37.373333 37.373333 0 0 0-37.333334 37.333333v224a37.373333 37.373333 0 0 0 37.333334 37.333333h138.666666a37.373333 37.373333 0 0 0 37.333334-37.333333v-224a37.373333 37.373333 0 0 0-37.333334-37.333333z m-5.333333 256h-128v-213.333334h128zM304 384H165.333333a37.373333 37.373333 0 0 0-37.333333 37.333333v522.666667a37.373333 37.373333 0 0 0 37.333333 37.333333h138.666667a37.373333 37.373333 0 0 0 37.333333-37.333333V421.333333a37.373333 37.373333 0 0 0-37.333333-37.333333z m-5.333333 554.666667H170.666667V426.666667h128z m304-384H464a37.373333 37.373333 0 0 0-37.333333 37.333333v352a37.373333 37.373333 0 0 0 37.333333 37.333333h138.666667a37.373333 37.373333 0 0 0 37.333333-37.333333V592a37.373333 37.373333 0 0 0-37.333333-37.333333z m-5.333334 384H469.333333V597.333333h128z m341.333334-490.666667v128a21.213333 21.213333 0 0 1-6.16 14.993333A21.213333 21.213333 0 0 1 917.333333 597.333333h-128a21.333333 21.333333 0 0 1 0-42.666666h76.5L576 264.833333 463.086667 377.753333a21.333333 21.333333 0 0 1-30.173334 0l-298.666666-298.666666a21.333333 21.333333 0 0 1 30.173333-30.173334L448 332.5l112.913333-112.92a21.333333 21.333333 0 0 1 30.173334 0L896 524.5V448a21.333333 21.333333 0 0 1 42.666667 0z"
                  fill="#5C5C66"
                />
              </svg>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CaseStatusCard;
