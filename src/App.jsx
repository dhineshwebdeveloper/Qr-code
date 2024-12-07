import { useState } from "react";
import "./app.css"
const Qrcode = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrdata, setQrdata] = useState("http://www.dhinz.in/");
  const [qrsize, seQrsize] = useState("150");

  async function generateQR() {
    setLoading(true);
    try {
      const url =
        `https://api.qrserver.com/v1/create-qr-code/?size=${qrsize}*${qrsize}&data=${encodeURIComponent(qrdata)}`;
      setImg(url);
    } catch (error) {
      console.error("Erorr generater QR code", error);
    } finally {
      setLoading(false);
    }
  }
  function downloaQr(){
    fetch(img).then((Response)=>Response.blob()).then((blob)=>{
        const link =  document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download= "qrcode.png"
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }).catch((error) =>{
        console.error("Erorr generater QR code", error);
    })
  }
  return (
    <>
      <div className="app-container">
        <h1>QR CODE GENRATE</h1>
        {loading && <p>please wait....</p>}
        {img && <img src={img} className="img" alt="" />}
        <div className="">
          <label htmlFor="datainput" className="input-label">
            Data for Qr code
          </label>
          <input
            type="text"
            className=""
            id="datainput"
            placeholder="data for Qr code"
            value={qrdata}
            onChange={(e)=>setQrdata(e.target.value)}
          />

          <label htmlFor="sizeinput" className="input-label">
            image size (e.g., 150)
          </label>
          <input
            type="text"
            className=""
            id="sizeinput"
            placeholder="enter size"
            value={qrsize}
            onChange={(e)=>seQrsize(e.target.value)}
          />
          <button className="genrate-button" disabled={loading} onClick={generateQR}>
            genrate Qr code
          </button>
          <button className="download-button " onClick={downloaQr}>download Qr code</button>
        </div>
        <a href="http://www.dhinz.in/">
          <p> design by dhinesh</p>
        </a>
      </div>
       <button>click</button>

    </>
  );
};

export default Qrcode;
