<script lang="ts">
  export let defaultValue: any = '';
</script>

<div class="block string-literal-block" contenteditable={true}>
  {defaultValue}
</div>

<style lang="scss">
  div {
    display: inline-block;

    min-height: 1em;
    min-width: 5em;
    padding: 5px;
    margin: 5px;

    border-radius: 999px;
    border: 1px solid hsl(0, 0%, 25%);
  }
</style>
