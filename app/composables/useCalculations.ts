// This composable isolates the core mathematical logic, making it reusable and easy to test.
const CONVERSIONS = {
  m: 1,
  km: 1000,
  ft: 0.3048,
  mi: 1609.34,
};
export type Unit = keyof typeof CONVERSIONS;

export function useCalculations() {
  // --- Time & Pace Utility Functions ---
  const parseTimeToSeconds = (timeStr: string): number | null => {
    if (!timeStr) return null;
    const parts = timeStr.split(":").map(Number);
    let seconds = 0;
    if (parts.length === 3)
      seconds =
        ((parts[0] as number) * 3600 +
          (parts[1] as number) * 60 +
          (parts[2] as number)) |
        0;
    else if (parts.length === 2)
      seconds = (parts[0] as number) * 60 + (parts[1] as number);
    else if (parts.length === 1 && !isNaN(parts[0] as number))
      seconds = parts[0] as number;
    else return null;
    return isNaN(seconds) ? null : seconds;
  };

  const formatSecondsToTime = (totalSeconds: number | null): string => {
    if (totalSeconds === null || isNaN(totalSeconds) || totalSeconds < 0)
      return "";
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.round(totalSeconds % 60);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const formatSecondsToPace = (totalSeconds: number | null): string => {
    if (totalSeconds === null || isNaN(totalSeconds) || totalSeconds < 0)
      return "";
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.round(totalSeconds % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  // --- Core Calculation Functions ---

  const calculatePace = (
    dist: number,
    distUnit: Unit,
    time: string,
    paceUnit: Unit
  ): string => {
    const timeInSeconds = parseTimeToSeconds(time);
    if (!dist || !timeInSeconds) return "";

    const distanceInMeters = dist * CONVERSIONS[distUnit];
    const paceUnitInMeters = CONVERSIONS[paceUnit];
    const distInPaceUnit = distanceInMeters / paceUnitInMeters;

    if (distInPaceUnit > 0) {
      const totalPaceSec = timeInSeconds / distInPaceUnit;
      return formatSecondsToPace(totalPaceSec);
    }
    return "";
  };

  const calculateTimeFromPace = (
    dist: number,
    distUnit: Unit,
    pace: string,
    paceUnit: Unit
  ): string => {
    const paceInSeconds = parseTimeToSeconds(pace);
    if (!dist || !paceInSeconds) return "";

    const distanceInMeters = dist * CONVERSIONS[distUnit];
    const paceUnitInMeters = CONVERSIONS[paceUnit];
    const distanceInPaceUnits = distanceInMeters / paceUnitInMeters;

    const totalTime = paceInSeconds * distanceInPaceUnits;
    return formatSecondsToTime(totalTime);
  };

  const calculateDistanceFromPace = (
    time: string,
    pace: string,
    paceUnit: Unit,
    distUnit: Unit
  ): number | null => {
    const timeInSeconds = parseTimeToSeconds(time);
    const paceInSeconds = parseTimeToSeconds(pace);
    if (!timeInSeconds || !paceInSeconds || paceInSeconds === 0) return null;

    const paceUnitInMeters = CONVERSIONS[paceUnit];
    const metersPerSecond = paceUnitInMeters / paceInSeconds;
    const totalDistanceMeters = metersPerSecond * timeInSeconds;

    const finalDist = totalDistanceMeters / CONVERSIONS[distUnit];
    return parseFloat(finalDist.toFixed(2));
  };

  const calculateGrade = (
    dist: number,
    distUnit: Unit,
    elev: number,
    elevUnit: Unit
  ): number | null => {
    if (!dist || !elev) return null;
    const distanceInMeters = dist * CONVERSIONS[distUnit];
    const elevationInMeters = elev * CONVERSIONS[elevUnit];
    if (distanceInMeters === 0) return null;

    const grade = (elevationInMeters / distanceInMeters) * 100;
    return parseFloat(grade.toFixed(2));
  };

  const calculateElevationFromGrade = (
    dist: number,
    distUnit: Unit,
    grade: number,
    elevUnit: Unit
  ): number | null => {
    if (!dist || !grade) return null;
    const distanceInMeters = dist * CONVERSIONS[distUnit];
    const calculatedElevationMeters = (grade / 100) * distanceInMeters;
    const finalElevation = calculatedElevationMeters / CONVERSIONS[elevUnit];
    return parseFloat(finalElevation.toFixed(2));
  };

  const calculateDistanceFromGrade = (
    elev: number,
    elevUnit: Unit,
    grade: number,
    distUnit: Unit
  ): number | null => {
    if (!elev || !grade || grade === 0) return null;
    const elevationInMeters = elev * CONVERSIONS[elevUnit];
    const calculatedDistanceMeters = elevationInMeters / (grade / 100);
    const finalDistance = calculatedDistanceMeters / CONVERSIONS[distUnit];
    return parseFloat(finalDistance.toFixed(2));
  };

  return {
    parseTimeToSeconds,
    formatSecondsToTime,
    formatSecondsToPace,
    calculatePace,
    calculateTimeFromPace,
    calculateDistanceFromPace,
    calculateGrade,
    calculateElevationFromGrade,
    calculateDistanceFromGrade,
  };
}
