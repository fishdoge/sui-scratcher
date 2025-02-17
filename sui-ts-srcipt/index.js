import { requestSuiFromFaucetV0, getFaucetHost } from '@mysten/sui/faucet';
// get tokens from the Devnet faucet server

await requestSuiFromFaucetV0({
// connect to Devnet
    host: getFaucetHost('devnet'),
    recipient: '0xa709cba04a7db40b15a6d690d0831dcf45989ae864f4e6ee43cc8b43acb0603b',
});

console.log('test')