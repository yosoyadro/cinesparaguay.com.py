<template>
  <div
    ref="navbar"
    class="
      h-16
      fixed
      z-10
      top-0
      left-0
      right-0
      flex
      gap-4
      bg-purple-900
      rounded-b-2xl
      px-4
      items-center
      justify-between
      lg:px-10
    ">
     <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
    name: 'NavBar',
}
</script>


