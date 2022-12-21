export class HttpService {

    get(url) {
        return fetch(url).then(res => res.json())
    }

    _loadHeader() {
        return {
            'Content-type': 'application/json',
            'Accept': '*/*'
        };
    }

}