import { createContext, useContext, useState } from "react";

export let UserContext = createContext();
export default  function UserContextProvider(props) {
   
const [userToken, setUserToken] = useState(null);
const [userData, setUserData] = useState(null);

return<UserContext.Provider   value={{setUserToken, userToken,  setUserData, userData}}>
{props.children}
</UserContext.Provider>
}
