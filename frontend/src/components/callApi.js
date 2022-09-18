export default async function callApi(type, object) {
    let response;
    let data;

    // Insert an article
    
    if (type === "textanalysis") { 

        response = await fetch(`http://localhost:5000/text-analysis`,{
            method:'POST',
            mode: 'cors',
            headers : {'Content-Type':'application/json'},
            body:JSON.stringify(object)
        })
        
        
        let requestJson = await fetch(`http://localhost:5000/save-file`,{
            method:'POST',
            mode: 'cors',
            headers : {'Content-Type':'application/json'},
            body:JSON.stringify(object)
        })

        data = await Promise.all([
            fetch("http://localhost:5000/summary"),
            fetch("http://localhost:5000/sentiment-analysis"),
            fetch("http://localhost:5000/wordcloud"),
        ])
        .then(([res1, res2, res3]) => Promise.all([res1.json(), res2.json(), res3.json()]))
        .then(([summary, sa, wordcloud]) => ({
            summary: summary,
            analysis: sa,
            wordcloud: wordcloud
        }))

        // TODO: Error Handling
    }
    data = await response.json()
    return data
}