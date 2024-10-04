import { createContext, useEffect, useContext, useReducer, useCallback } from "react";
import PropTypes from "prop-types";
// import { useParams } from "react-router-dom";
// we have use usereducer to upadte states here beacsue we have so much  of related state

const BASE_URL = "http://localhost:8000";
const CitiesContext = createContext();
const initialState={
  cities:[],
  isLoading:false,
  currentCity:{},
  error:"",
}
function reducer(state,action)
{
     switch(action.type)
     {
      case "loading":{

        return {...state,isLoading:true}
      }
      case "complete":{
        return {
          ...state,isLoading:false
        }
      }
       case "cities/loaded": 
       {
        return {...state,isLoading:false,cities:action.payload}
       }
        case "cities/created":
          {
            return {
              ...state,isLoading:false,cities:[...state.cities,action.payload]
            }
          }
        case "cities/deleted":
          {
            return{
              ...state,cities:state.cities.filter((city)=>city.id!==action.payload)
            }
          }
          case "rejected": {
            return {
              ...state,isLoading:false,error:action.payload
            }
          }
          case "city/loaded":
            {
              return {
                ...state,isLoading:false,currentCity:action.payload
              }
            }
          default: throw new Error('unknown error');
     }
}

function CitiesProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [currentCity, setCurrentCity] = useState({});
  const [{cities,isLoading,currentCity},dispatch]= useReducer(reducer,initialState);
  useEffect(function () {
    async function fetchCities() {
    dispatch({type:"loading"});
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        // setCities(data);
        dispatch({type:"cities/loaded",payload:data});
      } catch {
        // alert("There was an error loading data...");
        dispatch({type:"rejected",payload:"there was an error in laoding data"})
      } finally {
        // setIsLoading(false);
        dispatch({type:"complete"});
      }
    }
    fetchCities();
  }, []);

   const getCity= useCallback( async function getCity (id) {
    // if same city added twice it will not add it will simply return
    if(Number(id)===currentCity.id) return;
    dispatch({type:"loading"});
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      // setCurrentCity(data);
      dispatch({type:"city/loaded",payload:data})
    } catch {
      dispatch({type:"rejected",payload:"there was an error in laoding data"})
    } 
  },[currentCity.id]);
  async function createCity(newCity) {
    dispatch({type:"loading"});
    try {
      const res = await fetch(`${BASE_URL}/cities`,{method:"POST",body:JSON.stringify(newCity),headers:{"Content-Type":"application/json",}});
      const data = await res.json();
      // setCities(cities=>[...cities,data]);
      dispatch({type:"cities/created",payload:data})
    } catch {
      dispatch({type:"rejected",payload:"there was an error in laoding data"})
    } 
  }
  async function deleteCity(id) {
    // dispatch({type:"loading"});
    try {
       await fetch(`${BASE_URL}/cities/${id}`,{method:"DELETE"});
      // const data = await res.json();
      // const nwCities=((cities)=>cities.filter((city)=>city.id!==id));
      dispatch({type:"cities/deleted",payload:id})
    } catch {
      dispatch({type:"rejected",payload:"there was an error in laoding data"})
    } 
  }


  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity,createCity,deleteCity }}>
      {children}
    </CitiesContext.Provider>
  );
}

// Custom hook to use CitiesContext
function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined) throw new Error("useCities must be used within a CitiesProvider");
  return context;
}

// Add prop types validation for children
CitiesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { CitiesProvider, useCities };
