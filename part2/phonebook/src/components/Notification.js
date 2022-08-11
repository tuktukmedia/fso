const Notification = ({ message,positive }) => {

    if (message === null) {
      return null
    }
    return (
      <div className={positive}>
       <span className='notificationText'> {message}</span>
      </div>
    )
  }

  export default Notification