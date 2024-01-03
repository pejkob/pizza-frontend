import { useState, useEffect } from 'react';
import { useParams, NavLink } from "react-router-dom";

export function PizzaSinglePage() {

    const param = useParams();
    const id = param.pizzaid;
    const [pizza, setPizzas] = useState([]);
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        setPending(true);
        (async() => {
            try {
        const res = await fetch(`https://pizza.kando-dev.eu/Pizza/${id}`)
        const pizza =await res.json();
        setPizzas(pizza);
        } catch(error) {
            console.log(error);
        }
        finally{
            setPending(false);
        }
    })();
 }, [id]);
 return (
   <div className='p-5 m-auto text-center content bg-lavender'>
    { isPending || !pizza.id ? ( <div className='spinner-border'></div>) : (       
                <div className='card p-3'>
                    <div className='card-body'>
                    <h4>{pizza.brand}</h4>
                    <h5 className='card-title'>{pizza.name}</h5>
                    <p>Gluténmentes: {pizza.isGlutenFree?"Igen":"Nem"} </p>
                       <NavLink  to={"/"}>
                        <img className='img-fluid rounded'
                        style={{ maxHeight: "500px" }}
                        alt = "hiányzik a képed innen!"
                        src={pizza.kepURL ? pizza.kepURL : "https://via.placeholder.com/400x800"}
                        /></NavLink>
                    </div>
                </div>
            )}
        </div>
    ); 
}