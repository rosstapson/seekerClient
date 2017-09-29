let apiHost;

if (process.env.NODE_ENV === 'development') {
    apiHost = "http://localhost:3002";
    console.log("process.env.NODE_ENV is 'development'");
}
else {
    apiHost = "https://seekerdnasecure.co.za:3002";
}
export const API_ROOT = apiHost;
