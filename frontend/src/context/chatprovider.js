import {createContext, useContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
const ChatContext = createContext();

const ChatProvider  = ({children}) =>{
    const [SelectedChat, setSelectedChat] = useState();
    const [user, setUser] = useState();
    const [chats, setChats] = useState([])
    const [notification,setNotification] = useState([])

    const navigate = useNavigate()


    useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) navigate("/");
      else setUser(userInfo);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigate]);
    

    return (
    <ChatContext.Provider 
    value={{
        user,setUser,SelectedChat,setSelectedChat,chats,setChats,notification,setNotification
    }}
    >
        {children}
    </ChatContext.Provider>
    )
};

export const ChatState = ()=>{
    return  useContext(ChatContext);
};




export default ChatProvider;