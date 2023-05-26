module.exports = {
  beforeCreate(event) {
    const { data } = event.params;
    event.params.data.slug = data?.title?.toLowerCase().replace(/ /g, "-");
  },
}
