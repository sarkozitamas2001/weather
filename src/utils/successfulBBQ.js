export const herculeanPropotionsMititeiSuccessChance = (
  snowChance,
  rainChance,
  maxTemp,
  minTemp
) => {
  const rainWeight = 0.4;
  const snowWeight = 0.4;
  const tempWeight = 0.2;

  const idealMinTemp = 12;
  const idealMaxTemp = 30;

  const rainScore = 100 - rainChance;
  const snowScore = 100 - snowChance;
  const minTempScore = Math.max(
    0,
    1 - Math.abs(minTemp - idealMinTemp) / (idealMaxTemp - idealMinTemp)
  );
  const maxTempScore = Math.max(
    0,
    1 - Math.abs(maxTemp - idealMaxTemp) / (idealMaxTemp - idealMinTemp)
  );
  const tempScore = 100 - ((minTempScore + maxTempScore) / 2) * 100;

  const bbqChance =
    rainScore * rainWeight + snowScore * snowWeight + tempScore * tempWeight;
  return bbqChance.toFixed(2);
};
