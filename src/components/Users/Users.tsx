
import { useDispatch, useSelector } from "react-redux"
import { usersActions } from '../../redux/features/users'
import { useEffect, useState } from 'react'

// type User = {
//     id: string,
//     name: string,
//     status: string,
// }

export function Users({connection}: any) {
    const [hub, setHub ] = useState()
    const users = useSelector((state: any) => state.users.users)
    const dispatch = useDispatch()
   
    function selectUser(userId: string, userName: string) {
        dispatch(usersActions.clearMessages()) 
        dispatch(usersActions.selectUser({userId, userName})) 
    }

    useEffect(() => {
        async function fetchData() {
             let res = await connection
            setHub(res);

            // console.log(users);
            
         }
         fetchData()
     }, [connection])
    
    return (
        <div className="wrap max">
            <h1 className="center">Список пользователей</h1>  
            <ul>  
                {users ? Object.values(users).map((user: any, index: number) => {
                    if (index < 10) {
                        return <div key={user.id}  className="flex-horizontal space-between">
                            <li onClick={ () => selectUser(user.id, user.name) }>{user.name}</li>
                            <span className="status">{user.status}</span>
                        </div> 
                    }
                }) : 'Нет активных пользователей'}  
            </ul>
        </div>
    )
}
//