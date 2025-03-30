import React from 'react'
import { useAuth } from '../../context/AuthContext';

const Header = () => {

    const {user , logout} = useAuth();
    
    const handelClick = ()=>{
        logout();
    };
  return (
    <div >
        <nav className="flex justify-between items-center bg-gray-800 p-4">

            <h1 className="text-white text-2xl">Welcome {user.name}</h1>

            <div>

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handelClick}>
                    Logout
                </button>

            </div>
        </nav>
    </div>
  )
}

export default Header
