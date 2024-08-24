import { envs } from './config';
import { AppRoutes, Server } from './presentation';

// IIFE
(() => {
    main();
})();

{
    /*
    The advatnage of calling main in an immediately invoked Function
    is that now I can await my database to connect, for example.
*/
}
async function main() {
    new Server({
        port: envs.PORT,
    }).start();
}
