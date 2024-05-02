import { Actor, HttpAgent } from '@dfinity/agent';

async function interactWithCanister() {
  const agent = new HttpAgent();
  const actor = Actor.createActor(idlFactory, { agent, canisterId });

  const result = await actor.someMethod();
  console.log(result);
}

interactWithCanister().catch(console.error);