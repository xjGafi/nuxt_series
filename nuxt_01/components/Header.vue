<template>
  <nav>
    <!-- logo -->
    <nuxt-link :to="localePath('index', $i18n.locale)">
      <Logo />
    </nuxt-link>
    <!-- index -->
    <nuxt-link :to="localePath('index', $i18n.locale)">
      {{ $t("links.index") }}
    </nuxt-link>
    <!-- about -->
    <nuxt-link :to="localePath('about', $i18n.locale)">
      {{ $t("links.about") }}
    </nuxt-link>
    <!-- news -->
    <nuxt-link :to="localePath('news', $i18n.locale)">
      {{ $t("links.news") }}
    </nuxt-link>
    <!-- switch btn -->
    <nuxt-link class="nav-link" v-if="$i18n.locale !== 'zh'" :to="switchLocalePath('zh')">
      {{ $t("switch") }}
    </nuxt-link>
    <nuxt-link class="nav-link" v-if="$i18n.locale !== 'en'" :to="switchLocalePath('en')">
      {{ $t("switch") }}
    </nuxt-link>
  </nav>
</template>

<script>
  export default {
    name: "Header"
  }
</script>

<style>
  nav {
    padding: 1rem 5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 0.0625rem solid #000000;
  }

  nav .NuxtLogo {
    width: 2rem;
    height: 2rem;
  }
</style>
