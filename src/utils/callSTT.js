export default function callSTT(type, object) {

    if (type === "speech2text") { 

        let response = fetch(`http://backend-service:5000/speech-to-text`,{
            method:'POST',
            mode: 'cors',
            headers : {'Content-Type':'application/json'},
            body:JSON.stringify(object)})
        .then((res)=> res.json())
        .then(response => {
            return response})
        .catch(error => new Error(error));

        console.log("Reponse: ", response)

        return response

    }
}