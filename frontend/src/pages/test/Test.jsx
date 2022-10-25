import { useEffect } from "react";
import { useState } from "react";
import { Loader } from "../../components/Loader/Loader";
import callApi from "../../utils/callApi";

const Test = () => {

    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchFileResults = async () => {
          try { 
            setLoading(true);
            let promises = await callApi("test-fetch", {})
            setResults(JSON.stringify(promises));
            setLoading(false);
          }
          catch(err) {
            setLoading(false);
          }
        };
        fetchFileResults()
      }, []);

    return (
        <div className="home-container">
            {loading && results.length === 0 && <Loader/>}
            {!loading && results.length > 0 &&  <>
                {results}
            </>}
        </div>
    )
}

export default Test