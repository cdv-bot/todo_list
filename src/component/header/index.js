import React, { useState } from 'react';
import './style.scss';
function Header({ handlerValue }) {
  const [text, setText] = useState("");
  const handeValue = (e) => {
    const value = e.target.value;
    setText(value);
  }

  const handlerSubmit = e => {
    e.preventDefault();
    if (text.trim() !== "") {
      handlerValue(text)
      setText("")
    } else {
      setText("")
    }
  }
  return (
    <>
      <form onSubmit={handlerSubmit} className="submit_form" >
        <input type="text" placeholder="Mời nhập..." className="ip_submit" name="ip" required value={text} onChange={handeValue} />
      </form>
    </>
  );
}

export default Header;