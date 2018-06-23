import 'vue-blu/dist/css/vue-blu.min.css';

function showAlert(text) {
    this.$modal.open({
      autoClose: 3,
      transition: 'bounceDown',
      content: text
    });
};

function warnAlert(text) {
    this.$notify.warning({content: text});
};

function loadingAlert(text) {
    this.$notify.open({content: text, type: 'loading', duration: 100000});
};

export {
loadingAlert,
warnAlert,
showAlert
};
