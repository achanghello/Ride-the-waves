<template>
    <div class="vue-amazing-selector" :style="`height: ${height}px;`">
        <div :class="['m-select-wrap', { 'hover focus': !disabled, 'disabled': disabled }]"
            :style="`width: ${width - 2}px; height: ${height - 2}px; color: ${color}`" tabindex="0" @blur="onBlur"
            @click="disabled ? e => e.preventDefault() : openSelect()">
            <div :class="['u-select-input', { 'placeholder': !selectedName }]"
                :style="`line-height: ${height - 2}px;width: ${width - 37}px; height: ${height - 2}px;`"
                :title="selectedName">{{ selectedName || placeholder }}</div>
            <svg @click="openSelect" :class="['triangle', { 'rotate': showOptions }]" :style="`fill: ${color};`" viewBox="64 64 896 896"
                data-icon="down" aria-hidden="true" focusable="false" class="">
                <path
                    d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z">
                </path>
            </svg>
        </div>
        <transition name="fade">
            <div v-show="showOptions" class="m-options-panel" @mouseleave="onLeave"
                :style="`top: ${height + 6}px; line-height: ${height - 12}px; max-height: ${num * (height - 2)}px; width: ${width}px;`">
                <p :class="['u-option', { 'option-selected': item[name] === selectedName, 'option-hover': !item.disabled && item[value] === hoverValue, 'option-disabled': item.disabled }]"
                    :title="item[name]" @mouseenter="onEnter(item[value])"
                    @click="item.disabled ? e => e.preventDefault() : onChange(item[name], item[value], index)"
                    v-for="(item, index) in selectData" :key="index">
                    {{ item[name] }}
                </p>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'VueAmazingSelector',
    model: {
        prop: 'selectedValue',
        event: 'model'
    },
    props: {
        selectData: { // ?????????????????????
            type: Array,
            default: () => {
                return []
            }
        },
        defaultValue: { // ????????????????????????????????????selectedValue???v-model????????????
            type: [Number, String],
            default: null
        },
        name: { // ?????????????????????????????????
            type: String,
            default: 'name'
        },
        value: { // ??????????????????????????????
            type: String,
            default: 'value'
        },
        placeholder: { // ?????????????????????
            type: String,
            default: '?????????'
        },
        disabled: { // ??????????????????
            type: Boolean,
            default: false
        },
        width: { // ???????????????
            type: Number,
            default: 200
        },
        height: { // ???????????????
            type: Number,
            default: 36
        },
        num: { // ??????????????????????????????????????????????????????????????????
            type: Number,
            default: 6
        },
        selectedValue: { // v-model????????????????????????
            type: [Number, String, Object],
            default: null
        },
        color: {
            type: String,
            default: '#000'
        }
    },
    data() {
        return {
            selectedName: null,
            hoverValue: null, // ??????????????????value???
            showOptions: false
        }
    },
    watch: {
        selectData() {
            this.initSelector()
            console.log('selectData')
        },
        selectedValue() {
            this.initSelector()
            console.log('selectedValue')
        },
        defaultValue() {
            this.initSelector()
            console.log('defaultValue')
        }
    },
    created() {
        this.initSelector()
    },
    methods: {
        initSelector() {
            if (this.selectedValue) {
                this.hoverValue = this.selectedValue
                const target = this.selectData.find(item => item[this.value] === this.selectedValue)
                this.selectedName = target ? target[this.name] : null
            } else {
                if (this.selectedValue === '') {
                    this.hoverValue = ''
                    this.selectedName = ''
                } else if (this.defaultValue) {
                    if (this.selectData.length) {
                        this.hoverValue = this.defaultValue
                        const target = this.selectData.find(item => item[this.value] === this.defaultValue)
                        this.selectedName = target ? target[this.name] : null
                        this.$emit('model', target[this.value])
                    }
                } else {
                    this.hoverValue = null
                    this.selectedName = null
                }
            }
        },
        onBlur() {
            if (this.showOptions) {
                this.showOptions = false
            }
        },
        onEnter(value) {
            this.hoverValue = value
        },
        onLeave() {
            this.hoverValue = null
        },
        openSelect() {
            this.showOptions = !this.showOptions
            if (!this.hoverValue && this.selectedName) {
                const target = this.selectData.find(item => item[this.name] === this.selectedName)
                this.hoverValue = target[this.value]
            }
        },
        onChange(name, value, index) { // ???????????????????????????
            if (this.selectedName !== name) {
                this.selectedName = name
                this.hoverValue = value
                this.showOptions = false
                this.$emit('model', value)
                this.$emit('change', name, value, index)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
$themeColor: #1890ff; // ??????????????????

input:focus {
    outline: none;
}

input,
p {
    margin: 0;
    padding: 0;
}

.vue-amazing-selector {
    position: relative;
    display: inline-block;
    font-size: 14px;
    font-weight: 400;
    color: rgba(0, 0, 0, .65);
}

// ??????????????????
.fade-enter-active,
.fade-leave-active {
    transition: all .5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
    // transform: translateY(-6px); // ????????????
}

.m-select-wrap {
    position: relative;
    display: inline-block;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    cursor: pointer;
    transition: all .3s cubic-bezier(.645, .045, .355, 1);

    .u-select-input {
        display: block;
        text-align: left;
        margin-left: 11px;
        margin-right: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .placeholder {
        color: #bfbfbf;
    }

    .triangle {
        position: absolute;
        top: 50%;
        right: 12px;
        width: 12px;
        height: 12px;
        fill: rgba(0, 0, 0, .25);
        transform: translateY(-50%);
        -webkit-transform: translateY(-50%);
        transition: all 0.3s ease-in-out;
        pointer-events: none;
    }

    .rotate {
        transform: translateY(-50%) rotate(180deg);
        -webkit-transform: translateY(-50%) rotate(180deg);
    }
}

.hover {

    // ???????????????
    &:hover {
        border-color: $themeColor;
    }
}

.focus {

    // ???????????????
    &:focus {
        // ??????????????????tabindex??????
        border-color: $themeColor;
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 20%);
    }
}

.disabled {
    // ??????????????????
    color: rgba(0, 0, 0, .25);
    background: #f5f5f5;
    user-select: none;
    cursor: not-allowed;
}

.m-options-panel {
    position: absolute;
    z-index: 999;
    overflow: auto;
    background: #FFF;
    padding: 4px 0;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 15%);

    .u-option {
        // ?????????????????????
        text-align: left;
        position: relative;
        display: block;
        padding: 5px 12px;
        font-weight: 400;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        cursor: pointer;
        transition: background .3s ease;
    }

    .option-selected {
        // ???????????????????????????
        font-weight: 600;
        background: #fafafa;
    }

    .option-hover {
        // ???????????????????????????
        background: #e6f7ff;
    }

    .option-disabled {
        // ????????????????????????????????????
        color: rgba(0, 0, 0, .25);
        user-select: none;
        cursor: not-allowed;
    }
}
</style>