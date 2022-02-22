<script>
    export let icon;
    export let serviceName;
    export let status;

    import { FontAwesomeIcon } from 'fontawesome-svelte';
    import StatusCell from './status-cell.svelte';

    const statusCorrect = (status.official.status === 'ok' && status.detected.status === 'ok')
        || status.official.status !== 'ok';
</script>

<tr>
    <td class:bad={!statusCorrect}>
        <FontAwesomeIcon
            icon={icon}
            size='6x'
            title={serviceName}
        />
        <h3>{serviceName}</h3>
        {#if !statusCorrect}
            <p>
                Status page accuracy degraded
            </p>
        {/if}
    </td>
    <StatusCell status={status.official.status} type='official' />
    <StatusCell status={status.detected.status} type='detected' />
</tr>

<style>
    td {
        width: 30%;
        text-align: center;
        min-height: 150px;
    }

    .bad {
        color: #cf000f;
    }

    h3 {
        margin-bottom: 0;
    }

    p {
        margin-top: 5px;
    }
</style>