<template>
  <div>
    <FuelPriceCard fuelType="92 無鉛汽油" chartId="priceChart1" />
    <br>
    <hr>
    <br>
    <FuelPriceCard fuelType="95 無鉛汽油" chartId="priceChart2" />
    <br>
    <hr>
    <br>
    <FuelPriceCard fuelType="98 無鉛汽油" chartId="priceChart3" />
    <br>
    <hr>
    <br>
    <FuelPriceCard fuelType="超級/高級柴油" chartId="priceChart4" />
  </div>
</template>

<script>
import FuelPriceCard from './components/FuelPriceCard.vue';

export default {
  components: {
    FuelPriceCard
  }
};
</script>

<style scoped>
</style>
