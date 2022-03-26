import React, {
  // useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

const AppContest = React.createContext();

const urls = {
  regionUrl: "https://restcountries.com/v3.1/region/",
  nameUrl: "https://restcountries.com/v3.1/name/",
  allUrl: "https://restcountries.com/v3.1/all",
  listCode: "https://restcountries.com/v3.1/alpha?codes=",
};

function reducer(state, action) {
  if (action.type === "CHANGE_THEME") {
    localStorage.setItem("theme", !state.isDark);
    return { ...state, isDark: !state.isDark };
  } else if (action.type === "SHOW_BY_REGION") {
    return { ...state, region: action.region };
  } else if (action.type === "TO_ALL") {
    return { ...state, region: "all" };
  }
  return state;
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    isDark: localStorage.getItem("theme") === "true" ? true : false,
    region: "",
  });
  const [countryList, setCountryList] = useState([]);
  const [message, setMessage] = useState("Loading");
  const body = useRef(document.querySelector("body"));
  const [countryName, setCountryName] = useState("");

  async function fetchData(url) {
    setMessage("Loading...");
    try {
      const responce = await fetch(url);
      if (responce.ok) {
        const data = await responce.json();
        setCountryList(data);
      } else {
        throw new Error("Not Found");
      }
    } catch {
      setMessage("Server down please try after some time.");
      setCountryList([]);
    }
  }

  function fetchByRegion(region) {
    let url = urls.regionUrl + region;
    if (region === "all") {
      fetchData(urls.allUrl);
      return;
    }
    fetchData(url);
  }

  useEffect(() => {
    fetchData(urls.allUrl);
  }, []);

  useEffect(() => {
    body.current.className = `${state.isDark ? "dark" : "light"}`;
  }, [state.isDark]);

  return (
    <AppContest.Provider
      value={{
        state,
        dispatch,
        countryList,
        message,
        fetchByRegion,
        urls,
        setMessage,
        countryName,
        setCountryName,
      }}>
      {children}
    </AppContest.Provider>
  );
};

const useGlobal = () => {
  return useContext(AppContest);
};

export { useGlobal, AppProvider };
