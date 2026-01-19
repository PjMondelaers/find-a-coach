<template>
  <div>
    <base-dialog
      :show="!!error"
      title="Er is een fout opgetreden!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilters"></coach-filter>
    </section>

    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)"
            >Vernieuwen</base-button
          >
          <base-button v-if="!isCoach && !isLoading" to="/register" link
            >Registreer als Coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          ></coach-item>
        </ul>
        <h3 v-else>Geen coaches gevonden</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
import CoachFilter from "@/components/coaches/CoachFilter.vue";
import CoachItem from "../../components/coaches/CoachItem.vue";

export default {
  components: {
    CoachItem,
    CoachFilter,
  },

  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        carrière: true,
      },
    };
  },

  computed: {
    filteredCoaches() {
      const coaches = this.$store.getters["coaches/coaches"];
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes("frontend")) {
          return true;
        }

        if (this.activeFilters.backend && coach.areas.includes("backend")) {
          return true;
        }

        if (this.activeFilters.carrière && coach.areas.includes("carrière")) {
          return true;
        }

        return false;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters["coaches/hasCoaches"];
    },
    isCoach() {
      return this.$store.getters["coaches/isCoach"];
    },
  },

  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("coaches/loadCoaches", {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || "Er is iets misgelopen!";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },

  created() {
    this.loadCoaches();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
