<template>
  <base-card>
    <h2>Zoek je coach</h2>
    <span class="filter-option">
      <input
        type="checkbox"
        name="frontend"
        id="frontend"
        checked
        @change="setFilter"
      />
      <label for="frontend">Frontend</label>

      <input
        type="checkbox"
        name="backend"
        id="backend"
        checked
        @change="setFilter"
      />
      <label for="backend">Backend</label>

      <input
        type="checkbox"
        name="carrière"
        id="carrière"
        checked
        @change="setFilter"
      />
      <label for="carrière">Carrière</label>
    </span>
  </base-card>
</template>

<script>
export default {
  emits: ["change-filter"],

  data() {
    return {
      filters: {
        frontend: true,
        backend: true,
        carrière: true,
      },
    };
  },

  methods: {
    setFilter(event) {
      const inputId = event.target.id;
      const isActive = event.target.checked;
      const updatedFilters = { ...this.filters, [inputId]: isActive };
      this.filters = updatedFilters;

      console.log(updatedFilters);
      this.$emit("change-filter", updatedFilters);
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
