import { usePromiseTracker } from "react-promise-tracker";
import { Circles } from "react-loader-spinner";

export default function Spinner () {
    const { promiseInProgress } = usePromiseTracker();
    
  return (
    <>
   {promiseInProgress && 
      <div style={{ display: "flex", position: "fixed", top: 0, bottom: 0, left: 0, right: 0, opacity: "70%", textAlign: "center", justifyContent: "center", alignItems: "center", backgroundColor: "black", zIndex: 10000 }}>
      <Circles
        height="80"
        width="80"
        color="gold"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
      </div>
    } 
    </>
  )
}