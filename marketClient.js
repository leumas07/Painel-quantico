
const axios = require('axios');
const API = process.env.TWELVE_API_KEY || '';
const base = 'https://api.twelvedata.com';

async function price(sym){
  try{
    const r = await axios.get(base + '/price', { params: { symbol: sym, apikey: API } });
    return r.data;
  }catch(e){
    return { error: true, message: e.message };
  }
}

async function getSnapshot(){
  const dol = await price('USDBRL');
  const win = await price('WIN$N'); // placeholder symbol; adjust if needed
  return {
    timestamp: Date.now(),
    dol, win,
    volatility: { dol: Math.random()*2, win: Math.random()*3 },
    signals: { dol: 'neutral', win: 'buy' }
  };
}

module.exports = { getSnapshot };
