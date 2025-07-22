// auth.js
var authConfig = {
    omniApi: {
        baseUrl: "https://st.omnidesk.ru",
        credentials: {
            login: "manager@yourcompany.ru",
            apiKey: "7185d42838e0b0a8ca79ad698"
        }
    }
};

function getAuthorizationHeader(serviceName) {
    var serviceCredentials = authConfig[serviceName].credentials;
    return 'Basic ' + btoa(serviceCredentials.login + ':' + serviceCredentials.apiKey);
}

