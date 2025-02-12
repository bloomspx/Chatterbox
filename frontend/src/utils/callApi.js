export default async function callApi(type, values) {
    let response;
    let data;

    console.log(values)

    if (type === "text-analysis") {
        data = await fetch(`http://localhost:5000/text-analysis`,{
            method:'POST',
            mode: 'cors',
            headers : {'Content-Type':'application/json'},
            body:JSON.stringify(values)})
        .then((res)=> res.json())
        .then(response => {
            return response})
        .catch(error => new Error(error));
    }

    else if (type === "fetch-results") {
        data = await fetch(`http://localhost:5000/fetch-results`,{
            method:'POST',
            mode: 'cors',
            headers : {'Content-Type':'application/json'},
            body:JSON.stringify(values)})
        .then((res)=> res.json())
        .then(response => {
            return response})
        .catch(error => new Error(error));
    }

    else if (type === "speech2text") { 
        data = await fetch(`http://localhost:5000/speech-to-text`,{
            method:'POST',
            mode: 'cors',
            headers : {'Content-Type':'application/json'},
            body:JSON.stringify(values)})
        .then((res)=> res.json())
        .then(response => {
            return response})
        .catch(error => {
            return null
        });
    }
    
    // else if (type === "save_results") {
    //     data = await fetch(`http://localhost:5000/save-results`,{
    //         method:'POST',
    //         mode: 'cors',
    //         headers : {'Content-Type':'application/json'},
    //         body:JSON.stringify(values)})
    //     .then((res)=> res.json())
    //     .then(response => {
    //         return response})
    //     .catch(error => new Error(error));
    // }
    
    console.log(data)

    return data
}