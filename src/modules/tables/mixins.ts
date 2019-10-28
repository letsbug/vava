import { Component, Vue } from 'vue-property-decorator';
import { apiList } from '@/apis/articles';
import { ITypeArticle } from '@/apis/types';

const articleStatusStyles = (status: string) => {
  const statusMap: { [key: string]: string } = {
    0: 'info',
    1: 'warning',
    2: 'danger',
    3: 'primary',
    4: 'success',
    5: 'info'
  };
  return statusMap[status];
};

const articleStatusNames = (status: number) => {
  const statusMap: { [key: string]: string } = {
    0: 'draft',
    1: 'committed',
    2: 'failing',
    3: 'auditing',
    4: 'audited',
    5: 'deleted'
  };
  return statusMap[status];
};

const sizesPreset = [15, 30, 50];

@Component({ name: 'TableDemoMixins', filters: { articleStatusStyles, articleStatusNames } })
export default class extends Vue {
  protected loading: boolean = false;
  protected sizes: number[] = sizesPreset;
  protected page: number = 1;
  protected limit: number = sizesPreset[0];
  protected total: number = 0;
  protected list: any[] = [];

  protected get keyword() {
    return this.$route.params['keyword'];
  }

  mounted() {
    this.getList();
  }

  protected getList() {
    this.loading = true;
    apiList(this.page, this.limit).then((res: any) => {
      if (!res.success) return;

      this.list = res.data.map((v: any) => {
        this.$set(v, 'editing', false);
        this.$set(v, 'submitting', false);
        this.$set(v, 'originalTitle', v.title);
        return v;
      });
      this.total = res.page.total;
      this.loading = false;
    });
  }

  protected handlePageChange(val: number) {
    this.page = val;
    this.getList();
  }

  protected handleSizeChange(val: number) {
    this.limit = val;
    this.getList();
  }
}
