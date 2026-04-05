import { createContext } from "react";

const loginStatusContext = createContext({ user: null, setUser: () => { } });

export default loginStatusContext;