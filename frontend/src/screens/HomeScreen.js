import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from '../components/Product';
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

//import data from "../data";
//Testing
//nodemon --exec npm run start
export default function HomeScreen() {
  const [products, setProducts] = useState([]); //react hook => manejar el estado de los comp
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    //Definimos fetch data
    const fecthData = async () => {
      try {
        setLoading(true);                                                                                  
        const { data } = await axios.get("/api/products");
        //el arreglo del back se transfiera a "data" en el front
        setLoading(false);
        setProducts(data);
      } catch (error) {
        setError(error.mesagge);
        setLoading(false);
      }
    };
    fecthData();
  }, []); //el arreglo va a lista de dependencias
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>
      )}
    </div>
  );
}
