import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "antd";
import { BiSearchAlt2, BiLogIn } from "react-icons/bi";
import { StyledMain } from "./Main.style";
import { clearAccount } from "../../../app/auth/authSlice";
import Swal from 'sweetalert2'

function Main() {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.account);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  let header = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const getData = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://toko.ox-sys.com/variations", {
        headers: header,
      });
      console.log(res);
      setData(res.data.items);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const LogOut = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearAccount())
      }
    })
  };
  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      render: (text, record) => <h4>{record?.productName}</h4>,
    },
    {
      title: "Bar code",
      dataIndex: "barcode",
      render: (text, record) => <h4>{record?.barcode}</h4>,
    },
  ];

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      let searchedData = data.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(searchedData);
    } else {
      setFilteredResults(data);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <StyledMain>
      <header>
        <h3 onClick={LogOut}>Products</h3>
        <div className="search_block" onClick={() => inputRef.current.focus()}>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => searchItems(e.target.value)}
            ref={inputRef}
          />
          <BiSearchAlt2 size={24} onClick={() => inputRef.current.focus()} />
        </div>
        <div className="log_out" onClick={LogOut}>
          <BiLogIn color='red' size={25} />
        </div>
      </header>
      {searchInput.length > 1 ? (
        <Table
          dataSource={filteredResults}
          columns={columns}
          loading={loading}
        />
      ) : (
        <Table dataSource={data} columns={columns} loading={loading} />
      )}
    </StyledMain>
  );
}

export default Main;
