import axios from "axios";

/**
 * create an axios instance that can be used to make HTTP requests to the API routes.
 * By using different base URLs, the requests are routed to different locations depending on where they are made,
 * which is useful for handling authentication and authorization logic.
 * @param req
 * @returns {AxiosInstance}
 */
export default function buildClient({ req }) {
    if (typeof window === 'undefined') {
        // we are on the server!
        // requests should be made to http://ingress-nginx-controller.ingress-nginx...
        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        });
    } else {
        // we are on the browser!
        // requests can be made with a base url of ''
        return axios.create({
            baseURL: '/'
        });
    }
}