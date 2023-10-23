import { useState } from "react";
import "./Display.css";
const Display = ({ contract, account }) => {
  const [data, setData] = useState("");

  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        // console.log(dataArray);
      } else {
        dataArray = await contract.display(account);
        console.log(dataArray);
      }
    } catch (e) {
      // alert("You don't have access");
    }
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      // console.log(str);
      console.log(str_array);
      const images = str_array.map((item, i) => {
        console.log(item.substring(34));
        clearInterval(intervalId);
        return (
          <table className="dis-table">
            <tbody>
              <tr>
                <td width="600">
                  <a href={item} key={i} target="_blank">
                    <p
                      key={i}
                      src={`https://gateway.pinata.cloud/ipfs/${item.substring(39).split(" | ")[0]}`}
                      alt="new"
                      className="image-list"
                    >{item.substring(34).split(" | ")[0]}</p>
                  </a>
                </td>
                <td>
                  <p>{item.substring(34).split(" | ")[1]}</p>
                </td>
              </tr>
            </tbody>
          </table >
        );
      });
      setData(images);
    } else {
      // alert("No image to display");
    }
  };

  // useEffect(() => {
  //   const intervalId = setInterval(getdata, 5000);
  //   return () => clearInterval(intervalId);
  // }, [data])

  // getdata();

  const intervalId = setInterval(getdata, 5000);

  return (
    <>
      <div className="image-list">{data}</div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button" onClick={getdata}>
        Get Data
      </button>
    </>
  );
};
export default Display;
