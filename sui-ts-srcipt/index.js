import { requestSuiFromFaucetV0, getFaucetHost } from '@mysten/sui/faucet';
// get tokens from the Devnet faucet server

await requestSuiFromFaucetV0({
// connect to Devnet
    host: getFaucetHost('devnet'),
    recipient: '0x3f4f4cc6c991114b6096d88d976fa8715b262462f7ef57f3754829dc7eb6ceeb',
});

console.log('test')