# token_example
https://www.anchor-lang.com/docs/tokens/basics/mint-tokens

Test (works!)

```sh
$ anchor test --program-name token-example 
```

Run test validator 

```sh
$ solana-test-validator
```

Run test client.js 

```sh
$ anchor build
$ anchor deploy

$ ANCHOR_PROVIDER_URL=http://localhost:8899 ANCHOR_WALLET=~/.config/solana/id.json ANCHOR_PROVIDER_URL=http://127.0.0.1:8899 node tests/client.js
```

Run again client.js and see the problem: Provided owner is not allowed
