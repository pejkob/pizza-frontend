import { useState, useEffect } from 'react';
import {NavLink, useNavigate, useParams} from "react-router-dom";

export function PizzaDeletePage() {

    const navigate = useNavigate();
    const param = useParams();
    const id = param.pizzaid;
    const [pizza, setPizza] = useState([]);
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        setPending(true);
        (async () => {
            try {
            const res = await fetch(`https://pizza.kando-dev.eu/Pizza/${id}`);
            const pizza = await res.json();
            setPizza(pizza);
        } catch (error) {
            console.log(error);   
        }
        finally {
            setPending(false);
        }
    })();
    }, [id]);
    return (
             <div className='p-5 m-auto text-center content bg-lavender'>
    { isPending || !pizza.id ? ( <div className='spinner-border'></div>) : (       
                <div>
                <h2>Pizza törlése</h2>
                <div className='card p-3'>
                    <div className='card-body'>
                    <h4>{pizza.brand}</h4>
                    <h5 className='card-title'>{pizza.name}</h5>
                    <p>Gluténmentes: {pizza.isGlutenFree?"Igen":"Nem"}</p>
                        <img className='img-fluid rounded'
                        style={{ maxHeight: "500px" }}
                        alt = "hiányzik a képed innen!"
                        src={pizza.imageURL ? pizza.imageURL : "https://via.placeholder.com/400x800"}
                        /></div>
                        <form onSubmit={async (e) => {
                            try{
                            e.preventDefault();
                            await fetch(`https://pizza.kando-dev.eu/Pizza/${id}`, {
                                method: "DELETE",
                                
                            });
                            navigate("/");}
                        catch(error) {
                            console.log(error);
                        };
                        }}>
                        <div>
                            <NavLink  to={"/"}>
                                <button className="bi bi-backspace btn btn-warning rounded">Mégsem</button>
                            </NavLink>
                            <button className="bi bi-trash3 btn btn-danger rounded">Törlés</button>
                        </div>
                        </form>
                    </div>
                </div>
            )} </div>
    );
}