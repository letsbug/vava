import { ITypeRoles } from '@/store/modules/user'
<template>
  <div class="va-body-container">
    <github-corner />
    <div class="content-homepage text-center">
      <h1 class="title">
        {{ $t('homepage.welcome') }}<strong>{{ nickname | capitalize }}</strong> !
      </h1>
      <div ref="roleImage" class="role-image text-primary">
        <!-- The role image will be inserted here -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { GithubCorner } from '@/components';
import { xhr } from '@/apis/xhr';
import { IStoreUser, ITypeRoles } from '@/store/modules/user';

@Component({ name: 'Homepage', components: { GithubCorner } })
export default class extends Vue {
  get nickname() {
    return IStoreUser.nickname;
  }

  get sex() {
    return IStoreUser.sex;
  }

  get roles() {
    return IStoreUser.roles;
  }

  async mounted() {
    let role = this.roles[0];
    if (role === ITypeRoles.superAdmin) {
      role = ITypeRoles.systemAdmin;
    }
    const { data } = (await xhr(`./assets/svgs/${role}_${this.sex}.svg`)) as any;
    (this.$refs['roleImage'] as HTMLDivElement).innerHTML = data;
  }
}
</script>
