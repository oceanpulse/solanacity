import "dotenv/config";
import {getKeypairFromEnvironment} from "@solana-developers/helpers";


const keypair = getKeypairFromEnvironment("SECRET_KEY");


console.log(`Successfully loaded the secret key securely using .env`);

/*
NOTE: 
NEVER SHARE YOUR SECRET KEY... EVER! 
THIS SECRET KEY IS FOR EDUCATIONAL PURPOSES ONLY AND WILL BE REMOVED LATER
*/