import { Component, Vue } from 'vue-property-decorator';
import { apiList } from '@/apis/articles';

const articleStatus = (status: string) => {
  const statusMap: { [key: string]: string } = {
    draft: 'info',
    committed: 'warning',
    failing: 'danger',
    auditing: 'primary',
    audited: 'success',
    deleted: 'info'
  };
  return statusMap[status];
};

@Component({ name: 'TableDemoMixins', filters: { articleStatus } })
export default class extends Vue {
  protected loading: boolean = false;
  protected page: number = 1;
  protected limit: number = 20;
  protected list: any[] = [];

  get keyword() {
    return this.$route.params['keyword'];
  }

  mounted() {
    this.getList();
  }

  getList() {
    this.loading = true;
    apiList(this.page, this.limit).then((res: any) => {
      if (!res.success) return;

      this.list = res.data.map((v: any) => {
        this.$set(v, 'editing', false);
        this.$set(v, 'submitting', false);
        this.$set(v, 'originalTitle', v.title);
        return v;
      });
      // this.pages = res.pages;
      this.loading = false;
    });
  }
  handlePageChange(val: number) {
    this.page = val;
    this.getList();
  }
  handleSizeChange(val: number) {
    this.limit = val;
    this.getList();
  }
}
