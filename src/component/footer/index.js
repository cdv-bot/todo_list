import React from 'react';
import './style.scss';
function Footer({ done, unfinished, deletes, all }) {
  const handeDone = () => {
    done();
  }
  const handeUnfinished = () => {
    unfinished();
  }
  const handeDelete = () => {
    deletes();
  }
  const handeAll = () => {
    all();
  }
  return (
    <div className="bt">
      <button onClick={handeDone}>Đã hoàn thành</button>
      <button onClick={handeUnfinished}>Chưa hoàn thành</button>
      <button onClick={handeDelete}>Xóa đã hoàn thành</button>
      <button onClick={handeAll}>Show All</button>
    </div>
  );
}

export default Footer;