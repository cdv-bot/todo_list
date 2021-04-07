import React, { useRef, useState } from 'react';
import Footer from '../footer';
import Header from '../header';
import './style.scss';

function Todo(props) {
  let c = JSON.parse(localStorage.getItem("list"));
  const [num, setNum] = useState(c || []);
  const focusRef = useRef();
  const [toggle, setToggle] = useState({
    check: true,
    id: null
  });

  const handlerValues = x => {
    if (c === null) {
      let arr = [];
      let id = 1;
      let obj = {
        id: id,
        value: x,
        check: false
      }
      arr.push(obj);

      let a = JSON.stringify(arr);
      localStorage.setItem('list', a);
      setNum(arr)
    } else {
      let numId = c.length;
      let id = c[numId - 1].id + 1;
      let arr = [...c];
      let obj = {
        id: id,
        value: x,
        check: false
      }
      arr.push(obj);

      let a = JSON.stringify(arr);
      localStorage.setItem('list', a);
      setNum(arr)

    }
  }

  const handlerCheck = id => {
    let index = num.findIndex(x => {
      return x.id === id;
    })
    const arr = [...num];

    arr[index] = {
      ...arr[index],
      check: !arr[index].check
    }
    setNum(arr);


    let indexs = c.findIndex(x => {
      return x.id === id;
    })
    const arrs = [...c];

    arrs[indexs] = {
      ...arrs[indexs],
      check: !arrs[indexs].check
    }
    let a = JSON.stringify(arrs);
    localStorage.setItem('list', a);
  }

  // _---------------------
  const [valueFix, setValueFix] = useState("");
  const handTogger = async (id, value) => {
    await setToggle({
      check: false,
      id
    });
    setValueFix(value);
    nam();

  }

  function nam() {
    focusRef.current.focus();
  }

  // -------------
  const onValueFix = e => {
    let value = e.target.value;
    setValueFix(value);
  }

  const submitFix = e => {
    e.preventDefault();
    if (valueFix.trim() !== "") {
      let index = num.findIndex(x => {
        return x.id === toggle.id;
      });

      const arr = [...num];
      arr[index] = {
        ...arr[index],
        value: valueFix,
        check: false
      }
      setNum(arr);
      let a = JSON.stringify(arr);
      localStorage.setItem('list', a);
    }
    setToggle({
      check: false,
      id: null
    });

    // ẩn input
  }

  const an = x => {
    if (valueFix.trim() !== "") {
      let index = num.findIndex(x => {
        return x.id === toggle.id;
      });

      const arr = [...num];
      arr[index] = {
        ...arr[index],
        value: valueFix,
        check: false
      }
      setNum(arr);
      let a = JSON.stringify(arr);
      localStorage.setItem('list', a);
    }
    setToggle({
      check: false,
      id: null
    });
  }

  // -----------footer

  const handeDone = () => {
    let arr = c.filter(x => {
      return x.check === true;
    });

    setNum(arr);
  }

  const handeUfinished = () => {
    let arr = c.filter(x => {
      return x.check === false;
    });

    setNum(arr);
  }

  const handeDelete = () => {
    let arr = c.filter(x => {
      return x.check === false;
    });

    setNum(arr);
    let a = JSON.stringify(arr);
    localStorage.setItem('list', a);
  }

  const handeAll = () => {
    setNum(c);
  }


  const show = () => {
    let sort = [...num];
    sort.sort(function (a, b) {
      return b.id - a.id;
    });
    let arr = [];
    arr = sort.map((key, index) => {
      return (
        <div key={index} className="show_check" >
          <div id={key.id} onChange={() => handlerCheck(key.id)} onClick={() => handlerCheck(key.id)} >
            {
              (key.check) ?
                <i className="fas fa-check-square icon icon_top" ></i>
                : <i className="fas fa-check-square icon " ></i>
            }
          </div>
          <div className="list_data">
            {
              (toggle.id !== key.id) ?
                <label onClick={() => handlerCheck(key.id)} onDoubleClick={() => handTogger(key.id, key.value)} className={`text_data ${key.check ? 'unfinished' : ''}`}>{key.value}</label>
                : <form onSubmit={submitFix}>
                  <input className="ip_hide" type="text" ref={focusRef} value={valueFix} onBlur={() => an(key.id)} onChange={onValueFix} />
                </form>
            }
          </div>
        </div >
      )
    })
    return arr;
  }
  return (
    <div className="container">
      <Header handlerValue={handlerValues} />
      <div className="content" >
        <div className="positon">
          {
            show()
          }
        </div>
      </div>
      <Footer done={handeDone} unfinished={handeUfinished} deletes={handeDelete} all={handeAll} />
    </div>
  );
}

export default Todo;