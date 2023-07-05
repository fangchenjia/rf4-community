import { userLogin } from '../../services/user';

export const useLoginForm = () => {
  const loginForm = ref({
    mobile: '',
    password: ''
  });
  const loginFormRules = ref({
    mobile: [{required: true, message: '请输入手机号码', trigger: 'blur' }, {pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur'}],
    password: [{required: true, message: '请输入密码', trigger: 'blur' }, {pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: '请输入6-20位数字和字母组合', trigger: 'blur'}]
  });

  const login = async () => {
    loginFormLoading.value = true;
    return userLogin(loginForm.value).finally(() => {
      loginFormLoading.value = false;
    });
  }
  const loginFormLoading = ref(false);

  return {
    loginForm,
    loginFormRules,
    login,
    loginFormLoading
  }
};
