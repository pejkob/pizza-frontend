import { useState, useEffect } from 'react';
import {NavLink} from "react-router-dom";

export function PizzaListPage() {

    const [pizzas, setPizzas] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect(() => {
        setFetchPending(true);
        fetch("https://pizza.kando-dev.eu/Pizza")
        .then((res) => res.json())
        .then((pizza) => setPizzas(pizza))
        .catch(console.log)
        .finally(() => {
            setFetchPending(false);
        });
 }, []);
 return (
   <div className='p-5 m-auto text-center content bg-ivory'>
    { isFetchPending ? ( <div className='spinner-border'></div>) : (
        <div>
            <h2>Pizzák</h2>
            {pizzas.map((pizza) => (
                <div key={pizza.id + 4} className='card col-sm-3 d-inline-block m-1 p-2'>
                    <h5 className='text-muted'>{pizza.name}</h5>
                    <div className='small'>Gluténmentes: {pizza.isGlutenFree?"Igen":"Nem"}</div>
                    <NavLink key={pizza.id} to={"/pizza/" + pizza.id}>
                    <div className='card-body'>
                        <img className='img-fluid'
                        style={{ maxHeight: 200 }}
                        alt = "hiányzik a képed innen!"
                        src={pizza.kepURL ? pizza.kepURL : "https://via.placeholder.com/400x800"}
                        />
                    </div></NavLink>
                    <br />
                    <NavLink key={pizza.id+1} to={"/mod-pizza/" + pizza.id}>
                        <i className="bi bi-pencil-square mx-1">Módosítás</i>
                    </NavLink>
                    <NavLink key={pizza.id+2} to={"/del-pizza/" + pizza.id} className={"text-danger"}>
                        <i className="bi bi-trash3">Törlés</i>
                    </NavLink>
                </div>
                
            ))}
        </div>
    )}
   </div> 
 );
}