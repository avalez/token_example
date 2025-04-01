/*
  ANCHOR_PROVIDER_URL=http://localhost:8899 \
  ANCHOR_WALLET=~/.config/solana/id.json \
  node tests/client.js
*/
const anchor = require("@coral-xyz/anchor");
const fs = require("fs");
const splToken = require("@solana/spl-token");
const main = async () => {
  console.log("Connecting to Solana...");
  
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.TokenExample;

  const [mint, __] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("mint")],
    program.programId,
  );

  const mintInfo = await provider.connection.getAccountInfo(mint);
  if (!mintInfo) {
    // Call the initialize function (initialize PDA account)
    let tx = await program.methods
    .createMint()
    .accounts({
      tokenProgram: splToken.TOKEN_2022_PROGRAM_ID,
    })
    .rpc({ commitment: "confirmed" });
  }

  const mintAccount = await splToken.getMint(
    program.provider.connection,
    mint,
    "confirmed",
    splToken.TOKEN_2022_PROGRAM_ID,
  );

  console.log("Mint Account", mintAccount);

  tx = await program.methods
  .mintTokens(new anchor.BN(100))
  .accounts({
    tokenProgram: splToken.TOKEN_2022_PROGRAM_ID,
  })
  .rpc({ commitment: "confirmed" });

  console.log("Your transaction signature", tx);

  const associatedTokenAccount = await splToken.getAssociatedTokenAddress(
    mint,
    program.provider.publicKey,
    false,
    splToken.TOKEN_2022_PROGRAM_ID,
  );

  const tokenAccount = await splToken.getAccount(
    program.provider.connection,
    associatedTokenAccount,
    "confirmed",
    splToken.TOKEN_2022_PROGRAM_ID,
  );

  console.log("Token Account", tokenAccount);

};

main();