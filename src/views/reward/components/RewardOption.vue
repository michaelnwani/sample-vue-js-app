<template lang="pug">
  option(
    :value='id',
    :selected='isCurrentReward'
  ) {{ winnersDescription }}
</template>

<script>
export default {
  name: 'rewardOption',
  props: [
    'id',
    'winnersDescription',
    'isCurrentReward'
  ]
};
</script>
