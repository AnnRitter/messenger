
export function Message({
    message,
    status,
  }: StandardComponentProps) {
   
    return (
        <li className="message">
            <span>{ message }</span>
            <div className="status">{ status ? status : 'Отправляется' }</div>
        </li>  
    )
}
// Message.propTypes = {
//     message: PropTypes.string,
//     children: PropTypes.string,
//   }
export interface StandardComponentProps {
    message: string,
    status: string,
  }