import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function PizzaModPage() {
    const param = useParams();
    const navigate = useNavigate();
    const id = param.pizzaid;
    const [, setPizza] = useState([]);
    const [modname, setModname] = useState("");
    const [modgluten, setModGluten] = useState("");
    const [modimageurl, setModimageurl] = useState("");

    useEffect(() => {

        (async () => {
            try {
            const res = await fetch(`https://pizza.kando-dev.eu/Pizza/${id}`);
            const pizzaData = await res.json();
            setPizza(pizzaData);
            setModname(pizzaData.name);
            setModGluten(pizzaData.isGlutenFree);
            setModimageurl(pizzaData.imageURL);
        } catch (error) {
            console.log(error);   
        } 
    })();
}, [id, modname, modgluten, modimageurl]);

const modName = (e) => {
    setModname(e.target.value);
}

const modGluten = (e) => {
    setModGluten(e.target.value);  
}
const modimageUrl = (e) => {
    setModimageurl(e.target.value);
}
return(
    <div className='p-5 content bg-lavender text-center'>
        <h2>Pizza módosítás</h2>
        <form
        onSubmit={(e) => {
            e.preventDefault();
            fetch(`https://pizza.kando-dev.eu/Pizza/${id}`, {
                method: "PUT",
                body: JSON.stringify({
                    name: e.target.elements.name.value,
                    quantity: e.target.elements.quantity.value,
                    imageURL: e.target.elements.imageURL.value,
                }),
            })
            .then(() => {
                navigate("/");
            })
            .catch(console.log);
        }}
            >
            <div className='form-group row pb-3'>
            <div><label htmlFor="name" className='col-sm-3 col-form-label'> Név: </label>
                        <input type="text" id="name" name="name" className="form-control" defaultValue={modname} onChange={modName} autoComplete="off"/>
                    </div>
            </div>

            <div className='form-group row pb-3'>
            <div><label htmlFor="quantity" className='col-sm-3 col-form-label'> Gluténmentes: </label>   
                        <input type="number" id="quantity" name="quantity" className="form-control" defaultValue={modgluten} onChange={modGluten} autoComplete="off" />
                    </div>
            </div>
            <div className='form-group row pb-3'>
            <div><label htmlFor="imageURL" className='col-sm-3 col-form-label'> Kép URL: </label>   
                        <input type="text" id="imageURL" name="imageURL" className="form-control" defaultValue={modimageurl} onChange={modimageUrl} autoComplete="off" />
                    </div>
            </div>
            <button type="submit" className='btn btn-success'>Küldés</button>
            </form>
        
    </div>
);
}