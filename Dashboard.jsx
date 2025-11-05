
import React, {useEffect, useState} from 'react'
import { io } from 'socket.io-client'

export default function Dashboard(){
  const [data,setData] = useState(null);

  useEffect(()=>{
    const s = io('/', { path: '/socket.io' });
    s.on('market', d=> setData(d));
    return ()=> s.disconnect();
  },[]);

  if (!data) return <div className="p-6">Carregando...</div>
  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Painel Pessoal</h1>
        <button onClick={()=>{ localStorage.removeItem('pp_token'); window.location.reload(); }} className="px-3 py-1 border rounded">Sair</button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold">Dólar (USDBRL)</h3>
          <div className="mt-2">Price: {data.dol.price}</div>
          <div>Vol Médio: {Number(data.volatility.dol).toFixed(2)}</div>
          <div>Sinal: {data.signals.dol}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold">Mini-Índice</h3>
          <div className="mt-2">Price: {data.win.price}</div>
          <div>Vol Médio: {Number(data.volatility.win).toFixed(2)}</div>
          <div>Sinal: {data.signals.win}</div>
        </div>
      </div>
    </div>
  )
}
