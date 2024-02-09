<template>
  <n-config-provider :theme="appStore.theme === 'dark' ? darkTheme : undefined" :theme-overrides="appStore.themeOverrides">
    <n-modal v-model:show="showModal" :mask-closable="false">
      <n-card closable class="login-modal" :bordered="false" size="small" role="dialog" :on-close="() => (showModal = false)" aria-modal="true">
        <template #header> {{ modalTitle }} </template>
        <template #header-extra v-if="routeQueue.length !== 0">
          <ChevronBackSharp
            @click="
              () => {
                currentModalType = routeQueue.pop() || modalType.LOGIN;
              }
            "
          />
        </template>

        <!-- 登录表单 -->
        <template v-if="currentModalType === modalType.LOGIN">
          <n-form ref="loginFormRef" :model="loginForm" size="large" :show-label="false" :rules="(loginFormRules as FormRules)">
            <n-form-item path="mobile">
              <n-input v-model:value="loginForm.mobile" round placeholder="请输入手机号">
                <template #prefix>
                  <n-icon :component="MobileAlt" />
                </template>
              </n-input>
            </n-form-item>
            <n-form-item path="password">
              <n-input v-model:value="loginForm.password" round type="password" show-password-on="click" placeholder="请输入密码">
                <template #prefix>
                  <n-icon :component="Lock" />
                </template>
              </n-input>
            </n-form-item>
            <n-form-item>
              <n-button class="w-full" attr-type="button" type="primary" round @click="loginHandle" :loading="loginFormLoading"> 登录 </n-button>
            </n-form-item>
          </n-form>
          <div class="flex justify-between">
            <n-button
              text
              type="primary"
              size="small"
              @click="
                () => {
                  resetRegisterForm();
                  currentModalType = modalType.REGISTER;
                  routeQueue.push(modalType.LOGIN);
                }
              "
            >
              注册账号
            </n-button>
            <n-button
              text
              type="primary"
              size="small"
              @click="
                () => {
                  resetRegisterForm();
                  currentModalType = modalType.FORGET_PASSWORD;
                  routeQueue.push(modalType.LOGIN);
                }
              "
            >
              忘记密码
            </n-button>
          </div>
        </template>

        <!-- 注册表单 -->
        <template v-if="currentModalType === modalType.REGISTER || currentModalType === modalType.FORGET_PASSWORD">
          <n-form ref="registerFormRef" :model="registerForm" size="large" :show-label="false" :rules="(registerFormRules as FormRules)">
            <n-form-item path="mobile">
              <n-input v-model:value="registerForm.mobile" round placeholder="请输入手机号">
                <template #prefix>
                  <n-icon :component="MobileAlt" />
                </template>
              </n-input>
            </n-form-item>
            <!-- 图形验证码 -->
            <n-form-item path="captcha">
              <n-row>
                <n-col :span="14">
                  <n-input v-model:value="registerForm.captcha" :input-props="{ autocomplete: 'off' }" round placeholder="请输入图形验证码">
                    <template #prefix>
                      <n-icon :component="VerifiedUserRound" />
                    </template>
                  </n-input>
                </n-col>
                <n-col :span="9" :offset="1">
                  <img class="w-full h-full" :src="captchaImg" @click="getCaptchaImg()" />
                </n-col>
              </n-row>
            </n-form-item>
            <n-form-item path="smsCode">
              <n-input v-model:value="registerForm.smsCode" round :input-props="{ autocomplete: 'off' }" placeholder="请输入短信验证码">
                <template #prefix>
                  <n-icon :component="SmsRound" />
                </template>
                <template #suffix>
                  <n-button text type="primary" @click="smsClickHandle">
                    {{ smsCodeText }}
                  </n-button>
                </template>
              </n-input>
            </n-form-item>
            <n-form-item path="password">
              <n-input
                v-model:value="registerForm.password"
                round
                :input-props="{ autocomplete: 'off' }"
                type="password"
                show-password-on="click"
                :placeholder="passwordPlaceholder"
              >
                <template #prefix>
                  <n-icon :component="Lock" />
                </template>
              </n-input>
            </n-form-item>
            <n-form-item>
              <n-button
                class="w-full"
                attr-type="button"
                type="primary"
                round
                :loading="registerFormLoading"
                @click="currentModalType === modalType.REGISTER ? registerHandle() : resetPasswordHandle()"
              >
                {{ currentModalType === modalType.REGISTER ? "注册" : "重置密码" }}
              </n-button>
            </n-form-item>
          </n-form>
        </template>

        <!-- 底部协议 -->
        <template #footer>
          <div class="ml-1 mb-2">
            <n-checkbox v-model:checked="protocolChecked" />&nbsp;我已阅读并同意
            <n-button text tag="a" :href="userAgreement" target="_blank" type="primary"> 《用户协议》 </n-button>
            <n-button text tag="a" :href="privacyAgreement" target="_blank" type="primary"> 《隐私协议》 </n-button>
          </div>
        </template>
      </n-card>
    </n-modal>
  </n-config-provider>
</template>

<script lang="ts" setup name="loginModal">
import { userInfo } from "@/api/user";
import { FormRules, darkTheme } from "naive-ui";
import { useAppStore } from "@pc/stores/app";
import { ref, computed } from "vue";
import { type FormInst } from "naive-ui";
import { useLoginForm } from "@/common/Login/useLoginForm";
import { useRegisterForm } from "@/common/Login/useRegisterForm";
import { MobileAlt, Lock } from "@vicons/fa";
import { ChevronBackSharp } from "@vicons/ionicons5";
import { VerifiedUserRound, SmsRound } from "@vicons/material";
import { useUserStore } from '@/store/user';

//  LoginModal 创建的是另外一个vue实例 并没有使用vue-router,所以使用 useRouter()返回的是undefined  (最开始设计使用另外一个vue实例的方式是为了可以在任何地方都可以使用到登录框)
// import { useRouter } from "vue-router";

import userAgreement from "@public/protocol/我们的俄钓4 用户协议.html?url";
import privacyAgreement from "@public/protocol/我们的俄钓4 隐私政策.html?url";

const appStore = useAppStore();
const useStore = useUserStore();
// 路由队列 用于记录登录，注册，忘记密码 模拟路由跳转
const routeQueue = ref<modalType[]>([]);
// 是否显示modal
const showModal = ref(false);
// 登录框类型
enum modalType {
  LOGIN = "login",
  REGISTER = "register",
  FORGET_PASSWORD = "forgetPassword",
}
const currentModalType = ref(modalType.LOGIN);
// modal标题
const modalTitle = computed(() => {
  switch (currentModalType.value) {
    case modalType.LOGIN:
      return "手机号登录";
    case modalType.REGISTER:
      return "手机号注册";
    case modalType.FORGET_PASSWORD:
      return "忘记密码";
    default:
      return "登录";
  }
});
/*************************登录表单部分******************/
const { loginForm, loginFormRules, login, loginFormLoading } = useLoginForm();
const loginFormRef = ref<FormInst | null>(null);
const loginHandle = () => {
  loginFormRef.value?.validate((errors) => {
    if (!errors) {
      if(protocolChecked.value){
        login().then(({data}) => {
          useStore.setToken(data.accessToken);
          useStore.setRefreshToken(data.refreshToken);
          // 获取用户信息
          userInfo().then(({data}) => {
            useStore.setUserInfo(data);
            useStore.isLogin = true;
            // 登录成功
            showModal.value = false;
            window.$message.success("登录成功");
            window.location.reload();
          });
        });
      }else{
        window.$message.error("请先同意用户协议");
      }
    }
  });
};
/*************************注册表单部分******************/
const { registerForm, registerFormRules, registerFormLoading, passwordPlaceholder, captchaImg, getCaptchaImg, smsCodeText, getSmsCode, registerFormSubmit, resetPass, resetForm: resetRegisterForm} = useRegisterForm();
// 获取图形验证码
getCaptchaImg();
const registerFormRef = ref<FormInst | null>(null);
// 短信验证码点击事件
const smsClickHandle = () => {
  // 校验手机号和图形验证码
  registerFormRef.value?.validate(
    (errors) => {
      if (!errors) {
        getSmsCode()?.catch(() => {
          // 获取验证码失败
          getCaptchaImg();
        })
      }
    },
    (rule) => {
      return rule?.key === 'mobile' || rule?.key === 'captcha'
    }
  )
};
// 注册按钮点击事件
const registerHandle = () => {
  registerFormRef.value?.validate((errors) => {
    if (!errors) {
      if(!protocolChecked.value) {
        window.$message.error("请先同意用户协议");
        return;
      }
      registerFormSubmit().then(() => {
        // 注册成功后自动登录
        window.$message.success("注册成功,即将自动登录...");
        currentModalType.value = modalType.LOGIN;
        loginForm.value.mobile = registerForm.value.mobile;
        loginForm.value.password = registerForm.value.password;
        setTimeout(() => {
          loginHandle();
        }, 1000);
      });
    }
  });
};
// 重置密码提交事件
const resetPasswordHandle = async () => {
  registerFormRef.value?.validate((errors) => {
    if (!errors) {
      resetPass().then(() => {
        // 重置密码成功后自动登录
        window.$message.success("重置密码成功");
        currentModalType.value = modalType.LOGIN;
        loginForm.value.mobile = registerForm.value.mobile;
        loginForm.value.password = '';
      });
    }
  });
}




// 协议是否勾选
const protocolChecked = ref(true);

// 打开登录框
const open = () => {
  showModal.value = true;
};
// 关闭登录框
const close = () => {
  showModal.value = false;
};

// 暴露对外接口
defineExpose({
  open,
  close,
});
</script>

<style scoped lang="scss">
.login-modal {
  max-width: 360px;
  height: 476px;
  border-radius: 20px;
  :deep(.n-card-header) {
    padding-top: 20px;
    padding-bottom: 20px;
    .n-card-header__main {
      text-align: center;
    }
    .n-card-header__extra {
      position: absolute;
      width: 20px;
    }
    .n-base-close {
      position: absolute;
      right: 18px;
    }
  }
  :deep(.n-card__content) {
    padding: 0 24px;
  }
}
</style>
