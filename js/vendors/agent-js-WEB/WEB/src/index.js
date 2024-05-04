//  NFT
import {
    createActor as createActor_NFT_MININGMAZE,
} from "../declarations/NFT_MiningMaze";
//  PMW Token
import {
    createActor as createActor_PMW_index,
} from "../declarations/PMW_index";
import {
    createActor as createActor_PMW_ledger,
} from "../declarations/PMW_ledger";

import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";
import { Principal } from '@dfinity/principal';

let principal_user;

let actor_NFT_MM;
let actor_PMW_ledger;
let actor_PMW_index;

/*
async function initializeActor() {
    try {
        
        let authClient = await AuthClient.create();
        // start the login process and wait for it to finish
        await new Promise((resolve, reject) => {
            authClient.login({
                identityProvider: "https://identity.ic0.app/#authorize",
                maxTimeToLive: days * hours * nanoseconds,
                onSuccess: resolve,
                onError: reject,
            });
        });

        const identity = authClient.getIdentity();
        principal = await identity.getPrincipal();
        const agent = new HttpAgent({ identity });
        actor_NFT_MM = createActor_NFT_MININGMAZE(process.env.CANISTER_ID_NFT_MININGMAZE, {
            agent,
        });
        /*
        actor_PMW_index = createActor_PMW_index(process.env.CANISTER_ID_NFT_MININGMAZE, {
            agent,
        });
        actor_PMW_ledger = createActor_PMW_ledger(process.env.CANISTER_ID_NFT_MININGMAZE, {
            agent,
        });
        
    } catch (error) {
        console.error('Login error:', error);
    }
}
*/
const init = async () => {
    const authClient = await AuthClient.create();
    if (await authClient.isAuthenticated()) {
        console.log('Logged in');
        await handleAuthenticated(authClient);
    } else {
    console.log('Not logged in');

    const days = BigInt(1);
    const hours = BigInt(24);
    const nanoseconds = BigInt(3600000000000);
  
    (async () => {
        await authClient.login({
            onSuccess: async () => {
                await handleAuthenticated(authClient);
            },
            identityProvider: "https://identity.ic0.app/#authorize",
            // Maximum authorization expiration is 8 days
            maxTimeToLive: days * hours * nanoseconds,
        });
    })();
    }
  };
  
  async function handleAuthenticated(authClient) {
    const identity = await authClient.getIdentity();
    principal_user = await identity.getPrincipal();
 //   console.log(identity);
    const agent = new HttpAgent({ identity, host: "https://icp-api.io" });

    actor_NFT_MM = createActor_NFT_MININGMAZE(process.env.CANISTER_ID_NFT_MININGMAZE, {
        agent,
    });
    
    actor_PMW_index = createActor_PMW_index(process.env.CANISTER_ID_PMW_INDEX, {
        agent,
    });
    actor_PMW_ledger = createActor_PMW_ledger(process.env.CANISTER_ID_PMW_LEDGER, {
        agent,
    });
    
  }


async function NFT_balance(principal) {
    try {
    //    const principal = Principal.fromText(principalID);
        var balance = await actor_NFT_MM.balanceOfDip721(principal);
        console.log("NFT_MM list: " + balance);
    } catch (error) {
        console.error('Error getting balance:', error);
    }
}

async function PMW_balance(principal) {
    try {
        const Account = {
            'owner' : principal,
            'subaccount' : [],
        };

        var balance = await actor_PMW_index.icrc1_balance_of(Account);
        console.log("PMW balance: " + balance);
    } catch (error) {
        console.error('Error getting balance:', error);
    }
}
/*
async function NFT_balance(principalID) {
    try {
    //    const principal = Principal.fromText(principalID);
        var balance = await actor_NFT_MM.balanceOfDip721(principalID);
        console.log(balance);
    } catch (error) {
        console.error('Error getting balance:', error);
    }
}

async function NFT_balance(principalID) {
    try {
    //    const principal = Principal.fromText(principalID);
        var balance = await actor_NFT_MM.balanceOfDip721(principalID);
        console.log(balance);
    } catch (error) {
        console.error('Error getting balance:', error);
    }
}
*/
document.addEventListener("DOMContentLoaded", async function() {
    const currentUrl = window.location.href;
    await init();

    if (currentUrl.includes('/NFT/MM/balance')) {
        const balances = NFT_balance(principal_user);
        console.log(balances);

    } else if (currentUrl.includes('/NFT/Mint')) {
        
    } else if (currentUrl.includes('/PMW/balance')) {
        const balances = PMW_balance(principal_user);
        console.log(balances);

    } else if (currentUrl.includes('/PMW/transfer')) {
 
    }
    
});