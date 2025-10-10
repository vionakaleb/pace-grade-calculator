import { defineStore } from "pinia";
import { useCalculations, type Unit } from "~/composables/useCalculations";

const {
  calculatePace,
  calculateTimeFromPace,
  calculateDistanceFromPace,
  calculateGrade,
  calculateElevationFromGrade,
  calculateDistanceFromGrade,
} = useCalculations();

export const useCalculatorStore = defineStore("calculator", {
  state: () => ({
    activeTabIndex: 0,
    lastChanged: null as
      | "distance"
      | "time"
      | "pace"
      | "grade"
      | "elevation"
      | null,
    pace: {
      distance: null as number | null,
      distanceUnit: "km" as Unit,
      time: "",
      pace: "",
      paceUnit: "/ km" as string,
    },
    grade: {
      distance: null as number | null,
      distanceUnit: "m" as Unit,
      elevation: null as number | null,
      elevationUnit: "m" as Unit,
      grade: null as number | null,
    },
  }),

  actions: {
    // Main calculation router
    calculate() {
      if (this.activeTabIndex === 0) {
        this.calculatePace();
      } else {
        this.calculateGrade();
      }
    },

    // Pace Calculations
    calculatePace() {
      const p = this.pace;
      if (p.distance && p.time && this.lastChanged !== "pace") {
        p.pace = calculatePace(
          p.distance,
          p.distanceUnit,
          p.time,
          p.paceUnit.replace("/ ", "") as Unit
        );
      } else if (p.distance && p.pace && this.lastChanged !== "time") {
        p.time = calculateTimeFromPace(
          p.distance,
          p.distanceUnit,
          p.pace,
          p.paceUnit.replace("/ ", "") as Unit
        );
      } else if (p.time && p.pace && this.lastChanged !== "distance") {
        const newDist = calculateDistanceFromPace(
          p.time,
          p.pace,
          p.paceUnit.replace("/ ", "") as Unit,
          p.distanceUnit
        );
        if (newDist !== null) p.distance = newDist;
      }
    },

    // Grade Calculations
    calculateGrade() {
      const g = this.grade;
      if (g.distance && g.elevation && this.lastChanged !== "grade") {
        const newGrade = calculateGrade(
          g.distance,
          g.distanceUnit,
          g.elevation,
          g.elevationUnit
        );
        if (newGrade !== null) g.grade = newGrade;
      } else if (g.distance && g.grade && this.lastChanged !== "elevation") {
        const newElev = calculateElevationFromGrade(
          g.distance,
          g.distanceUnit,
          g.grade,
          g.elevationUnit
        );
        if (newElev !== null) g.elevation = newElev;
      } else if (g.elevation && g.grade && this.lastChanged !== "distance") {
        const newDist = calculateDistanceFromGrade(
          g.elevation,
          g.elevationUnit,
          g.grade,
          g.distanceUnit
        );
        if (newDist !== null) g.distance = newDist;
      }
    },

    clearInputs() {
      if (this.activeTabIndex === 0) {
        this.pace = {
          distance: null,
          distanceUnit: "km",
          time: "",
          pace: "",
          paceUnit: "/ km",
        };
      } else {
        this.grade = {
          distance: null,
          distanceUnit: "m",
          elevation: null,
          elevationUnit: "m",
          grade: null,
        };
      }
      this.lastChanged = null;
    },
  },
});
