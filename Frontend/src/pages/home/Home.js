import React, { useState, useEffect, useRef } from "react";
import "./home.css";
import TableContainer from "../../components/table-container/TableContainer";
import Pv from "../../components/pv-module/Pv";
import Card from "../../components/card/Card";
import UseAuthContext from "../../hooks/UseAuthContext";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import FadeLoader from "react-spinners/FadeLoader";
const Home = () => {
  const { user, loading } = UseAuthContext();
  const location = useLocation();
  const subcategoryId = location.state._id;

  const [isLoading, setIsLoading] = useState(false);
  const [operationTemp, setOperationTemp] = useState(0);
  const [cableSize, setCableSize] = useState();
  const [cableLength, setCableLength] = useState();
  const [vmp, setVmp] = useState();
  const [Impp, setImpp] = useState();
  const [Pmax, setPmax] = useState();
  const [tableData, setTableData] = useState([
    {
      name: location.state.name || "",
      description: location.state.description || "",
      classSelected: "",
      childSelected: "",
      areaSelected: null,
      conductorCableLength: null,
      seriesModule: null,
      r20: null,
      kt: null,
      rTempreture: null,
      classSelectedModule: "",
      childSelectedModule: "",
      areaSelectedModule: null,
      r20Module: null,
      rTempretureModule: null,
      uTempreture: null,
      uMax: null,
      uMaxLength: null,
      ploss: null,
      plossTemp: null,
      Impp: null,
      vmp: null,
      pmax: null,
      cableLength: null,
      operationTemp: null,
      nominalPower: null,
    },
  ]);

  const getSubCategoriesApi = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://montaser-backend-3fpi.vercel.app/api/subCategories/subcategory/${subcategoryId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const responseData = response.data.data.subcategory.data;
      console.log(responseData, "sub-category");
      setTableData(responseData);
      setIsLoading(false);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    getSubCategoriesApi();
  }, [subcategoryId]);

  const handleUpateSubCategory = async () => {
    setIsLoading(true);
    try {
      const response = await axios.patch(
        `https://montaser-backend-3fpi.vercel.app/api/subCategories/subcategory/${subcategoryId}`,
        { data: tableData },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response, "res");
      getSubCategoriesApi();
      toast.success("Sub edit successfully");
      setIsLoading(false);
    } catch (err) {
      console.error("Error edit Sub", err);
      toast.error("Error occurred while edit Sub");
    }
  };

  return (
    <div className="home_wrapper">
      <ToastContainer />
      {isLoading ? (
        <div
          style={{
            width: "100%",
            height: "90vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FadeLoader color="#546672" size={75} />
        </div>
      ) : (
        <TableContainer
          Impp={Impp}
          vmp={vmp}
          cableSize={cableSize}
          cableLength={cableLength}
          operationTemp={operationTemp}
          tableData={tableData}
          setTableData={setTableData}
          setImpp={setImpp}
          setOperationTemp={setOperationTemp}
          setCableLength={setCableLength}
          setVmp={setVmp}
          setCableSize={setCableSize}
          Pmax={Pmax}
          setPmax={setPmax}
          handleUpateSubCategory={handleUpateSubCategory}
        />
      )}
    </div>
  );
};

export default Home;
