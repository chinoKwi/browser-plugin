import { ref } from "vue";

export const loading = ref(false);
export const login_dialog_visible = ref(false); // 登录弹框
export const form_data = ref({ email: "", password: "" });
