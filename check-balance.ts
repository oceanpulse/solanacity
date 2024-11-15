
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import {resolve} from "@bonfida/spl-name-service"; //for the .sol domain to public keys



// functio to resolve the .sol domain to its associated public key (address)
async function getPublicKeyFromDomain(domain: string, connection: Connection): Promise<PublicKey> {
  try {
    // using Bonfida's resolve function to get the public key assoociated with the domain
    const publicKey = await resolve(connection, domain);
    return publicKey; //returns the resolved public key
  } catch (error) {
    // throws error if the resoloution fails.
    throw new Error(`Failed to resolve domain ${domain}: ${error.message}`);
  }
}


// the mian function that checks the balance of the provided public key or .sol domain
async function main() {
  //get the domain or public key via command line argument
  const suppliedDomainOrPublicKey = process.argv[2];
  if(!suppliedDomainOrPublicKey) {
    throw new Error("provide a public key or doamin to check the balance of!");
  }

  // creates the connection to Solana Mainnet with a confirmed commitment level
const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
 
let publicKey: PublicKey | undefined // variable to store the public key (resolved or supplied)

try {
  if (suppliedDomainOrPublicKey.endsWith(".sol")) {
    publicKey = await getPublicKeyFromDomain(suppliedDomainOrPublicKey, connection);
  }
} catch (error) {
  console.error(`Invalid address or domain: ${error.message}`);
  return;
}

if(!publicKey) {
  console.error("Public key could not be resolved");
  return;
}


try {
  const balanceInLamports = await connection.getBalance(publicKey);
  const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
  console.log(`Finished. The balance for the wallet at address ${publicKey} is ${balanceInSOL} SOL!`);
} catch (error) {
  console.error(`failed to retrieve balance ${error.message}`);
}


}



main().catch(console.error);

