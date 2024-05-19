import mongoose from "mongoose";

let updateOneToManyRelationship = async (
  childModelName,
  parentModelName,
  foreignKey,
  listKey
) => {
  const Model = mongoose.model(childModelName);
  const RelatedModel = mongoose.model(parentModelName);
  const schema = mongoose.model(childModelName).schema;

  schema.post("save", async function (doc, next) {
    // Code for handling 'save' as before...
    try {
      const ParentModel = mongoose.model(parentModelName);
      const ChildModel = mongoose.model(childModelName);

      // If the foreign key has been modified
      if (this.isModified(foreignKey)) {
        // If the foreign key is not null or undefined
        if (this[foreignKey]) {
          // Add the child's id to the new parent's list
          await ParentModel.findByIdAndUpdate(
            this[foreignKey],
            { $addToSet: { [listKey]: this.id } },
            { new: true, useFindAndModify: false }
          );
        }

        // If the foreign key was not originally null or undefined
        if (this.get(foreignKey, null, { getters: false })) {
          // Remove the child's id from the old parent's list
          await ParentModel.findByIdAndUpdate(
            this.get(foreignKey, null, { getters: false }),
            { $pull: { [listKey]: this.id } },
            { new: true, useFindAndModify: false }
          );
        }
      }

      next();
    } catch (error) {
      next(error);
    }
  });

  schema.post("remove", async function (doc, next) {
    try {
      const ParentModel = mongoose.model(parentModelName);

      // Remove the child's id from the parent's list
      await ParentModel.findByIdAndUpdate(
        this[foreignKey],
        { $pull: { [listKey]: this.id } },
        { new: true, useFindAndModify: false }
      );

      next();
    } catch (error) {
      next(error);
    }
  });
};

export { updateOneToManyRelationship };
