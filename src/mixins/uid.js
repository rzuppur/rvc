const genId = () => `_${Math.random().toString(36).substr(2)}${Math.random().toString(36).substr(2)}`;

export default {
  beforeCreate() {
    this._uid = genId();
  },
  computed: {
    /**
     * @return {string}
     */
    UID() {
      return this._uid;
    },
  },
};
