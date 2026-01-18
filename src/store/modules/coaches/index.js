import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

export default {
  namespaced: true,

  state() {
    return {
      coaches: [
        {
          id: "c1",
          firstName: "Pieterjan",
          lastName: "Mondelaers",
          areas: ["frontend", "backend", "career"],
          description:
            "Mijn naam is Pieterjan en ik heb een paar jaar ervaring als freelance web developer. Laat me jou helpen om een beter developer te worden!",
          hourlyRate: 30,
        },
        {
          id: "c2",
          firstName: "Jay",
          lastName: "Donovan",
          areas: ["frontend", "career"],
          description:
            "Ik ben Jay en als een senior developer in een groot tech bedrijf, kan ik je helpen met je eerste top te landen of beter te worden in je huidige job.",
          hourlyRate: 30,
        },
      ],
    };
  },

  mutations,
  actions,
  getters,
};
