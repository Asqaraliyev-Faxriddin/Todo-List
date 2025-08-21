import { useEffect, useState } from 'react'

function App() {

  let [name, setname] = useState("Barchasini bajarilgan qilish")
  let [count, setcount] = useState(0)
  let [vazifalar, setVazifalar] = useState([]);
  let [yangiVazifa, setYangiVazifa] = useState("");
  let [editingId, setEditingId] = useState(null);
  let [activeButton, setActiveButton] = useState("Barchasi");
  let [editingTitle, setEditingTitle] = useState("");
  let [qidirish, setQidirish] = useState("");



  useEffect(()=>{

    let saqlangan = localStorage.getItem("vazifalar")
    if(saqlangan) setVazifalar(JSON.parse(saqlangan))

  },[])

  useEffect(()=>{
    localStorage.setItem("vazifalar",JSON.stringify(vazifalar))
  },[vazifalar])

  function qoshish(){
    if(yangiVazifa.trim()=="") return

    let yangi = {
      id:Date.now(),
      title:yangiVazifa,
      confirm:false
    }

    setVazifalar([...vazifalar,yangi])
    setYangiVazifa("")
  }

  function toggleBajarildi(id){
    setVazifalar(vazifalar.map(l => l.id === id ? {...l, confirm: !l.confirm} : l));
  }
  

  function ochirish(id){
    setVazifalar(vazifalar.filter(l=> l.id != id ))
  }

  function tahrirlash(id, title) {
    setVazifalar(vazifalar.map(v => v.id === id ? {...v, title} : v));
    setEditingId(null);
  }
  

  function handleClick() {
    if(name === "Barchasini bajarilgan qilish") {
      setVazifalar(vazifalar.map(v => ({ ...v, confirm: true })));
      setname("Barchasini faollashtirish!");
    } else {
      setVazifalar(vazifalar.map(v => ({ ...v, confirm: false })));
      setname("Barchasini bajarilgan qilish");
    }
  }
  

  return (
    <>
      <div className='w-[1200px] h-auto bg-amb mx-auto  justify-between  p-4 grid  grid-cols-2 grid-rows-3'>
        <h1 className='text-3xl font-bold'>📝 Todo List</h1>
        <button  onClick={handleClick}  className='bg-white h-[43px] w-[270px] shadow-md text-black px-4 py-2  font-semibold hover:bg-gray-200 transition rounded-2xl'>{name}</button>


        <div className='block '>
          <input type="text" className='shadow-md rounded-2xl h-[57px] w-[448px] text-2xl pl-6' maxLength={32} placeholder='Yangi vazifa... (Enter) 'value={yangiVazifa} onChange={(e)=> setYangiVazifa(e.target.value)} onKeyDown={(e) => e.key === "Enter" && qoshish()} />
          <button className='bg-black text-white absolute -ml-8 mt-2 right-[1000px] w-[105px] h-[40px] rounded-2xl' 
          onClick={qoshish}>Qo'shish</button >
        </div>

          <div>
          <input type="text" className='shadow-md rounded-2xl h-[57px] w-[248px] pl-6 text-2xl'  placeholder='Qidirish...'  maxLength={22} value={qidirish} onChange={(e) => setQidirish(e.target.value)}
/>

          </div>

          <div className="gap-5 flex mb-8">
          {["Barchasi", "Faol", "Bajarilgan"].map((btn) => (
        <button key={btn} onClick={() => setActiveButton(btn)} className={`shadow-md w-[114px] h-[44px] rounded-2xl font-bold ${activeButton === btn ? "bg-black text-white": "bg-white text-black"}`}>
          {btn}
        </button>
      ))}
    </div>
          <div>
          <h1 className='text-2xl absolute ml-[4px]'>
  Qolgan: {vazifalar.filter(v => !v.confirm).length}
</h1>

          </div>


          <div class="w-[830px] mx-auto mt-10 bg-white rounded-2xl shadow p-4 space-y-3 -ml-0">
          {
  vazifalar .filter(v => v.title.toLowerCase().includes(qidirish.toLowerCase()) &&  (activeButton === "Faol" ? !v.confirm : activeButton === "Bajarilgan" ? v.confirm : true))
    .map(vazifa => (

      <div key={vazifa.id} className="flex items-center justify-between p-2 rounded-xl hover:bg-gray-50 transition group">
        <div className="flex items-start gap-3">
          <input type="checkbox" className="w-[20px] h-[20px] mt-1" checked={vazifa.confirm}  onChange={() => toggleBajarildi(vazifa.id)}/>
          <div>
            {editingId === vazifa.id ? (
              <input  type="text"  value={editingTitle}  onChange={e => setEditingTitle(e.target.value)}  onKeyDown={e => {
                  if (e.key === "Enter") {
                    tahrirlash(vazifa.id, editingTitle);
                    setEditingId(null);
                  }
                }}
                className="border-b-2 border-gray-300 text-base focus:outline-none"
              />
            ) : (
              <p className={` ${vazifa.confirm ? "line-through text-gray-400" : ""}`}>  {vazifa.title}  </p>
            )}
            <span className={`text-gray-400 text-sm block ${vazifa.confirm ? "line-through":""}`}>{new Date(vazifa.id).toLocaleString()}</span>
          </div>
        </div>

        <div className="opacity-0 group-hover:opacity-100 flex gap-2">
          <button
            className="text-blue-500 hover:text-blue-700"
            onClick={() => { setEditingId(vazifa.id); setEditingTitle(vazifa.title); }}>
            Tahrirlash
          </button>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => ochirish(vazifa.id)}>
            O'chirish
          </button>
        </div>
      </div>
))}






 
</div>


         


            

          
    
      </div>
    </>
  )
}

export default App
