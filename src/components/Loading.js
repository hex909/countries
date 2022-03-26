import React, { memo } from "react";
import { useGlobal } from "../contest";

function Loading({ message }) {
  const { message: contest } = useGlobal();
  return (
    <div className='loading-container'>
      <h1 style={{ textTransform: "capitalize", textAlign: "center" }}>
        {message || contest}
      </h1>
    </div>
  );
}

export default memo(Loading);
