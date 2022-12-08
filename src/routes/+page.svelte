<script lang="ts">
  import Editor from '$lib/Editor.svelte';
  import * as blockDefinitions from "$lib/blocks";
  import type { BlockStack } from '$lib/types';

  const definitions = Object.values(blockDefinitions);

  const stack: BlockStack = [
    { prototype: "com.github.m93a.automatik.customerName", connections: {} }
  ];
</script>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<Editor {definitions} {stack} />
