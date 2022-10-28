export default function callSTT(type, object) {

    if (type === "speech2text") { 

        let response = fetch(`http://backend-service-myproject.192.168.42.244.nip.io/speech-to-text`,{
            method:'POST',
            mode: 'cors',
            headers : {
                "Access-Control-Allow-Headers" : "Content-Type",
                // "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST,GET",
                'Content-Type':'application/json'
            },
            body:JSON.stringify(object)})
        .then((res)=> res.json())
        .then(response => {
            return response})
        .catch(error => new Error(error));

        console.log("Reponse: ", response)

        return response

    }
}