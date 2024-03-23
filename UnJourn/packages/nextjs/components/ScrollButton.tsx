import { FaChevronDown } from "react-icons/fa6";

const ScrollButton = () => {
  let scrollDistance = 900;

  const handleScrollDown = () => {

    window.scrollTo({
      top: scrollDistance,
      behavior: "smooth"
    });
    console.log("scrolling down");
    console.log("scrollDistance", scrollDistance);
  }

    return (
      <button onClick={handleScrollDown}>
        <FaChevronDown size={30} />
      </button>
    )
  }

export default ScrollButton;