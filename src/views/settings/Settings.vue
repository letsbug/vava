<template>
  <div class="container-body app-settings">
    <h3 class="page-title">Website Configurations<small class="text-muted">Test page, does not implement the actual function.</small></h3>
    <hr>
    <br>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="Site Name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="Domain">
        <el-input v-model="form.host">
          <template slot="prepend">{{ form.isHttps ? 'Https://' : 'Http://' }}</template>
        </el-input>
      </el-form-item>
      <el-form-item label="Enable Https">
        <el-radio-group v-model="form.isHttps">
          <el-radio :label="1">Yes</el-radio>
          <el-radio :label="0">No</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Upload Allow">
        <el-input v-model="form.uploadAllow"></el-input>
      </el-form-item>
      <el-form-item label="Upload Size">
        <el-input v-model="form.uploadSize" width="120"></el-input>
      </el-form-item>
      <el-form-item label="Site Banners">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="Keywords">
        <el-input v-model="form.keywords"></el-input>
      </el-form-item>
      <el-form-item label="Description">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="Copyright">
        <el-input v-model="form.copyright"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Confirm to Save</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "Settings",
    data() {
      return {
        form: {
          name: 'GGAdmin',
          host: 'gzb219.github.io/vue-admin-frame',
          isHttps: 1,
          uploadAllow: 'gif, jpg, jpeg, png, zip, rar, xls, xlxs, doc, docx',
          uploadSize: '1024',
          title: 'vue+element admin template',
          keywords: 'vue, vue.js, admin, element, element ui, template',
          copyright: '© 2018 GG Boom, All rights reserved.'
        }
      }
    },
    methods: {
      onSubmit() {
        this.$confirm('This page is test, dose\'t implement the actual function.', 'Confirm', {
          confirmButtonText: 'OK',
          cancelButtonText: 'CANCEL'
        }).then(() => {
          console.log('confirm submit')
        }).catch(() => {
          console.log('cancel submit')
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../styles/variables";

  .app-settings {
    background-color: $white;
  }
</style>
