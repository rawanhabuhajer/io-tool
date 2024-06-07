import React, { useState, useEffect } from "react";
import "./sub.css";
import { Link } from "react-router-dom";
import Card from "../../components/card/Card";
import SubCard from "../../components/subCard/SubCard";
import ModalComponent from "../../components/modal/ModalComponent";
import axios from "axios";
import UseAuthContext from "../../hooks/UseAuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";
const SubCategories = () => {
  const [subCategoryName, setsubCategoryName] = useState();
  const [subCategoryDescription, setsubCategoryDescription] = useState();
  const [subCategoriesData, setsubCategoriesData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [editIsActive, setEditIsActive] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const { user, loading } = UseAuthContext();
  const location = useLocation();
  const id = location.state._id;

  const formData = {
    name: subCategoryName,
    description: subCategoryDescription,
    data: [
      {
        name: subCategoryName,
        description: subCategoryDescription,
        cableLength: null,
        vmp: null,
        Impp: null,
        operationTemp: null,
        classSelected: "",
        childSelected: "",
        areaSelected: null,
        conductorCableLength: null,
        seriesModule: null,
        r20: null,
        rTempreture: null,
        uTempreture: null,
        ploss: null,
        plossTemp: null,
        kt: null,
        pmax: null,
        uMax: null,
        uMaxLength: null,
        classSelectedModule: "",
        childSelectedModule: "",
        areaSelectedModule: null,
        r20Module: null,
        rTempretureModule: null,
      },
    ],
  };
  const getSubCategoriesApi = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://montaser-backend-3fpi.vercel.app/api/subCategories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const responseData = response.data.data.subcategories;
      console.log(responseData, "sub-category");
      setsubCategoriesData(responseData);
      setIsLoading(false);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    getSubCategoriesApi();
  }, [id]);

  const handleSaveSubCategory = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://montaser-backend-3fpi.vercel.app/api/subCategories/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setsubCategoryDescription("");
      setsubCategoryName("");
      handleClose();
      getSubCategoriesApi();
      toast.success("subCategory added sucssesfully");
      setIsLoading(false);
    } catch (err) {
      console.log("err", err);
      toast.error("Please provide subCategory details");
    }
  };
  const handleDeleteSub = async (subcategoryId) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `https://montaser-backend-3fpi.vercel.app/api/subCategories/subcategory/${subcategoryId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      getSubCategoriesApi();
      toast.success("subCategory deleted successfully");
      setIsLoading(false);
    } catch (err) {
      console.error("Error deleting subcategory", err);
      toast.error("Error occurred while deleting subcategory");
    }
  };
  const handleEditSub = async (subcategoryId) => {
    setIsLoading(true);
    setEditIsActive(true);
    console.log("hello", subcategoryId);
    try {
      const response = await axios.patch(
        `https://montaser-backend-3fpi.vercel.app/api/subCategories/subcategory/update/${subcategoryId}`,
        {
          name: subCategoryName,
          description: subCategoryDescription,
          data: subcategoryId.data,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      getSubCategoriesApi();
      setsubCategoryDescription("");
      setsubCategoryName("");
      toast.success("subCategory edit successfully");
      setIsLoading(false);
    } catch (err) {
      console.error("Error edit subcategory", err);
      toast.error("Error occurred while edit subcategory");
    }
  };

  return (
    <main>
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
        <>
          <div className="header_wrapper">
            <div className="categories_title">{location.state.name}</div>
            <ToastContainer />
            <ModalComponent
              onclick={handleSaveSubCategory}
              onclickCancel={handleClose}
              setProjectName={setsubCategoryName}
              setProjectDescription={setsubCategoryDescription}
              setOpen={setOpen}
              handleClose={handleClose}
              handleOpen={handleOpen}
              open={open}
              projectDescription={subCategoryDescription}
              projectName={subCategoryName}
              subCategoryActive={true}
              editIsActive={editIsActive}
              subCategory={true}
            />
          </div>
          <div className="card_wrapper">
            {subCategoriesData?.map((sub, index) => (
              <SubCard
                key={sub._id}
                subcategory={sub}
                onClick={() => navigate("/project", { state: sub })}
                handleDeleteSub={handleDeleteSub}
                editSub={handleEditSub}
                setProjectName={setsubCategoryName}
                setProjectDescription={setsubCategoryDescription}
                projectDescription={subCategoryDescription}
                projectName={subCategoryName}
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default SubCategories;
