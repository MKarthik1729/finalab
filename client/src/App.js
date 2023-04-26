import {useRef,useState} from 'react'
import axios from 'axios'
import './App.css';
import Display from './Display';


function App() {
  const name = useRef()
  const phone = useRef()
  const email = useRef()
  const Image = useRef()
  const [insert,setInsert] = useState(true)
  const [photo,setPhoto] = useState()

  const HandleSubmit = (e)=>{
    e.preventDefault()

    const aa =  {
      name : name.current.value,
      phone : phone.current.value,
      email : email.current.value
    }
    const formData = new FormData();
    formData.append("file", Image.current.files[0]);
    formData.append("name",aa.name);
    formData.append("phone", aa.phone); // Replace the preset name with your own
    formData.append("email", aa.email); // Replace API key with your own Cloudinary key
    // formData.append("timestamp", (Date.now() / 1000) | 0);
    console.log(aa)

    axios.post('http://localhost:3300/',formData)
      .then(ele =>{setInsert(false)})
      .catch(err =>  console.log(err))

  }

  return (

    <div className="App">
            <br /><br /><br />
      <button
      onClick={()=>setInsert(true)}
      >inserting</button>
      <button
      onClick={()=>setInsert(false)}
      >display</button>
      <br /><br />  
      {insert &&<div className='flex'>
        <form>

<label>Name
  <input 
  type='text'
  ref={name}
  /><br /><br />
</label>      
<label>Phone 
  <input 
  type='text'
  ref={phone}
  
  /><br /><br />
</label>      
<label>Email
  <input 
  type='text'
  ref={email}
  
  /><br /><br />
</label>
<label>
  <input 
  type='file'
  ref={Image}
  onChange={(e)=>setPhoto(URL.createObjectURL(e.target.files[0]))}
  /><br /><br />
</label>
<button 
onClick={HandleSubmit}
type='submit'>
  submit
  </button>

</form>
<img 
className='circle'
src={photo} />
        </div>}
{
  !insert && <Display />
}
    </div>
  );
}

export default App;
