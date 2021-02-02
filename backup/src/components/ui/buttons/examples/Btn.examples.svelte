<script lang="ts">
  import { random } from "faker";
  import Btn from "../Btn.svelte";

  let word = random.word();
</script>

<style lang="scss">
  h3 {
    color: white;
  }
</style>

<h3>Normal button</h3>
<Btn>{word}</Btn>

<h3>Loading button</h3>
<Btn loading>{word}</Btn>

<h3>Disabled button</h3>
<Btn disabled>{word}</Btn>
