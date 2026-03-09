import { useState,useEffect } from "react";
import api from "../../api";
import DuelCard from "./DuelCard";

export default function DuelSection(){

  const [tab,setTab] = useState("active");
  const [data,setData] = useState({active:[],settled:[]});

  useEffect(()=>{ load(); },[]);

  async function load(){

    const res = await api.get("/user/duels/calls");

    setData(res.data.data);
  }

  const list = data[tab] || [];

  return(

    <div>

      <div className="calls-sub-tabs">

        <button
          className={tab==="active"?"active":""}
          onClick={()=>setTab("active")}
        >
          Active ({data.active?.length||0})
        </button>

        <button
          className={tab==="settled"?"active":""}
          onClick={()=>setTab("settled")}
        >
          Settled ({data.settled?.length||0})
        </button>

      </div>

      {list.length===0 && (
        <div className="empty-state">
          No {tab} duels
        </div>
      )}

      {list.map(duel=>(
        <DuelCard key={duel.uuid} duel={duel}/>
      ))}

    </div>
  );
}