import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [charAllowed, setCharAllowed] = useState(false);
  const [numAllowed, setNumAllowed] = useState(false);
  const [length, setLength] = useState(8);
  const [pass, setPasss] = useState("dbidCNwodd");
  const passRef = useRef(null);

  const copyPassSys = useCallback(()=>{
    passRef.current?.select()
    // passRef.current?.setSelectionRange(0, 9)
    window.navigator.clipboard.writeText(pass);
  }, [pass]);


  const passGenerator = useCallback(() =>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(charAllowed) str+="~`!@#$%^&*()+_";
    if(numAllowed) str+="0123456789";
    for(let i=1; i<length; i++){
      let char = Math.floor(Math.random()*str.length+1);
      pass += str.charAt(char);
    }
    setPasss(pass);
  }, [length, charAllowed, numAllowed, pass]);

  useEffect(()=>{
    passGenerator()
  }, [charAllowed, numAllowed, length])
  return (
    <>
      <h1 className='text-center text-4xl text-black'>Let me generate something for you!</h1>
      <div className="bg-fuchsia-500 w-full max-w-md mx-auto shadow-md  my-4
      rounded-lg  text-center text-black">
        <div className='flex my-3 py-3 mb-4 overflow-hidden rounded-lg shadow'>
          <input type="text" ref={passRef} value={pass} className='rounded-lg py-1 px-3 outline-none w-full mx-4' readOnly/>
          <button className='py-1 px-3 mx-2 bg-fuchsia-400 text-white rounded-lg ' onClick={copyPassSys}>Copy</button>
          {/* hover:mix-blend-color-dodge */}
        </div>
        <div className='gap-x-2 flex'>
          <div className="flex items-center gap-x-1">
            <input className='cursor-pointer' type="range" onChange={(e)=>{setLength(e.target.value)}} value={length} min={6} max={22} />
            <label htmlFor="">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <label htmlFor="">Numbers: </label>
            <input className='cursor-pointer' type="checkbox" onChange={()=>setNumAllowed((e)=>!e)} value={length} min={6} max={22} />
          </div>
          <div className="flex items-center gap-x-1">
            <label htmlFor="">Special characters: </label>
            <input className='cursor-pointer' type="checkbox" onChange={()=>setCharAllowed((e)=>!e)} value={length} min={6} max={22} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
