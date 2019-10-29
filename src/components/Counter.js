import React from "react";

function Counter({ count, handleCounterClick }) {
  return (
    <button type="button" onClick={handleCounterClick}>
      counter: {count}
    </button>
  );
}

export default Counter;
