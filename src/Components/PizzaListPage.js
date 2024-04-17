import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

export function PizzaListPage() {
    const [pizzas, setPizzas] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect(() => {
        setFetchPending(true);
        fetch("https://pizza.kando-dev.eu/Pizza")
            .then((res) => res.json())
            .then((pizzak) => setPizzas(pizzak))
            .catch(console.log)
            .finally(() => {
                setFetchPending(false);
            });
    }, []);

    return (
        <div className="p-5 m-auto text-center content bg-ivory">
            {isFetchPending ? (
                <div className="spinner-border" role="progressbar" aria-label="Loading"></div>
            ) : (
                <div>
                    <h2>Pizzák</h2>
                    {pizzas.map((pizza) => (
                        <div className="card col-sm-3 d-inline-block m-1 p-2" key={pizza.id}>
                            <p className="text-dark">{pizza.name}</p>
                            <p className="text-danger">Gluténmentes: {pizza.isGlutenFree ? "igen" : "nem"}</p>
                            <div className="card-body">
                                <NavLink to={"/pizza/" + pizza.id}>
                                    <img
                                        alt={pizza.name}
                                        className="img-fluid"
                                        style={{ maxHeight: 200 }}
                                        src={pizza.kepURL || "https://via.placeholder.com/400x800"}
                                    />
                                </NavLink>
                                <br />
                                <NavLink role='mod-pizza-link' to={"/mod-pizza/" + pizza.id}>Módosít</NavLink> <br></br>
                                <NavLink role='del-pizza-link' to={"/del-pizza/" + pizza.id}>Törlés</NavLink>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default PizzaListPage;
