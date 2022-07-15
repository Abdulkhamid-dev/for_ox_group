import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Table, Select } from "antd";
import { BiSearchAlt2, BiLogIn } from "react-icons/bi";
import { StyledMain } from "./Main.style";
import { clearAccount } from "../../app/auth/authSlice";
import Swal from 'sweetalert2'


const { Option } = Select;
function Main() {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState(allData);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.account);
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [status, setStatus] = useState("all");

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
      setAllData(res.data.items);
      setData(res.data.items);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleStatus = (str)=> {
    setStatus(str)
  }
  const sortData = () => {
    if (status === "all") {
      setData(allData);
    } else {
      let filteredData = allData.filter(item => item[status] === true)
      setData(filteredData)
    }
  }

  const LogOut = () => {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Log out'
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
      let searchedData = allData.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(searchedData);
    } else {
      setFilteredResults(allData);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    sortData();
  }, [status]);
  return (
    <StyledMain>
      <header>
        <h3 onClick={LogOut}>Products</h3>
        <Select
          style={{
            width: 120,
          }}
          onChange={(value) => handleStatus(value)}
          defaultValue='All'
        >
          <Option value="all">All</Option>
          <Option value="cookable">Cookables</Option>
          <Option value="scalable">Scalables</Option>
          <Option value="sellable" >Sellable</Option>
          <Option value="shippable">Shippable</Option>
        </Select>
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
