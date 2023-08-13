import { Message } from "../Message/Message";

export function Chat() {
   
    return (
        <div className="wrap">
            <h1>Чат</h1>
            <Message />
            <input type="text" placeholder="Введите сообщение"/>
            <button type="submit">Отправить</button>
        </div>
    )
}