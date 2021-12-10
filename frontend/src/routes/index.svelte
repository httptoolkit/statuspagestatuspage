<script>
    import Header from '../components/header.svelte';
	import Service from '../components/service.svelte';

    import { library } from '@fortawesome/fontawesome-svg-core';
    import {
        faAws,
        faGithub,
        faSlack
    } from '@fortawesome/free-brands-svg-icons';
    import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

    library.add(faCheck);
    library.add(faTimes);

    library.add(faAws);
    library.add(faGithub);
    library.add(faSlack);

    const statusPromise = fetch("https://statuspagestatuspage.spsp.workers.dev")
        .then((response) => {
            if (!response.ok) throw new Error(`Unexpected ${response.status} response for status data`);
            return response.json();
        });
</script>

<main>
    <Header />

    {#await statusPromise}
        <p>Loading status data...</p>
    {:then status}
        <table>
            <Service
                icon={faAws}
                serviceName="Amazon Web Services"
                status={status.aws}
            />
            <Service
                icon={faGithub}
                serviceName="GitHub"
                status={status.github}
            />
            <Service
                icon={faSlack}
                serviceName="Slack"
                status={status.slack}
            />
        </table>
    {:catch error}
        <p>Failed to load status data: {error}</p>
    {/await}
</main>

<style>
    main {
        max-width: 1024px;
        margin: 20px auto;

        font-family: Verdana, Geneva, Tahoma, sans-serif;
    }

    table {
        width: 100%;
        border-spacing: 6px;
        margin-top: 50px;
    }
</style>