export const extractData = (data: any[], indices: number[]) => {
  let processedData = [];
  for (let i = 0; i < indices.length; i++) {
    const element = indices[i];
    processedData.push(data[element]);
  }
  console.log({ data: processedData, indices });
  return processedData;
};
