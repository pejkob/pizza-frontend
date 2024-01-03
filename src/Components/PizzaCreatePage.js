import { useState, useEffect } from 'react';
import {NavLink} from "react-router-dom";

export function PizzaCreatePage() {

    const [instruments, setInstruments] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect(() => {
        setFetchPending(true);
        fetch("https://kodbazis.hu/api/instruments", {credentials: "include"})
        .then((res) => res.json())
        .then((hangszerek) => setInstruments(hangszerek))
        .catch(console.log)
        .finally(() => {
            setFetchPending(false);
        });
 }, []);
 return (
   <div className='p-5 m-auto text-center content bg-ivory'>
    { isFetchPending ? ( <div className='spinner-border'></div>) : (
        <div>
            <h2>Hangszerek</h2>
            {instruments.map((instrument) => (
                <div key={instrument.id + 4} className='card col-sm-3 d-inline-block m-1 p-2'>
                    <h6 className='text-muted'>{instrument.brand}</h6>
                    <h5 className='text-muted'>{instrument.name}</h5>
                    <div>{instrument.price}.- HUF</div>
                    <div className='small'>Készleten: {instrument.quantity} db</div>
                    <NavLink key={instrument.id} to={"/hangszer/" + instrument.id}>
                    <div className='card-body'>
                        <img className='img-fluid'
                        style={{ maxHeight: 200 }}
                        alt = "hiányzik a képed innen!"
                        src={instrument.imageURL ? instrument.imageURL : "https://via.placeholder.com/400x800"}
                        />
                    </div></NavLink>
                    <br />
                    <NavLink key={instrument.id+1} to={"/mod-hangszer/" + instrument.id}>
                        <i className="bi bi-pencil-square mx-1">Módosítás</i>
                    </NavLink>
                    <NavLink key={instrument.id+2} to={"/del-hangszer/" + instrument.id} className={"text-danger"}>
                        <i className="bi bi-trash3">Törlés</i>
                    </NavLink>
                </div>
                
            ))}
        </div>
    )}
   </div> 
 );
}