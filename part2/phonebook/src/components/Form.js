const Form = ({handleSubmit, handleInputName, newName, handleInputNumber, newNumber}) => {
    return (
      <form onSubmit={handleSubmit}  >
        <div>
           Name: <input onChange={handleInputName} value={newName} />
        </div>
        <div>
           Number: <input onChange={handleInputNumber} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  } 
  export default Form