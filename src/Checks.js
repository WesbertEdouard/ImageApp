import React from "react";
import "./App.css";
import { checkData } from "./data1";

export const Check = () => {
  return (
    <>
      <HomePageHeader />
      <div className="stock-container">
        {checkData.map((data, key) => {
          return (
            <div key={key}>
            <Image key={key} 
                Name={data.statusCode} 
                Date={data.Date} 
                WordAmount={data.WordAmount} 
                NumberAmount={data.NumberAmount}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

const HomePageHeader = () => {
    return (
      <header className="header">
        <h2>Check Data</h2>
      </header>
    );
  };

const Image = ({statusCode, Date, WordAmount, NumberAmount }) => {
if (!Date) return <div />;
return (
    <table>
    <tbody>
        <tr>
        <td>
            <h5>{statusCode}</h5>
        </td>
        <td>
            <h5>{Date}</h5>
        </td>
        <td>
            <h4>{WordAmount}</h4>
        </td>
        <td>
            <p>{NumberAmount}</p>
        </td>
        </tr>
    </tbody>
    </table>
);
};