import { createContext, useContext, useReducer, useEffect } from "react";
import { fetchUsers } from "../api/users.js";

const UserStateContext = createContext();
const UserDispatchContext = createContext();

const initialState = {
  users: [],
  loading: false,
  error: null,
  query: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true, error: null };
    case "SET_USERS":
      return { ...state, users: action.payload, loading: false };
    case "ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_QUERY":
      return { ...state, query: action.payload };
    case "ADD_USER":
      return { ...state, users: [action.payload, ...state.users] };
    default:
      return state;
  }
}

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function loadUsers() {
      dispatch({ type: "LOADING" });
      try {
        const users = await fetchUsers();
        dispatch({ type: "SET_USERS", payload: users });
      } catch (e) {
        dispatch({ type: "ERROR", payload: "Failed to fetch users" });
      }
    }
    loadUsers();
  }, []);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

export function useUsers() {
  return useContext(UserStateContext);
}

export function useUsersDispatch() {
  return useContext(UserDispatchContext);
}
