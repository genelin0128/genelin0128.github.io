<template>
  <div>
    <h1>{{ fuelType }}歷史價格</h1>
    <div class="content">
      <div class="form-container">
        <form @submit.prevent="handleSubmit">
          <label for="priceDate">{{ fuelType }}調價日期</label>
          <input type="date" id="priceDate" v-model="formData.priceDate" required class="input-field">
          <label for="price">{{ fuelType }}價格</label>
          <input type="text" id="price" v-model="formData.price" required pattern="[0-9]*\.?[0-9]*" class="input-field">
          <button type="submit">提交</button>
        </form>

        <div v-if="submittedData.length > 0" class="message">
          <p>已調整價格！</p>
        </div>

        <table v-if="submittedData.length > 0">
          <thead>
          <tr>
            <th>調價日期</th>
            <th>價格</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in sortedSubmittedData" :key="item.priceDate">
            <td>{{ item.priceDate }}</td>
            <td>{{ item.price }}</td>
          </tr>
          </tbody>
        </table>
      </div>

      <div class="chart-container">
        <canvas :id="chartId" ref="chartCanvas"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        priceDate: '',
        price: ''
      },
      submittedData: [],
      chart: null
    };
  },
  props: {
    fuelType: {
      type: String,
      default: '92 無鉛汽油'
    },
    chartId: {
      type: String,
      default: 'priceChart'
    }
  },
  computed: {
    sortedSubmittedData() {
      return this.submittedData.slice().sort((a, b) => new Date(a.priceDate) - new Date(b.priceDate));
    }
  },
  methods: {
    handleSubmit() {
      this.submittedData.push({ ...this.formData });
      this.formData = {
        priceDate: '',
        price: ''
      };

      this.updateChart();
    },
    updateChart() {
      const labels = this.sortedSubmittedData.map(item => item.priceDate);
      const datasets = [
        {
          label: this.fuelType,
          data: this.sortedSubmittedData.map(item => item.price),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4,
          fill: false
        }
      ];

      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart(this.$refs.chartCanvas.getContext('2d'), {
        type: 'line',
        data: {
          labels: labels,
          datasets: datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  },
  mounted() {
    const chartJSScript = document.createElement('script');
    chartJSScript.src = 'https://cdn.jsdelivr.net/npm/chart.js';
    chartJSScript.onload = () => {
      this.updateChart();
    };
    document.head.appendChild(chartJSScript);
  }
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f4f4f4;
  color: #333;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
  color: #555;
}

.content {
  display: flex;
  justify-content: space-between;
  max-width: 900px;
  margin: 0 auto;
}

.form-container {
  width: 400px;
  margin-right: 40px;
}

form {
  margin-bottom: 30px;
}

label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
}

input[type="text"],
select,
button {
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

button[type="submit"] {
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button[type="submit"]:hover {
  background-color: #45a049;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 30px;
  background-color: #fff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

.message {
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 4px;
  font-size: 16px;
  background-color: #eaf2ff;
  border: 1px solid #c2dafc;
}

.chart-container {
  width: 100%;
  max-width: 600px;
  height: 400px;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}
</style>
