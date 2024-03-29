import { userRegister, resetPassword } from '@/api/user';
import { CAPTCHA } from '@/api';
import { smsCode } from '@/api/common';
import { generateRandomPixelAvatar } from '@/utils';

export const useRegisterForm = ({ruleOptions} = {
  ruleOptions: {
    blurEventName: 'blur',
    validateType: '0', // 0 native 1 vant
  }
}) => {
  const blurEventName = ruleOptions.blurEventName;
  const validateType = ruleOptions.validateType;
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
  const passwordPlaceholder = ref('请输入密码');
  const validatePasswordConfirm = (...params: any) => {
    let value = null;
    let callback = null;
    if (validateType === '0') {
      value = params[1];
      callback = params[2];
    } else {
      value = params[0];
    }
    if(!value) {
      callback && callback(new Error('请输入密码'));
      return '请输入密码';
    }
    // 校验格式
    if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/.test(value)) {
      callback && callback(new Error('请输入6-20位数字和字母组合'));
      return '请输入6-20位数字和字母组合';
    }
    // 当用户已经输入过密码时，第二次输入密码也校验成功后，如果用户再次点击输入框而不修改时，不再校验
    if(passwordCache && passwordCache === value) {
      passwordInputNum.value = 0;
      callback && callback();
      return true;
    }
    passwordInputNum.value++;
    if (passwordInputNum.value === 1) {
      // 第一次输入密码缓存和第二次比较
      passwordCache = value;
      registerForm.value.password = '';
      passwordPlaceholder.value = '请再次输入密码确认';
      callback && callback();
    }else if (passwordInputNum.value === 2) {
      if(value !== passwordCache) {
        registerForm.value.password = '';
        callback && callback(new Error('两次输入密码不一致'));
        return '两次输入密码不一致';
      }
      passwordInputNum.value = 0;
      passwordPlaceholder.value = '请输入密码';
    }
    return true;
  }
  const registerFormRules = ref({
    mobile: [
      { key: 'mobile', required: true, message: '请输入手机号码', trigger: blurEventName }, 
      { key: 'mobile', pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号码', trigger: blurEventName}
    ],
    password: [{ key: 'password', validator: validatePasswordConfirm, trigger: blurEventName}],
    captcha: [{ key: 'captcha', required: true, message: '请输入图形验证码', trigger: blurEventName }, {key: 'captcha', pattern: /^[a-zA-Z0-9]{4}$/, message: '请输入正确的图形验证码', trigger: blurEventName}],
    smsCode: [{required: true, message: '请输入短信验证码', trigger: blurEventName }, {pattern: /^[0-9]{6}$/, message: '请输入6位数字短信验证码', trigger: blurEventName}]
  });
  // 图形验证码
  const captchaImg = ref('');
  // 获取图形验证码
  const getCaptchaImg = () => {
    captchaImg.value = `${import.meta.env.VITE_PC_API_BASE_URL}${CAPTCHA}?t=${new Date().getTime()}`;
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
    }).then(() => {
      smsCodeCountDownFn();
    });
  }
  // 注册提交
  const registerFormSubmit = () => {
    registerFormLoading.value = true;
    return userRegister({
      mobile: registerForm.value.mobile,
      password: registerForm.value.password,
      smsCode: registerForm.value.smsCode,
      avatar: generateRandomPixelAvatar(20)
    }).finally(() => {
      registerFormLoading.value = false;
    });
  }

  // 重置密码 因为重置密码和注册的逻辑一样，所以这里直接复用注册的逻辑
  const resetPass = () => {
    registerFormLoading.value = true;
    return resetPassword({
      mobile: registerForm.value.mobile,
      password: registerForm.value.password,
      smsCode: registerForm.value.smsCode
    }).finally(() => {
      registerFormLoading.value = false;
    });
  }
   
  const resetForm = () => {
    registerForm.value.mobile = '';
    registerForm.value.password = '';
    registerForm.value.captcha = '';
    registerForm.value.smsCode = '';
  }


  const registerFormLoading = ref(false);

  return {
    registerForm,
    registerFormRules,
    registerFormLoading,
    passwordPlaceholder,
    captchaImg,
    getCaptchaImg,
    smsCodeText,
    getSmsCode,
    registerFormSubmit,
    resetPass,
    resetForm
  }
};
