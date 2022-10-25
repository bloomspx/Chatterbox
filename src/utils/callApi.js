export default async function callApi(type, values) {
    let response;
    let data;

    console.log(values)

    if (type === "text-analysis") {
        data = await fetch(`http://backend-service-myproject.192.168.42.57.nip.io/text-analysis`,{
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
        data = await fetch(`http://backend-service-myproject.192.168.42.57.nip.io/fetch-results`,{
            method:'POST',
            mode: 'cors',
            headers : {'Content-Type':'application/json'},
            body:JSON.stringify(values)})
        .then((res)=> res.json())
        .then(response => {
            return response})
        .catch(error => new Error(error));
    }
    
    // else if (type === "save_results") {
    //     data = await fetch(`http://backend-service-myproject.192.168.42.57.nip.io/save-results`,{
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