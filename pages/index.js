import styles from "../styles/Home.module.css";
import { useState } from "react";

export default function Home() {
  const fetcher = async () => {
    setErrMsg("")
    setImageHandler("");
    setImageLoaded(false)
    const data = await fetch("/api/imagecreate", {
      method: "POST",
      body: JSON.stringify({name:inputVal,size:imageSize,qty:imageQty}),
    });

  if (!data.ok){
    const message="this sentece is beyond of my capacity"
    setErrMsg(message)
    console.log(data)
  }

    const result = await data.json();


    setImageHandler(result.myurl);
    setImageLoaded(true)
  };

  const [inputVal, setInputVal] = useState("");
  const [imageHandler, setImageHandler] = useState([]);
  const [imageSize,setImageSize]=useState("256x256")
  const [imageQty,setImageQty]=useState("1")
  const [imageLoaded,setImageLoaded]=useState(true)
  const [errMsg,setErrMsg]=useState("")
  const ArrList = Array.from(Array(10).keys());
  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent:"center",
          alignItems:"center",
          gap: "2rem",
          maxWidth: "330px",
          margin:"3rem auto"
        }}
      >
        <input
          type="text"
          onChange={(e) => setInputVal(e.target.value)}
          value={inputVal}
          placeholder="describe an image"
        />
        <div style={{ display: "flex",gap:"1rem",flexDirection:"row" }}>
          ImageSize:
          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ cursor: "pointer",fontWeight:imageSize==="256x256"?"bold":"normal" }} onClick={()=>setImageSize("256x256")}>256x256</div>
            <div style={{ cursor: "pointer",fontWeight:imageSize==="512x512"?"bold":"normal"  }} onClick={()=>setImageSize("512x512")}>512x512</div>
            <div style={{ cursor: "pointer",fontWeight:imageSize==="1024x1024"?"bold":"normal"  }} onClick={()=>setImageSize("1024x1024")}>1024x1024</div>
          </div>
        </div>
        <div style={{ display: "flex",gap:"1rem" }}>
          Image Quantity:{" "}
          <select style={{width:"50px"}} onChange={(e)=>setImageQty(e.target.value)}>
            {ArrList.map((item, idx) => (
              <option key={idx} value={item + 1}>
                {item + 1}
              </option>
            ))}
          </select>
        </div>
        <button onClick={() => fetcher()}>Send</button>
      </div>
      <div
        style={{
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        {errMsg?
        <div>{errMsg}</div>:
        <div style={{visibility:imageLoaded?"hidden":"visible"}}>Please waiting images are loading...</div>
      }
          
        {imageHandler.length > 0 &&
          imageHandler.map((item, idx) => <img src={item.url} key={idx} style={{maxWidth:"100vw"}} />)}
      
      </div>
    </div>
  );
}
