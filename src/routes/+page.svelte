<script lang="ts">
  import Block from '$lib/Block.svelte';
  import { customerEmail, customerName, CUSTOMER_EMAIL, CUSTOMER_NAME, IF, if_, sendMail, SEND_MAIL } from '$lib/blocks';
  import type { BlockStack } from '$lib/types';

  const definitions = [if_, customerEmail, customerName, sendMail ];

  const stack: BlockStack = [
    { prototype: IF, connections: {
        then: [
            { prototype: SEND_MAIL, connections: {
                subject: { prototype: CUSTOMER_NAME, connections: {} },
                address: { prototype: CUSTOMER_EMAIL, connections: {} },
            } }
        ]
    }},
];
</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<Block {definitions} {stack} />
