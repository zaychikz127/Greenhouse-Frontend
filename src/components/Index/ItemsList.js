import React from 'react';

const ItemsList = ({ data }) => {
    return (
        <div className="items-list">
            {data.map((item, index) => (
                <div key={index} className="item-container">
                    <h3>{item.title}</h3>
                    {item.image_blob ? (
                        <img
                            src={item.image_blob}
                            alt={item.title}
                            className="item-image"
                        />
                    ) : (
                        <p>No image available</p>
                    )}
                    <p>{item.description}</p>
                </div>
            ))}
        </div>
    );
};

export default ItemsList;
