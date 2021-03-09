import React from "react";
class Check extends React.Component {
  state = {};
  render() {
    return (
      <svg
        className="check"
        width="14"
        height="10"
        viewBox="0 0 14 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.77033 4.77592C1.36534 4.38678 0.708729 4.38678 0.303741 4.77592C-0.101247 5.16506 -0.101247 5.79599 0.303741 6.18513L3.97022 9.70814C4.37648 10.0985 5.03561 10.0971 5.44006 9.70501L13.6995 1.69793C14.1027 1.30706 14.0998 0.676143 13.693 0.288734C13.2862 -0.0986757 12.6296 -0.0958734 12.2264 0.294993L4.70025 7.5912L1.77033 4.77592Z"
          fill="white"
        />
      </svg>
    );
  }
}

export default Check;
