import { getCurrentInstance } from 'vue';

// Vuetify
import * as directives from 'vuetify/directives';
import * as components from 'vuetify/components';
// import { VDataTable, VBottomSheet } from 'vuetify/components/VDataTable'
import { createVuetify } from 'vuetify';
// Styles
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
  components: {
    ...components
  },
  directives
});
// VDataTable,
// VBottomSheet,

export default vuetify;
