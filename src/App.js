import{ React,useState, useEffect} from 'react';
// import myTodo from './myTodo';
import './style.css'
const getLocalData=()=>{
  const lists=localStorage.getItem("mytodolist")
  if(lists){
    return JSON.parse(lists);
  }
  else{
    return[];
  }
}
function App() {
  const [inputData,setinputData]=useState("");
  const [items,setitems]=useState(getLocalData());
  const [isEditItem,setIsEditItem]=useState();
  const [toggleButton,setToggleButton]=useState(false);
  //how to add functions
  const additem=()=>{
    if(!inputData){
      alert("Plz fill the data");
    }
    else if(inputData && toggleButton){
      setitems(
        items.map((currElem,index)=>{
          if(currElem.id===isEditItem){
            return{...currElem,name:inputData}
          }
          return currElem;
        })
      )
      setinputData([]);
      setIsEditItem(null);
      setToggleButton(false);
    }
    else{
      const myNewInputData={
        id:new Date().getTime().toString(),
        name:inputData
      }
      setitems([...items,myNewInputData]);
      setinputData("");
    }
  }
  //how to edit items
  const editItem=(index)=>{
    const item_todo_edited=items.find((currElem)=>{
      return currElem.id===index;
    });
    setinputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleButton(true);
  }
  //how to delete items
  const deleteItem=(index)=>{
    const updatedItem=items.filter((currElem)=>{
      return currElem.id !==index;
    })
    setitems(updatedItem)
  }
  //remove all the elements
  const removeAll=()=>{
    setitems([]);
  }
  //adding local Storage
  useEffect(()=>{
    localStorage.setItem("mytodolist",JSON.stringify(items));
  },[items])
  return (
    <>
    <div className="main-div">
      <div className="child-div">
        Hello
        <figure>
          <img src="./images/download.jpg" alt="" />
          <figcaption>Add Your List Here</figcaption>
        </figure>
        <div className="addItems">
          <input type="text" className="form-control" 
          placeholder='Add Item'
          value={inputData} 
          onChange={(event)=>setinputData(event.target.value)}/>
          {toggleButton?
           (<i class="far fa-edit add-btn" onClick={additem
           }></i>):
           <i class="fa fa-plus add-btn" onClick={additem
           }></i>}
         
        </div>
        {/* show our items */}
        <div className="showItems">
          {
            items.map((currElem,index)=>{
              return(
                <div className="eachItem" key={currElem.id}>
                <h3>{currElem.name}</h3>
                <div className="todo-btn">
                <i class="far fa-edit add-btn" onClick={()=>editItem(currElem.id)}></i>
                <i class="far fa-trash-alt add-btn" onClick={()=>deleteItem(currElem.id)}></i>
                </div>
              </div>
              )
            })
          }
         
        </div>
        <div className="showItems">
          <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button>
        </div>
      </div>
    </div>
    </>
  );
}

export default App;
