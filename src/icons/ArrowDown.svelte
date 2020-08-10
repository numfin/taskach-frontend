<script lang="ts">
  export let size = 24;
</script>

<svg width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
  <g filter="url(#arrow_down_filter)">
    <path
      d="M6 9l6 6 6-6"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round" />
  </g>
  <defs>
    <filter
      id="arrow_down_filter"
      x="4"
      y="8"
      width="16"
      height="10"
      filterUnits="userSpaceOnUse"
      color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix" />
      <feColorMatrix
        in="SourceAlpha"
        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
      <feOffset dy="1" />
      <feGaussianBlur stdDeviation=".5" />
      <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.08 0" />
      <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
      <feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
    </filter>
  </defs>
</svg>
