<script>
		let authClient = await AuthClient.create();

        await new Promise((resolve) => {
            authClient.login({
                identityProvider: 'https://identity.ic0.app',
                onSuccess: resolve,
            });
        });
       const identity = authClient.getIdentity();
        const agent = new HttpAgent({ identity });
/*        const actor = createActor(process.env.CANISTER_ID_II_INTEGRATION_BACKEND, {
            agent,
        });*/
</script>