import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from './Card';

const Countries = () => {
    const [data, seteData] = useState([]);
    const [sortedData, setSortedData] = useState([])
    const [playonce, setPlayonce] = useState(true)
    const [rangeValue, setrangeValue] = useState(50)
    const [selectedRadio, setSelectedRadio] = useState('')
    const radios = ["Africa", "America", "Asia", "Europa", "Oceania"]

    useEffect(() => {
        if (playonce) {
            axios.get('https://restcountries.eu/rest/v2/all?fields=name;population;region;capital;flag')
                .then((res) => {
                    seteData(res.data)
                    setPlayonce(false)
                })
        }


        // transformtion en objet
        const sortedCountry = () => {
            const countryObj = Object.keys(data).map((i) => data[i]);
            const sortedArray = countryObj.sort((a, b) => {
                // trie decroissant
                return b.population - a.population
            });
            sortedArray.length = rangeValue;
            setSortedData(sortedArray)

        }
        sortedCountry();

    }, [data, rangeValue, playonce])



    // les props 
    return (<div className="countries">
        <div className="sort-container">
            <input type="range" min="1" max="250" value={rangeValue} onChange={(e) => setrangeValue(e.target.value)} />
            <ul>
                {radios.map((radio) => {
                    return (
                        <li key={radio}>
                            <input type="radio" value={radio} id={radio} checked={radio === selectedRadio} onChange={(e) => setSelectedRadio(e.target.value)} />
                            <label htmlFor={radio}>{radio}</label>
                        </li>
                    );
                })}
            </ul>
        </div>
        <div>
            <div className="cancel">
                {selectedRadio && <h5 onClick={() => setSelectedRadio("")}>Annuler Recherche</h5>}
            </div>

        </div>
        <ul className="countries-list">
            {sortedData
                .filter((country) => country.region.includes(selectedRadio))
                .map((country) => (
                    <Card country={country} key={country.name} />
                ))}
        </ul>
    </div>
    )

};

export default Countries;