import { IWaterMarkerPlacement } from '@/utils/watermarker'
<template>
  <div class="va-body-container">
    <el-row :gutter="15">
      <el-col :span="8">
        <h6>Upload</h6>
        <el-upload
          ref="waterMarker"
          class="uploader"
          accept="image/png, image/jpeg"
          action="#"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="onInputMarker"
        >
          <img v-if="markerBlob" :src="markerBlob" class="upload-preview" alt />
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-col>
      <el-col :span="8">
        <h6>Position</h6>
        <div class="positions">
          <template v-for="(p, i) in positions">
            <span :key="i" class="item" :class="{ active: options.placement === +i }" @click="options.placement = +i">
              {{ p }}
            </span>
          </template>
        </div>
      </el-col>
      <el-col :span="8">
        <h6>Attributes</h6>
        <el-form size="small" label-width="80px" class="attributes">
          <el-form-item label="Ratio"> <el-input v-model="options.ratio" /> % </el-form-item>
          <el-form-item label="Opacity"> <el-input v-model="options.opacity" /> % </el-form-item>
          <el-form-item label="Horizontal"> <el-input v-model="options.horizontal" /> px </el-form-item>
          <el-form-item label="vertical"> <el-input v-model="options.vertical" /> px </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <div class="preview">
      <h6>Preview</h6>
      <img :src="target" alt />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import { ElUploadInternalFileDetail } from 'element-ui/types/upload';
import IWaterMarker, { IWaterMarkerOption, IWaterMarkerPlacement } from '@/utils/watermarker';

@Component({ name: 'WatermarkDemo' })
export default class extends Vue {
  private markerBlob: string | null = null;
  private origin: string = './assets/img/dashboard-preview.png';
  private target: string = this.origin;
  private positions: string[] = [
    'top start',
    'top',
    'top end',
    'center start',
    'center',
    'center end',
    'bottom start',
    'bottom',
    'bottom end',
  ];

  private options: IWaterMarkerOption = {
    placement: IWaterMarkerPlacement.center,
    ratio: 20,
    opacity: 70,
    horizontal: 15,
    vertical: 15,
  };
  private marker: IWaterMarker = new IWaterMarker(this.options);

  @Watch('options', { deep: true })
  async onOptionsChange() {
    if (!this.markerBlob) return;
    this.marker = new IWaterMarker(this.options);
    this.target = await this.marker.generate(this.origin, this.markerBlob);
  }

  private async onInputMarker(file: ElUploadInternalFileDetail) {
    const raw = file.raw;
    if (!this.marker.validate(raw)) {
      return;
    }

    this.markerBlob = URL.createObjectURL(raw);
    this.target = await this.marker.generate(this.origin, this.markerBlob);
  }
}
</script>

<style scoped lang="scss">
@import '~@/styles/_variables';

$uploader-size: 154px;
$positions-item-size: ($uploader-size - $border-default-width) / 3;

.el-row h6 {
  margin-top: 0;
}

/deep/ .el-upload {
  display: block;
  width: $uploader-size;
  height: $uploader-size;
  text-align: center;
  line-height: $uploader-size;
  border: dashed $border-default-width $border-color;
}

.upload-preview {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.positions {
  width: $uploader-size;
  height: $uploader-size;
  border-left: $border-default;
  border-top: $border-default;
  display: flex;
  flex-wrap: wrap;

  .item {
    width: $positions-item-size;
    height: $positions-item-size;
    border-right: $border-default;
    border-bottom: $border-default;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    text-align: center;
    transition: $transition-background;
    user-select: none;

    &.active {
      background-color: $color-theme;
      color: $color-white;
    }
  }
}
.attributes /deep/ {
  .el-form-item {
    margin-bottom: $spacer-xs;
  }

  .el-input {
    width: 56px;
    margin-right: $spacer-sm;
  }

  .el-input__inner {
    text-align: center;
  }
}

.preview img {
  max-width: 100%;
}
</style>
