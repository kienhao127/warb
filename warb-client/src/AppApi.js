// var BASE_URL = 'https://fivedesk.herokuapp.com/'
var BASE_URL = 'http://localhost:8888/'

function fetchApi(url, method, data) {
    var path = BASE_URL + url;
    // console.log(path);
    console.log(data)
    return fetch(path,
        {
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json; charset=utf-8",
            },
            method: method,
            body: JSON.stringify(data)
        }).then(response => response.json()).catch((error) => {
            console.log(error);
        });
}

export function loginApi(email, password) {
    var body = {
        email: email,
        password: password
    }
    return fetchApi('user/login', 'POST', body);
}