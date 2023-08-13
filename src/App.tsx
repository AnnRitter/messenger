import { useEffect, useState } from 'react'
import './App.css'
import { Chat } from './components/Chat/Chat'
import { Users } from './components/Users/Users'
import { HubConnectionBuilder, LogLevel, HttpTransportType } from "@microsoft/signalr"
import { useDispatch } from 'react-redux'
import { usersActions } from './redux/features/users'
function App() {
  const [connection, setConnection] = useState()
  const [users, setUsers] = useState()
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
      //   // @ts-ignore
      //   setConnection()
      // });
      await hubConnection.start()
      
       // @ts-ignore
      setConnection(hubConnection)
      
   let fusers = await hubConnection.invoke('getclients')
      setUsers(fusers);
      
      dispatch(usersActions.addUsers(fusers))

  }

  useEffect(() => {
    initConnection()

    return (
      
     // @ts-ignore
      connection?.stop()
    
    )
  }, [])
 
  return (
    <>
    <div className="flexHorizontal">
      <Users />
      <Chat /> 
    </div>
      
    </>
  )
}

export default App
