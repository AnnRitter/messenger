import { EffectCallback, useEffect, useState } from 'react'
import { Chat } from './components/Chat/Chat'
import { Users } from './components/Users/Users'
import { HubConnectionBuilder, LogLevel, HttpTransportType, HubConnection } from "@microsoft/signalr"
import { useDispatch, useSelector } from 'react-redux'
import { usersActions } from './redux/features/users'
import classNames from 'classnames'
import styles from './App.module.css'

function App() {
  const [connection, setConnection] = useState<HubConnection>()
  const [users, setUsers] = useState([])
  const usersState = useSelector((state: any) => state.users.users)
  const dispatch = useDispatch()

  const initConnection = async () => {
    const token = 'nh1nF2RLVakVSDQcVeGmOeU5vcMKOKN2ODzO737oKrT0vfsxlPMzWg2l4LSh';
      // const userId = crypto.randomUUID();
      const userId = '9c24bdf6-cd44-4883-aecc-66d83456144c'
      const hubConnection = new HubConnectionBuilder()
         .withUrl(`https://vac.astrapage.ru/hubs/chat/?user_id=${userId}`, {
          logger: LogLevel.Trace,
          skipNegotiation: true,
          transport: HttpTransportType.WebSockets,
          accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    // hubConnection.onclose(e => {
    //   setConnection()
    // });

    hubConnection.on('MessageReceived', (data) => {
     
      console.log('MessageReceived', data);
     
    })

    hubConnection.on('Connected', (data) => {
    
      console.log('Connected', data);
      console.log('users Connected', users);
       // @ts-ignore
      let found = Object.values(usersState).find(user => user.id === data.id);
      console.log('found Connected', found);
       // @ts-ignore
      found.status = 'В сети'
    })

    hubConnection.on('Disconnected', (data) => {
    
      console.log('users Disconnected', users);

      // @ts-ignore
      let found = Object.values(usersState).find(user => user.id === data.id);
      console.log('found Disconnected', found);
       // @ts-ignore
      found.status = 'Не в сети'
    })

    await hubConnection.start()

  
    setConnection(hubConnection)
      
    let clients = await hubConnection.invoke('getClients')

    // для удобства отладки 
    for (let i = 0; i < clients.length; i++) {
      clients[i].name = `User ${i}`
      clients[i].status = ''
    }
    clients.reverse()

    return clients
  }

  useEffect(() => {
  
    let response

    const fetchData = async () => {
      response = await initConnection();
      
   
       setUsers(response);
       dispatch(usersActions.addUsers(response))  
      
    }
    
    fetchData()
    .catch(console.error);

    return () => {
      connection?.stop()
    }
    
  }, [])
 

  useEffect(() => {

    dispatch(usersActions.addUsers(users))
    console.log(users);
    
  }, [users])
 
  return (
    <>
    <div className={classNames("flex-horizontal", styles.wrap)}>
      <Users connection={connection}/>
      <Chat connection={connection}/> 
    </div>
      
    </>
  )
}

export default App
