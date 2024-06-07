import React, { useState, useEffect, CSSProperties } from "react";
import Card from "../../components/card/Card";
import "./categories.css";
import { Link } from "react-router-dom";
import ModalComponent from "../../components/modal/ModalComponent";
import axios from "axios";
import UseAuthContext from "../../hooks/UseAuthContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FadeLoader from "react-spinners/FadeLoader";

const Categories = () => {
  const [projectName, setProjectName] = useState();
  const [projectDescription, setProjectDescription] = useState();
  const [categoriesData, setCategoriesData] = useState();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user, loading } = UseAuthContext();

  const formData = {
    name: projectName,
    description: projectDescription,
  };
  const getCategoriesApi = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://montaser-backend-3fpi.vercel.app/api/user/categories",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const responseData = response.data.categories;
      console.log(responseData, "category");
      setCategoriesData(responseData);
      setIsLoading(false);
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    getCategoriesApi();
  }, []);

  const handleSaveCategory = async (event) => {
    event.preventDefault();
    // setIsLoading(true)
    try {
      const response = await axios.post(
        "https://montaser-backend-3fpi.vercel.app/api/categories",
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setProjectDescription("");
      setProjectName("");
      handleClose();
      getCategoriesApi();
      toast.success("Project added sucssesfully");
      setIsLoading(false);
    } catch (err) {
      console.log("err", err);
      toast.error("Please provide project details");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `https://montaser-backend-3fpi.vercel.app/api/categories/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      getCategoriesApi();
      toast.success("Category deleted successfully");
      setIsLoading(false);
    } catch (err) {
      console.error("Error deleting category", err);
      toast.error("Error occurred while deleting category");
    }
  };
  const handleEditCategory = async (categoryId) => {
    setIsLoading(true);

    console.log("hello", categoryId);
    try {
      const response = await axios.patch(
        `https://montaser-backend-3fpi.vercel.app/api/categories/${categoryId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      getCategoriesApi();
      setProjectDescription("");
      setProjectName("");
      toast.success("Category edit successfully");
      setIsLoading(false);
    } catch (err) {
      console.error("Error edit category", err);
      toast.error("Error occurred while edit category");
    }
  };

  return (
    <main>
      {isLoading ? (
        <div
          style={{
            width: "100%",
            height: "85vh",
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
            <h1>Projects List</h1>
            <ToastContainer />
            <ModalComponent
              onclick={handleSaveCategory}
              onclickCancel={handleClose}
              setProjectName={setProjectName}
              setProjectDescription={setProjectDescription}
              setOpen={setOpen}
              handleClose={handleClose}
              handleOpen={handleOpen}
              open={open}
              projectDescription={projectDescription}
              projectName={projectName}
              subCategory={false}
            />
          </div>
          <div className="card_wrapper">
            {categoriesData?.map((category, index) => (
              <Card
                key={index}
                category={category}
                onClick={() => navigate("/sub-category", { state: category })}
                handleDeleteCategory={handleDeleteCategory}
                handleEditCategory={handleEditCategory}
                setProjectName={setProjectName}
                setProjectDescription={setProjectDescription}
                projectDescription={projectDescription}
                projectName={projectName}
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default Categories;
