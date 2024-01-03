import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export function PizzaModPage() {
    const param = useParams();
    const navigate = useNavigate();
    const id = param.hangszerId;
    const [, setInstrument] = useState([]);
    const [modname, setModname] = useState("");
    const [modprice, setModprice] = useState("");
    const [modbrand, setModbrand] = useState("");
    const [modquantity, setModquantity] = useState("");
    const [modimageurl, setModimageurl] = useState("");

    useEffect(() => {

        (async () => {
            try {
            const res = await fetch(`https://kodbazis.hu/api/instruments/${id}`, { credentials: "include" });
            const instrumentData = await res.json();
            setInstrument(instrumentData);
            setModname(instrumentData.name);
            setModprice(instrumentData.price);
            setModbrand(instrumentData.brand);
            setModquantity(instrumentData.quantity);
            setModimageurl(instrumentData.imageURL);
        } catch (error) {
            console.log(error);   
        } 
    })();
}, [id, modname, modprice, modbrand, modquantity, modimageurl]);

const modName = (e) => {
    setModname(e.target.value);
}
const modPrice = (e) => {
    setModprice(e.target.value);
}
const modBrand = (e) => {
    setModbrand(e.target.value);
}
const modQuantity = (e) => {
    setModquantity(e.target.value);  
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
            fetch(`https://kodbazis.hu/api/instruments/${id}`, {
                method: "PUT",
                credentials: "include",
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
            <div><label htmlFor="quantity" className='col-sm-3 col-form-label'> Darabszám: </label>   
                        <input type="number" id="quantity" name="quantity" className="form-control" defaultValue={modquantity} onChange={modQuantity} autoComplete="off" />
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