import { userLogin } from '@/api/user';


export const useLoginForm = ({ruleOptions} = {
  ruleOptions: {
    blurEventName: 'blur'
  }
}) => {
  const loginForm = ref({
    mobile: '',
    password: ''
  });
  const blurEventName = ruleOptions.blurEventName;
  const loginFormRules = ref({
    mobile: [{required: true, message: '请输入手机号码', trigger: blurEventName }, {pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码', trigger: blurEventName}],
    password: [{required: true, message: '请输入密码', trigger: blurEventName }, {pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, message: '请输入6-20位数字和字母组合', trigger: blurEventName}]
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
