<script>
    export let status;
    export let type;

    import { FontAwesomeIcon } from 'fontawesome-svelte';
</script>

<td class={"statusCell " + status}>
    {#if status === 'error'}
        <FontAwesomeIcon class="statusIcon" icon={['fas', 'exclamation-circle']} title="Error" size='4x'/>
        <p>
            {#if type === 'official'}
                Status page reports major issues
            {:else}
                Many users reporting issues
            {/if}
        </p>
    {:else if status === 'warning'}
        <FontAwesomeIcon class="statusIcon" icon={['fas', 'exclamation-triangle']} title="Warning" size='3x'/>
        <p>
            {#if type === 'official'}
                Status page reports minor issues
            {:else}
                Users report minor issues
            {/if}
        </p>
    {:else}
        <FontAwesomeIcon class="statusIcon" icon={['fas', 'check']} title="All good" size='2x' />
        <p>
            {#if type === 'official'}
                Status page reports all OK
            {:else}
                No users reporting issues
            {/if}
        </p>
    {/if}
</td>

<style>
    .statusCell {
        height: 150px;

        margin: 0 auto;
        padding: 15px 30px 15px 30px;

        border-radius: 6px;
        border: 3px solid;

        font-size: 20px;
        text-align: center;
    }

    .statusIcon {
        margin: 10px;
    }

    .ok {
        border-color: #009944;
        background-color: #00994430;
    }

    .warning {
        border-color: #df7d15;
        background-color: #df7d1530;
    }

    .error {
        border-color: #cf000f;
        background-color: #cf000f30;
    }

    p {
        margin: 5px 0;
    }
</style>