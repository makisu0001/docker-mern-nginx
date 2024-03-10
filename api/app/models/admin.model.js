module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      intro: [String],
      avatar: String,
      background: String,
      color: String,
      works: [
        {
          name: String,
          resource: String,
          cover: String,
        },
      ],
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Admin = mongoose.model("admin", schema);
  return Admin;
};
