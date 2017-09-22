let apiHost;

if (process.env.NODE_ENV === 'development') {
    apiHost = "http://localhost:3000";
}
else {
    apiHost = "https://seekerdnasecure.co.za:3002";
}
export const API_ROOT = apiHost;
