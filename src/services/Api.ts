export class ApiService {
    static getTickers(): Promise<any> {
        console.log("Send request to poloniex");

        return fetch("https://poloniex.com/public?command=returnTicker")
            .then((response) => response.json())
            .catch((error) => {throw Error(error.message)});
    }
}