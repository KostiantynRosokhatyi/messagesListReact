import React, {useEffect, useState} from 'react';
import styles from './appStyles.module.css'
import UserMessagesList from './components/userMessage/UserMessagesList'

function App() {
    const [inputSearchValue, setInputSearchValue] = useState('');
    const [data, setData] = useState([]);
    const [dataFilter, setDataFilter] = useState([]);

    const [counter, setCounter] = useState(0);

    const getData = () => {
        fetch('/messages.json'
            , {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                console.log(response)
                return response.json();
            })
            .then(function (myJson) {
                console.log(myJson);
                setCounter(myJson.length);
                setData(myJson);
                setDataFilter(myJson);
            });
    }
    useEffect(() => {
        getData()
    }, [])

    const cancelClick = () => {
        setInputSearchValue('');
        getData();

    }

    const sortedDataDate = [...data].sort((a, b) => new Date(...a.date.split('.').reverse()) - new Date(...b.date.split('.').reverse()) ||
        new Date(...a.time.split('.').reverse()) - new Date(...b.time.split('.').reverse()));

    const sortedData = sortedDataDate.sort((a, b) => a.status === b.status ? 0 : a.status ? -1 : 1);

    const handleChange = (event) => {
        setInputSearchValue(event.target.value);
    }

    const handleChangeFilter = () => {
        console.log("Filter the data");
        const filteredData = dataFilter.filter(phone => {
            return phone.phone.indexOf(inputSearchValue) !== -1;
        })
        setData(filteredData);
        setCounter(filteredData.length);
    }
    const setBg = (status, id) => {
        if (!document.getElementById(id)) {
        } else {
            (status === "true") ? document.getElementById(id).style.backgroundColor = "#f7f9ff" :
                document.getElementById(id).style.backgroundColor = "white";
        }
    }
    const changeBgMessage = (id, status) => {
        if (status === "true") {
            document.getElementById(id).style.backgroundColor = "white"
        }
    }

    return (
        <div>
            <UserMessagesList data={sortedData}
                              handleChangeFilter={handleChangeFilter}
                              handleChange={handleChange}
                              getDataRefresh={getData}
                              filter={inputSearchValue}
                              setBg={setBg}
                              changeBgMessage={changeBgMessage}
                              cancelClick={cancelClick}
                              counter={counter}
            />
        </div>
    );
}

export default App;
