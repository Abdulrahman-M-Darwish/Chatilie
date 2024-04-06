export const removeUnchangedFields = (
  updatingObject: any,
  originalObject: any,
) => {
  for (const key of Object.keys(updatingObject)) {
    if (updatingObject[key] === originalObject[key]) {
      delete updatingObject[key];
    }
  }
};
