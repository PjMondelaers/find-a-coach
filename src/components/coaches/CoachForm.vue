<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstName">Voornaam</label>
      <input
        type="text"
        name="firstName"
        id="firstName"
        v-model.trim="firstName.val"
        @blur="clearValidity('firstName')"
      />
      <p v-if="!firstName.isValid">Voornaam is verplicht.</p>
    </div>

    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastName">Naam</label>
      <input
        type="text"
        name="lastName"
        id="lastName"
        v-model.trim="lastName.val"
        @blur="clearValidity('lastName')"
      />
      <p v-if="!lastName.isValid">Naam is verplicht.</p>
    </div>

    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Omschrijving</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="description.val"
        @blur="clearValidity('description')"
      ></textarea>
    </div>
    <p v-if="!description.isValid">Omschrijving is verplicht.</p>

    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="hourlyRate">Prijs per uur</label>
      <input
        type="number"
        name="hourlyRate"
        id="hourlyRate"
        v-model.number="rate.val"
        @blur="clearValidity('rate')"
      />
      <p v-if="!rate.isValid">Prijs moet hoger zijn dan 0.</p>
    </div>

    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Ervaring</h3>
      <div>
        <input
          type="checkbox"
          name="frontend"
          value="fontend"
          id="frontend"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="frontend">Frontend ontwikkeling</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="backend"
          value="backend"
          id="backend"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="backend">Backend ontwikkeling</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="carrière"
          value="carrière"
          id="carrière"
          v-model="areas.val"
          @blur="clearValidity('areas')"
        />
        <label for="carrière">Carrière adviseur</label>
      </div>
      <p v-if="!areas.isValid">Gelieve minstens 1 keuze aan te duiden.</p>
    </div>

    <p v-if="!formIsValid">
      Validatie mislukt. Vul geldige waardes in en probeer opnieuw.
    </p>
    <base-button>Registreer</base-button>
  </form>
</template>

<script>
export default {
  emits: ["save-data"],

  data() {
    return {
      firstName: {
        val: "",
        isValid: true,
      },
      lastName: {
        val: "",
        isValid: true,
      },
      description: {
        val: "",
        isValid: true,
      },
      rate: {
        val: null,
        isValid: true,
      },
      areas: {
        val: [],
        isValid: true,
      },
      formIsValid: true,
    };
  },

  methods: {
    clearValidity(inputName) {
      this[inputName].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.firstName.val === "") {
        this.firstName.isValid = false;
        this.formIsValid = false;
      }

      if (this.lastName.val === "") {
        this.lastName.isValid = false;
        this.formIsValid = false;
      }

      if (this.description.val === "") {
        this.description.isValid = false;
        this.formIsValid = false;
      }

      if (!this.rate.val || this.rate.val < 0) {
        this.rate.isValid = false;
        this.formIsValid = false;
      }

      if (this.areas.val.length === 0) {
        this.areas.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const formData = {
        first: this.firstName.val,
        last: this.lastName.val,
        desc: this.description.val,
        rate: this.rate.val,
        areas: this.areas.val,
      };

      this.$emit("save-data", formData);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
