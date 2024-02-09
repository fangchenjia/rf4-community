<template>
  <div class="h-screen flex flex-col items-center bg-white">
    <img class="w-10 h-10 mt-6" src="../assets/logo.png" alt="" />
    <van-form class="w-full mt-4 px-1" @submit="loginHandle">
      <van-cell-group>
        <van-field v-model="loginForm.mobile" name="mobile" :rules="loginFormRules.mobile as FieldRule[]" label="手机号" placeholder="请输入手机号" />
        <van-field v-model="loginForm.password" name="password" :rules="loginFormRules.password as FieldRule[]" label="密码" placeholder="请输入密码" type="password" />
      </van-cell-group>
      <!-- 忘记密码 和 注册 -->
      <div class="flex justify-between mt-2 px-2">
        <span
          @click="
            () => {
              router.push({ path: '/register', query: { type: 'resetPassword' } });
            }
          "
          class="text-tiny text-blue-600"
          >忘记密码</span
        >
        <span
          @click="
            () => {
              router.push('/register');
            }
          "
          class="text-tiny text-blue-600"
          >注册</span
        >
      </div>
      <div class="mt-3 px-1">
        <van-button round block type="primary" native-type="submit" :loading="loginFormLoading"> 登录 </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import { useLoginForm } from "@/common/Login/useLoginForm";
import { FieldRule } from "vant";
import { useUserStore } from "@/store/user";
import { userInfo } from "@/api/user";
import { useRouter } from "vue-router";

const useStore = useUserStore();
const router = useRouter();
const { loginForm, loginFormRules, login, loginFormLoading } = useLoginForm({
  ruleOptions: {
    blurEventName: "onBlur",
  },
});

const loginHandle = () => {
  login().then(({ data }) => {
    useStore.setToken(data.accessToken);
    useStore.setRefreshToken(data.refreshToken);
    // 获取用户信息
    userInfo().then(({ data }) => {
      useStore.setUserInfo(data);
      useStore.isLogin = true;
      // 登录成功
      router.push("/home");
    });
  });
};
</script>

<style scoped lang="scss"></style>
