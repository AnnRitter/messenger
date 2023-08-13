import { useSelector } from "react-redux"

export function Users() {
    const users = useSelector((state) => state.users)
    return (
        <div className="wrap">
            <h1>Список пользователей</h1>  
            <ul>  
                
                {/* {users ? users.map((user: any, index: number) => {
                    if (index < 10) {
                        return <li key={user.id} onClick={function empty() {}}>{user.id}</li>
                    }
                }) : 'Нет активных пользователей'}    */}
               
            </ul>
        </div>
    )
}