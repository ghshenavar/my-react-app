import React from 'react';
import './components.css';

function priceString(price) {
    let s = "";
    while (price > 0) {
        for (let i = 0; i < 3 && price > 0; i++) {
            s = price % 10 + s;
            price = Math.floor(price / 10);
        }
        if (price > 0)
            s = "," + s;
    }
    s += " ریال";
    return s;
};

function addStrings(addon, original) {
    return addon + original;
};

function ProductTile({ product, buttonFunction, showDetail }) {
    return (
        <div className="card">
            <div className="card-image">
                <figure className="image is-4by3">
                    <img src={product.images.main.url[0]} alt="new"></img>
                </figure>
            </div>
            <div className="card-content">
                <p className="title product-title">{product["title_fa"]}</p>

                <div class="content">
                    {priceString(product.default_variant.price.selling_price)}
                        <br></br>
                </div>
                <button className="button is-primary" onClick={(x) => { showDetail(product); buttonFunction() }}>
                    جزییات بیشتر
                </button>
            </div>
        </div>
    )
};

function ProductCatalog({ products, buttonFunction, showDetail }) {
    let tiles = [];

    for (let i = 0; i < products.length; i++) {
        const current_item = products[i];
        tiles.push(<ProductTile product={current_item} buttonFunction={buttonFunction} showDetail={showDetail} />);
        }
    return (<div className="product-catalog"> {tiles} </div>);
};

function Popup({ data, handleClose }) {
    return (
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={handleClose}>x</span>
                {data != null && <DetailPage product={data} />}
            </div>
        </div>
    );
};

function DetailPage({ product }) {
    return (
        <div className="row">
            <div className="column">
                <div className="detail-image">
                    <img className="ImageManage" src={product.data.product.images.main.url[0]} alt="new"></img>
                </div>
            </div>
            <div className="column">
                <p className="title product-title">{product.data.product["title_fa"]}</p>
                <div className="content">
                    {priceString(product.data.product.default_variant.price.selling_price)}
                    <br></br>
                </div>
                <p className="desc">{addStrings("برند: ", product.data.product.brand.title_fa)}</p>
                <p className="desc">{addStrings("درصد رضایتمندی: ", product.data.product.rating.rate)}</p>
            </div>
        </div>
    );
};

export { ProductCatalog, Popup, DetailPage };