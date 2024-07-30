const items = [
    {
      "id": 0,
      "name": "Mike Johnsons",
      "email": "mikej@abc.com",
      "password": "mikej"
    },
    {
      "name": "Cindy Smiths",
      "email": "cinds@abc.com",
      "password": "cinds",
      "id": 1
    },
    {
      "name": "Julio Martins",
      "email": "julim@abc.com",
      "password": "julim",
      "id": 2
    }
  ]

const baseURL = 'http://localhost:4000/customers';


export async function getAll(setCustomers){
    const options = {
        method: 'GET',
        mode: 'cors'
    };

    const fetchData = async (url) => {
        try {
            const response = await fetch(url, options);
            if (!response.ok){
                throw new Error(`Error fetching data: ${response.status}`);
            }
            const data = await response.json();
            setCustomers([...data])
        } catch (error) {
            console.error(errror)
        }
    }
    fetchData(baseURL);
}

export function get(id) {
    let result = null;
    for( let item of items){
        if(item.id === id){
            result = item;
        }
    }
  return result;
}

export async function deleteById(id) {
    const options = {
        method: 'DELETE',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const deleteData = async (url) => {
        try {
            const response = await fetch(`${url}/${id}`, options);
            if (!response.ok){
                throw new Error(`Error fetching data: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(errror)
        }
    }
    await deleteData(baseURL);
    console.log(items);
}

export async function post(item) {
    const options = {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
    };

    const postData = async (url) => {
        try {
            const response = await fetch(url, options);
            if (!response.ok){
                throw new Error(`Error fetching data: ${response.status}`);
            }
            const data = await response.json();
        } catch (error) {
            console.error(errror)
        }
    }
    await postData(baseURL);
    console.log(items);
}

export async function put(id, item) {
    const options = {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
    };

    const putData = async (url) => {
        try {
            const response = await fetch(`${url}/${id}`, options);
            if (!response.ok){
                throw new Error(`Error fetching data: ${response.status}`);
            }
            const data = await response.json();
        } catch (error) {
            console.error(errror)
        }
    }
    await putData(baseURL);
}

function getArrayIndexForId(id){
  for( let i = 0; i < items.length; i++){
    if(items[i].id === id){
      return i;
    }
  }
  return -1;  
}