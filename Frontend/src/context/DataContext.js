import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const useDataContext = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [tableData, setTableData] = useState([
    {
      name: "",
      description: "",
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
    },
  ]);

  const updateTableData = (newData) => {
    setTableData(newData);
  };

  const contextValue = {
    tableData,
    updateTableData,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};
