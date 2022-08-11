const ListNumbers = ({filteredList, handleDelete}) => {

return(
filteredList.map(list => <div key={list.id}><p>
  {list.name} {list.number} <button onClick={() => handleDelete(list.id,list.name)} key={list.id}>delete</button>
</p></div>)
  )
}
export default ListNumbers