module.exports = {
  format_date: (date) => {
    // Format date as DD/MM/YYYY
    return date.toLocaleDateString();
  },
  compare: function (a, b, opts) {
    if (a === b) {
      return opts.fn(this);
    } else {
      return opts.inverse(this);
    }
  },
};
