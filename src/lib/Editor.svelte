<script lang="ts">
  import type { BlockDefinition, BlockInstance, BlockLocalizationPart, BlockStack } from './types';
  import { yeet } from './utils';

  export let definitions: BlockDefinition[];
  export let stack: BlockStack;

  interface ResolvedBlock {
    type: BlockDefinition['type'];
    uuid: string;
    parts: Array<BlockLocalizationPart | BlockStack | BlockInstance>;
  }

  function resolveBlock(instance: BlockInstance): ResolvedBlock {
    const prototype =
      definitions.find((d) => d.uuid === instance.prototype) ?? yeet(TypeError, 'Unknown block');

    const loc = prototype.defaultLocalization;
    const parts = loc.parts.map((p) => {
        if (p.type === "connection") {
            const childBlock = instance.connections[p.name];
            if (childBlock) return childBlock;
        }

        return p;
    });

    const { type, uuid } = prototype;
    return { type, uuid, parts };
  }

  $: resolvedStack = stack.map(resolveBlock);
</script>

{#each resolvedStack as { type, parts }}
    <div class={"block-" + type}>
        {#each parts as part}
            {#if Array.isArray(part)}
                <svelte:self {definitions} stack={part} />
            {:else if 'connections' in part}
                <svelte:self {definitions} stack={[part]} />
            {:else if part.type === "text"}
                <span>{part.content}</span>
            {:else if part.type === "icon"}
                <span>😏</span>
            {:else if part.type === "connection"}
                <input placeholder={part.defaultValue} />
            {:else if part.type === "line-break"}
                <br />
            {/if}
        {/each}
    </div>
{/each}
