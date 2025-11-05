
import React, {useState} from 'react'
import Dashboard from './components/Dashboard'
import axios from 'axios'

export default function App(){
  const [token, setToken] = useState(localStorage.getItem('pp_token'));
  const [u,setU] = useState('');
  const [p,setP] = useState('');

  async function signup(){
    const r = await axios.post('/api/signup', { username:u, password:p });
    localStorage.setItem('pp_token', r.data.token); setToken(r.data.token);
  }
  async function login(){
    const r = await axios.post('/api/login', { username:u, password:p });
    localStorage.setItem('pp_token', r.data.token); setToken(r.data.token);
  }

  if (!token) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 bg-white rounded shadow w-96">
        <h2 className="text-xl font-bold mb-4">Entrar / Criar conta</h2>
        <input placeholder="Usuário" value={u} onChange={e=>setU(e.target.value)} className="w-full mb-2 border px-2 py-1" />
        <input placeholder="Senha" type="password" value={p} onChange={e=>setP(e.target.value)} className="w-full mb-4 border px-2 py-1" />
        <div className="flex gap-2">
          <button onClick={login} className="flex-1 py-2 bg-sky-600 text-white rounded">Entrar</button>
          <button onClick={signup} className="flex-1 py-2 border rounded">Criar</button>
        </div>
      </div>
    </div>
  )

  return <Dashboard />
}
