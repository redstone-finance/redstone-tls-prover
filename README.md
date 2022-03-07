# redstone-tls-prover

This is a proof of concept for a tool that can be used to prove the response from HTTPS request.

## Interface

TODO: improve interface a bit later :)
- tls proof may include eveyrhing expect for full nonce
- verification result may return:
  - https response
  - nonce hash
  - isVerified (true or false)
  - requestTime ({ notEarlierThan: timestamp, notLaterThan: timestamp })

```js
const {
  sendRequest,
  verify,
  storeProofOnArweave,
  verifyWithArweave,
} = require("redstone-tls-prover");

(async () => {
  // Sending request
  const nonce = await getLatestBlockHashFromSomeBlockchain(); // adding nonce to https request will prove that request was not made earlier than the block hash creation time
  const url = "https://www.google.com/search?q=42";
  const { response, tlsProof } = await sendRequest(url, nonce);

  // Keeping proof on arweave
  const txId = await storeProofOnArweave(tlsProof); // Storing proof on arweave will prove that the request was not made later than the corresponding Arweave block creation time

  // Proof verification
  const verificationResult = await verify({ response, tlsProof, nonce });
  console.log(verificationResult); // true or false

  // or proof verification through Arweave
  const verificationResult = await verifyWithArweave({ response, txId });
  console.log(verificationResult); // true or false
})();
```
