<template>
  <div class="hello">
    <button title="test">{{ msg }}</button><br>
    タイプ１：
    <select name="type1" v-model="selectType1">
      <option value=""></option>
      <option v-for="type in defenseTypes" v-bind:value="type" :key="type">{{ types[type]['name'] }}</option>
    </select>
    タイプ２：
    <select name="type2" v-model="selectType2">
      <option value=""></option>
      <option v-for="type in defenseTypes" v-bind:value="type" :key="type">{{ types[type]['name'] }}</option>
    </select>
    <table border="1">
        <tr><th colspan="21">防御側のタイプ</th></tr>
        <tr>
          <th rowspan="19">攻<br>撃<br>側<br>の<br>タ<br>イ<br>プ</th>
          <th></th>
          <th v-for="type in attackTypes" v-bind:style="typeStyle(type)" :key="type">{{ types[type]['name'] }}</th>
          <th>合計耐性</th>
        </tr>
        <tr v-for="dt in defenseTypes" :key="dt">
          <th v-bind:style="typeStyle(dt)">{{ types[dt]['name'] }}</th>
          <td v-for="at in attackTypes" :key="at">{{ effectLabel(dt,at) }}</td>
          <td>{{ doubleEffectLabel(dt) }}</td>
        </tr>
    </table>
  </div>
</template>

<script>
import Vue from 'vue'
import types from '../types.json'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data () {
    return {
      types: types,
      selectType1: this.type1,
      selectType2: this.type2,
    }
  },
  computed: {
    attackTypes: function () {
      const typeList = Object.keys(this.types);
      const selectType = typeList.filter(type => type == this.selectType1 || type == this.selectType2 );
      const result = selectType.length > 0 ? selectType : Vue.util.extend({},typeList);
      return result;
    },
    defenseTypes: function () {
      const typeList = Object.keys(this.types);
      return typeList;
    },
    judge: function () {
      const self = this;
      return function (at, dt) {
        let judge = 100;
        const targetType = self.types[at]['attack'];

        if(targetType['strong'].indexOf(dt) >= 0){
          judge = judge * 2;
        } else if(targetType['week'].indexOf(dt) >= 0){
          judge = judge / 2;
        } else if(targetType['noeffect'].indexOf(dt) >= 0){
          judge = 0;
        }

        return judge;
      };
    },
    effectLabel: function () {
      const self = this;
      return function (at, dt) {
        const label = { 0 : '✖', 50: '△', 100: '', 200: '○' };
        let idx = self.judge(at,dt);

        return label[idx];
      };
    },
    doubleEffectLabel: function () {
      const self = this;
      return function (type) {
        const label = { 0 : 'x0', 25: 'x0.25', 50: 'x0.5', 100: 'x1', 200: 'x2', 400: 'x4' };
        let idx = 100;

        if(self.selectType1 && self.selectType2){
          const judge1 = self.judge(type, self.selectType1);
          const judge2 = self.judge(type, self.selectType2);
          if(self.selectType1 == self.selectType2){
            idx = judge1;
          }
          else if(judge1 == 0 || judge2 == 0){
            idx = 0;
          }
          else {
            idx = judge1 * judge2 / 100;
          }
        }

        else if(self.selectType1){
          idx = self.judge(type,self.selectType1);
        }

        else if(self.selectType2){
          idx = self.judge(type,self.selectType2);
        }

        return label[idx];
      };
    },
    typeStyle: function () {
      const self = this;
      return function (type) {
        return {
          color: '#ffffff',
          backgroundColor: self.types[type]['color']
        };
      };
    },
    isSelectType: function () {
      return this.selectType1 != undefined || this.selectType2 != undefined;
    }
  }
}
</script>
