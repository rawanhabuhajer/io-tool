import React, { useState, useEffect } from "react";
import Select, { selectClasses } from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import { classes as dropdownClasses } from "./Data";
import "./dropdeon.css";
const Dropdown = ({
  setAreaOptions,
  setAreaSelected,
  setChildOptions,
  setChildSelected,
  setClassSelected,
  classSelected,
  childOptions,
  childSelected,
  areaOptions,
  areaSelected,
  associatedValue,
  setAssociatedValue,
  classes,
  child,
  area,
}) => {
  const handleChange = (event, newValue) => {
    setClassSelected(newValue);
    const selectedClass = dropdownClasses.find(
      (classOption) => classOption.value === newValue
    );
    setChildOptions(selectedClass ? selectedClass.children : [])
  };

  const handleChangeChild = (event, newValue) => {
    setChildSelected(newValue);
    const selectedChild = childOptions.find(
      (childOption) => childOption.value === newValue
    );
    setAreaOptions(selectedChild ? selectedChild.area : []);
  };

  const handleChangeArea = (event, newValue) => {
    setAreaSelected(newValue);
  };
  
  return (
    <div>
      {classes && (
        <div className="child-dropdown__container">
          <Select
            onChange={handleChange}
            className="select_container"
            placeholder="Select Class…"
            indicator={<KeyboardArrowDown />}
            sx={{
              width: 100,
              height: 30,
              // boxShadow: "inset 0px 0px 11px 1px rgba(240,240,240,1)",
              backgroundColor: "rgb(249,249,249)",
              fontWeight: 400,
              fontSize: 14,
              textTransform: "lowercase",
              fontFamily: "Open Sans, sans-serif",
              [`& .${selectClasses.indicator}`]: {
                transition: "0.2s",
                [`&.${selectClasses.expanded}`]: {
                  transform: "rotate(-180deg)",
                },
              },
            }}
          >
            {dropdownClasses.map((classOption) => (
              <Option key={classOption.value} value={classOption.value}>
                {classOption.label}
              </Option>
            ))}
          </Select>
        </div>
      )}
      {child && (
        <div className="child-dropdown__container">
          <Select
            onChange={handleChangeChild}
            className="select_container"
            placeholder="Select Conductor type…"
            indicator={<KeyboardArrowDown />}
            sx={{
              width: 100,
              height: 30,
              // boxShadow: "inset 0px 0px 11px 1px rgba(240,240,240,1)",
              backgroundColor: "rgb(249,249,249)",
              fontWeight: 400,
              fontSize: 14,
              fontFamily: "Open Sans, sans-serif",
              [`& .${selectClasses.indicator}`]: {
                transition: "0.2s",
                [`&.${selectClasses.expanded}`]: {
                  transform: "rotate(-180deg)",
                },
              },
            }}
          >
            {classSelected ? (
              childOptions.map((childOption) => (
                <Option key={childOption.value} value={childOption.value}>
                  {childOption.label}
                </Option>
              ))
            ) : (
              <Option disabled>{"Select class first"}</Option>
            )}
          </Select>
        </div>
      )}
      {area && (
        <div className="area-dropdown__container">
          <Select
            onChange={handleChangeArea}
            className="select_container"
            placeholder="Select nominal cross..."
            indicator={<KeyboardArrowDown />}
            sx={{
              width: 100,
              height: 30,
              // boxShadow: "inset 0px 0px 11px 1px rgba(240,240,240,1)",
              backgroundColor: "rgb(249,249,249)",
              fontWeight: 400,
              fontSize: 14,
              fontFamily: "Open Sans, sans-serif",
              [`& .${selectClasses.indicator}`]: {
                transition: "0.2s",
                [`&.${selectClasses.expanded}`]: {
                  transform: "rotate(-180deg)",
                },
              },
            }}
          >
            {childSelected ? (
              areaOptions.map((areaOption) => (
                <Option key={areaOption.value} value={areaOption.value}>
                  {areaOption.label} mm²
                </Option>
              ))
            ) : (
              <Option disabled>{"Select conductor type first"}</Option>
            )}
          </Select>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
