<template>
  <van-form ref="$form" @submit="submitHandle">
    <van-cell-group>
      <van-field v-model="registerForm.mobile" name="mobile" label="手机号" :rules="registerFormRules.mobile as FieldRule[]" />
      <van-field v-model="registerForm.captcha" name="captcha" type="text" maxlength="4" label="图形码" placeholder="右侧图形码" :rules="registerFormRules.captcha as FieldRule[]">
        <template #extra>
          <van-image class="w-12" :src="captchaImg" @click="getCaptchaImg" />
        </template>
      </van-field>
      <van-field
        v-model="registerForm.smsCode"
        name="smsCode"
        type="digit"
        center
        clearable
        maxlength="6"
        label="验证码"
        placeholder="请输入短信验证码"
        :rules="registerFormRules.smsCode as FieldRule[]"
      >
        <template #extra>
          <van-button size="small" color="#1989fa" native-type="button" @click="getSmsCode" class="w-12">{{ smsCodeText }}</van-button>
        </template>
      </van-field>
      <van-field
        v-model="registerForm.password"
        name="password"
        type="password"
        label="新密码"
        :placeholder="passwordPlaceholder"
        :rules="registerFormRules.password as FieldRule[]"
      />
    </van-cell-group>
    <div class="mt-3 px-1">
      <van-button round block type="primary" native-type="submit" :loading="registerFormLoading"> {{ type === "register" ? "注册" : "修改密码" }} </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useRegisterForm } from "@/common/Login/useRegisterForm";
import { FieldRule } from "vant";
import { showSuccessToast } from "vant";

const route = useRoute();
const router = useRouter();
const type = route.query.type || "register";
const {
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
} = useRegisterForm({
  ruleOptions: {
    blurEventName: "onBlur",
    validateType: "1",
  },
});
// 获取图形验证码
getCaptchaImg();

const submitHandle = () => {
  if (type === "register") {
    registerFormSubmit().then(() => {
      showSuccessToast("注册成功");
      router.push("/login");
    });
  } else {
    resetPass().then(() => {
      showSuccessToast("修改成功");
      router.push("/login");
    });
  }
};
</script>
