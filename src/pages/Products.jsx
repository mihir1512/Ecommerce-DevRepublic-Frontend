import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import MuiContainer from '../components/Container'
import MuiCard from '../components/Card'
import axios from 'axios'

function Products() {

    const [products, setProducts] = useState([])
    const [cartProducts, setCartProducts] = useState([])

    const loadProducts = async () => {
        const products = await axios.get('http://localhost:5000/products/')
        return products.data
    }

    const loadCartProducts = async () => {
        const cartProducts = await axios.get('http://localhost:5000/purchase-history/customer/history', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        return cartProducts.data?.products
    }

    useEffect(() => {
        loadProducts().then(data => setProducts(data))
        loadCartProducts().then(data => setCartProducts(data))
    }, [])

    return (
        <>
            <MuiContainer >
                {
                    products.map((item) => (
                        <MuiCard key={item._id} name={item.name} price={item.price} category={item.category} quantityInCart={cartProducts.find(pr => pr.productId === item._id)?.quantity} />
                    ))
                }
            </MuiContainer>
        </>
    )
}

export default Products