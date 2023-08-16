import { Message } from "../Message/Message";
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from 'react'
import { usersActions } from '../../redux/features/users'
import styles from "./Chat.module.css"
import classNames from 'classnames'
import { HubConnection } from "@microsoft/signalr";

export function Chat({connection}: any) {

    const userId = useSelector((state: any) => state.users.user)
    const messages = useSelector((state: any) => state.users.messages)
    const [value, setValue ] = useState('')
    const [hub, setHub ] = useState<HubConnection>()
    const [status, setStatus ] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
       async function fetchData() {
            let res = await connection
           setHub(res);

        }
        fetchData()
    }, [connection])

    // useEffect(() => {
    // console.log(value);
    // })

    async function sendMessage(message: string) {
       setValue('')
       
       let result = await hub?.invoke('SendMessage', { "to": userId.userId, "text": message})
       if (result.ok) {
        setStatus('Отправлено')
       } else {
        setStatus('Не отправлено')
       }
       dispatch(usersActions.displayMessages(message)) 
    }

    return (
        <div className="wrap max flex-vertical">
            { 
                userId ? ( <h1 className="center">Чат c {userId.userName}</h1>)
                : (<h1 className="center">Чат</h1>)
            }
            <ul className="position-right flex-vertical flex-right">
                {
                   messages.map((message: string, index: number) => {
                       
                        return <Message key = {index} message = {message} status = {status}/>
                    }) 
                }
            </ul>
            <div className="center flex-horizontal">
                <input className={classNames(styles.input)} type="text" placeholder="Введите сообщение"  onChange={(event) => setValue(event.target.value)} value={value}/>
                <button type="submit" onClick={ value ? () => sendMessage(value) : undefined }>Отправить</button>
            </div>
            
        </div>
    )
}
