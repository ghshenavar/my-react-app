import React from 'react';
import './App.css';
import { ProductCatalog, Popup, DetailPage } from './components/components.js'
import { useState } from 'react';
import { getItems, getPDP } from './api/api.js'

function App() {
    const [items, setItems] = useState([]);
    const [reRender, setReRender] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [detail, setDetail] = useState(null);
    const [pageno, setPageno] = useState(2);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    React.useEffect(() => {
        getItems(1, callBack);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pageno]);

    function handleScroll() {
        if (window.innerHeight + document.documentElement.scrollTop < 999 * (document.documentElement.offsetHeight / 1000)) return;
        console.log("reached");
        setPageno(pageno + 1);
        getItems(pageno, callBack);
    }


    function callBack(data) {
        console.log(data.data.products);
        data.data.products.forEach(addProduct);
    }

    function addProduct(datum) {
        items.push(datum);
        setItems(items);
        setReRender(reRender + 1);
    }

    function showDetail(product) {
        function callBackShow(data) {
            console.log(data);
            setDetail(data);
        }
        getPDP(product.id, callBackShow);
    }

    return (
        <>
            <ProductCatalog key={reRender} products={items} buttonFunction={togglePopup} showDetail={showDetail} />
            {isOpen && <Popup
                data={detail}
                handleClose={togglePopup}
            />}
        </>);
}

export default App;
