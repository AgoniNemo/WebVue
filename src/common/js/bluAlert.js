import 'vue-blu/dist/css/vue-blu.min.css';

export function showAlert(text) {
    this.$modal.open({
        autoClose: 3,
        transition: 'bounceDown',
        content: text
      });
};

export function warnAlert(text) {
    this.$notify.warning({content: text});
};
