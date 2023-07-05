import { userRegister } from '../../services/user';
import { CAPTCHA } from '@/api';
import { smsCode } from '../../services/common';

export const useRegisterForm = () => {
  const registerForm = ref({
    mobile: '', // 手机号
    password: '', // 密码
    captcha: '', // 图形验证码
    smsCode: '' // 短信验证码
  });
  // 校验密码 校验一次保存到缓存中 用于确认密码的校验
  let passwordCache = '';
  // 第几次输入密码
  const passwordInputNum = ref(0);
  const validatePasswordConfirm = (rule: any, value: string, callback: any) => {
    if(!value) {
      callback(new Error('请输入密码'));
      passwordCache = '';
      return;
    }
    // 校验格式
    if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(value)) {
      callback(new Error('请输入6-20位数字和字母组合'));
      passwordCache = '';
      return;
    }
    passwordInputNum.value++;
    console.log(passwordInputNum.value);
    if (passwordInputNum.value === 1) {
      // 当用户已经输入过密码时，第二次输入密码也校验成功后，如果用户再次点击输入框而不修改时，不再校验
      if(passwordCache === value) {
        passwordInputNum.value = 0;
        callback();
        return;
      }
      // 第一次输入密码缓存和第二次比较
      passwordCache = value;
      registerForm.value.password = '';
      callback();
    }else if (passwordInputNum.value === 2) {
      if(value !== passwordCache) {
        callback(new Error('两次输入密码不一致'));
        registerForm.value.password = '';
      }
      passwordInputNum.value = 0;
    }
  }
  const registerFormRules = ref({
    mobile: [
      { key: 'mobile', required: true, message: '请输入手机号码', trigger: 'blur' }, 
      { key: 'mobile', pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur'}
    ],
    password: [{ key: 'password', validator: validatePasswordConfirm, trigger: 'blur'}],
    captcha: [{ key: 'captcha', required: true, message: '请输入图形验证码', trigger: 'blur' }, {key: 'captcha', pattern: /^[a-zA-Z0-9]{4}$/, message: '请输入正确的图形验证码', trigger: 'blur'}],
    smsCode: [{required: true, message: '请输入短信验证码', trigger: 'blur' }, {pattern: /^[0-9]{6}$/, message: '请输入6位数字短信验证码', trigger: 'blur'}]
  });
  // 图形验证码
  const captchaImg = ref('');
  // 获取图形验证码
  const getCaptchaImg = () => {
    captchaImg.value = `${import.meta.env.VITE_PC_API_PREFIX}${CAPTCHA}?t=${new Date().getTime()}`;
  }

  // 短信验证码部分
  const smsCodeText = ref('获取验证码');
  // 短信验证码倒计时
  const smsCodeCountDown = ref(0);
  // 短信验证码倒计时定时器
  let smsCodeCountDownTimer: any = null;
  // 短信验证码倒计时
  const smsCodeCountDownFn = () => {
    smsCodeCountDown.value = 60;
    smsCodeCountDownTimer = setInterval(() => {
      smsCodeCountDown.value--;
      smsCodeText.value = `${smsCodeCountDown.value}秒后重新获取`;
      if(smsCodeCountDown.value === 0) {
        smsCodeText.value = '重新获取验证码';
        clearInterval(smsCodeCountDownTimer);
      }
    }, 1000);
  }
  // 获取短信验证码
  const getSmsCode = () => {
    // 校验
    const mobile = registerForm.value.mobile;
    const captcha = registerForm.value.captcha;
    if(!mobile || !captcha) {
      return;
    }
    // 判断是否在倒计时中
    if(smsCodeCountDown.value > 0) {
      return;
    }
    // 发送请求
    return smsCode({
      mobile: registerForm.value.mobile,
      captcha: registerForm.value.captcha
    }).then(res => {
      smsCodeCountDownFn();
    });
  }
  // 注册提交
  const registerFormSubmit = () => {
    registerFormLoading.value = true;
    return userRegister({
      mobile: registerForm.value.mobile,
      password: registerForm.value.password,
      smsCode: registerForm.value.smsCode
    }).finally(() => {
      registerFormLoading.value = false;
    });
  }



  const registerFormLoading = ref(false);

  return {
    registerForm,
    registerFormRules,
    registerFormLoading,
    passwordInputNum,
    captchaImg,
    getCaptchaImg,
    smsCodeText,
    getSmsCode,
    registerFormSubmit
  }
};
