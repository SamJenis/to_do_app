import './App.css';
import AddItem from './components/AddItem';
import Content from './components/Content';
import Footer from './components/Footer';
import Header from './components/Header';
import { useEffect, useState } from 'react';
import SearchItem from './components/SearchItem';
import apiRequest from './components/apiRequest';

function App() {

  const API_URL = 'http://localhost:3500/items';
  const [tasks, setTasks] = useState([])
  const [item, newItem] = useState('')
  const [search, setSearch] = useState('')
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      try{
      const response = await fetch(API_URL)
      if(!response.ok) throw Error("Data not received")
      const listItems = await response.json();

      console.log(listItems)
      setTasks(listItems)
      setError(null)
      }
      catch(error){
        console.log(error.stack)
        setError(error.message)
      }
      finally{
        setIsLoading(false)
      }
    }
    setTimeout(() => {
      (async () => await fetchItems())()

    },2000)
  }, [])

  const addItem = async () => {

    let addId = (tasks.length)? (tasks[tasks.length -1].id)+1:1;
    let newTask = {id:addId,checked:false,item:item};
    const listItems = [...tasks,newTask];
    setTasks(listItems)


    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTask)
    }
    const result = await apiRequest(API_URL, postOptions);
    if (result) setError(result);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(item === '') return;
    addItem(newItem)
    newItem('')
    
  }
  
  const handleCheck = async (id) => {

    const listItems = tasks.map((task) => (
      task.id === id ? {...task,  checked:!task.checked } : task)
    )
      
    setTasks(listItems)

    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked })
    };
    const reqUrl = `${API_URL}/${id}`;

    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setError(result);
  }

  const handleDelete = async(id) => {
    const listItems = tasks.filter((task) => (
      task.id !== id
    ))
    setTasks(listItems)

    const deleteOptions = { method: 'DELETE' };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setError(result);
  }



  return (
    <div className="App">
      <Header />
      <AddItem item= {item} newItem={newItem} handleSubmit ={handleSubmit}/>
      <SearchItem search={search} setSearch={setSearch}/>

      <main>
        {isLoading && <p className='msgBox'>Loading...</p>}
        {error && <p className='msgBox'>{`error: ${error}`}</p>}
        {!isLoading && !error && <Content tasks = {tasks} handleCheck= {handleCheck} handleDelete = {handleDelete} search = {search} error = {error}/>}
      </main>

      
      <Footer /> 
    </div>
  );
}

export default App;
