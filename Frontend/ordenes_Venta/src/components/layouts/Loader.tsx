import PacmanLoader from "react-spinners/PacmanLoader";

const Loader = () => {
  return (
      <div className="fixed top-0 left-0 w-full h-full z-[999] flex justify-center items-center bg-black/50">
          <div className="w-1/5 h-1/3 bg-white rounded-md flex flex-col justify-center items-center border border-gray-500 p-10">
              <PacmanLoader loading={true} size={50} color="#ff0000" />
          </div>
      </div>
  )
}

export default Loader