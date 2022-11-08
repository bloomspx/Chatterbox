export default async function callApi(type, values) {
    let response;
    let data;

    console.log(values)

    if (type === "text-analysis") {

        const fileData = await fetch(`http://backend-service-myproject.192.168.59.100.nip.io/extract-text`,{
            method:'POST',
            mode: 'cors',
            headers : {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(values)})
        .then((res)=> res.json())
        .then(response => {
            return response})
        .catch(error => new Error(error));

        const topicData = await fetch(`http://backend-service-myproject.192.168.59.100.nip.io/topic-modelling`,{
            method:'POST',
            mode: 'cors',
            headers : {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(fileData)})
        .then((res)=> res.json())
        .then(response => {
            return response})
        .catch(error => new Error(error));

        const sentimentData = await fetch(`http://backend-service-myproject.192.168.59.100.nip.io/sentiment-analysis`,{
            method:'POST',
            mode: 'cors',
            headers : {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(fileData)})
        .then((res)=> res.json())
        .then(response => {
            return response})
        .catch(error => new Error(error));

        // const summaryData = await fetch(`http://backend-service-myproject.192.168.59.100.nip.io/summary`,{
        //     method:'POST',
        //     mode: 'cors',
        //     headers : {
        //         'Content-Type':'application/json'
        //     },
        //     body:JSON.stringify(fileData)})
        // .then((res)=> res.json())
        // .then(response => {
        //     return response})
        // .catch(error => new Error(error));

        const wordCloudData = await fetch(`http://backend-service-myproject.192.168.59.100.nip.io/word-cloud`,{
            method:'POST',
            mode: 'cors',
            headers : {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(fileData)})
        .then((res)=> res.json())
        .then(response => {
            return response})
        .catch(error => new Error(error));

        data = {...fileData, ...topicData, ...sentimentData, ...wordCloudData}
        console.log(data)
    }

    else if (type === "fetch-results") {
        data = await fetch(`http://backend-service-myproject.192.168.59.100.nip.io/fetch-results`,{
            method:'POST',
            mode: 'cors',
            headers : {
                "Access-Control-Allow-Headers" : "Content-Type",
                // "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST,GET",
                'Content-Type':'application/json'
            },
            body:JSON.stringify(values)})
        .then((res)=> res.json())
        .then(response => {
            return response})
        .catch(error => new Error(error));
    }

    else if (type === "test-fetch") {
        data = await fetch(`http://backend-service-myproject.192.168.59.100.nip.io/test-fetch`,{
            method:'GET',
            mode: 'cors'})
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