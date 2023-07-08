export const herculeanPropotionsMititeiSuccessChance = (
  snowChance,
  rainChance,
  maxTemp,
  minTemp
) => {
  return 100 - (snowChance + rainChance - (snowChance * rainChance) / 100);
};
