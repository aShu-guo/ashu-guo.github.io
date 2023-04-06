import {defineClientConfig} from "@vuepress/client";
import BasicLayout from "./layouts/Basic.vue";

export default defineClientConfig({
    layouts: {
        // we override the default layout to provide comment service
        Layout: BasicLayout,
    },
});
