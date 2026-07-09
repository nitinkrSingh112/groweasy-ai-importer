export function createBatches(
  rows: any[],
  batchSize: number = 20
): any[][] {

  const batches: any[][] = [];

  for (
    let i = 0;
    i < rows.length;
    i += batchSize
  ) {

    const batch = rows.slice(
      i,
      i + batchSize
    );

    batches.push(batch);
  }

  return batches;
}