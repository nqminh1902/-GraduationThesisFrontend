<template>
    <div class="rating">
        <ul class="d-flex cursor-pointer" v-if="ratingType === 'insert'">
            <li v-for="star in stars" :key="star.id">
                <Icon
                    :width="WIDTH_ICON"
                    :height="HEIGHT_ICON"
                    :icon="star.icon"
                    :color="star.ratingColor"
                    @click="handleRatingStar(star.id)"
                />
            </li>
        </ul>
        <ul class="d-flex cursor-pointer" v-else>
            <li v-for="(point, index) in MAX_STARS" :key="index">
                <Icon
                    :icon="
                        point <= ratingPoint
                            ? STAR_ICON_NORMAL
                            : STAR_ICON_OUTLINE
                    "
                    :width="WIDTH_ICON"
                    :height="HEIGHT_ICON"
                    :color="COLOR_ICON"
                />
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { stars } from '@/mocks';
import type { BaseStarType } from '@/types';
import { Icon } from '@iconify/vue';

// #region styles
const WIDTH_ICON = 18;
const HEIGHT_ICON = 18;
const COLOR_ICON = '#ff7004';
const MAX_STARS = 5;
const STAR_ICON_OUTLINE = 'material-symbols:star-outline';
const STAR_ICON_NORMAL = 'material-symbols:star';
// #endregion

// #region common
const props = withDefaults(
    defineProps<{
        ratingType: 'view' | 'insert';
        ratingPoint?: number;
    }>(),
    {
        ratingType: 'insert',
        ratingPoint: 0,
    }
);

const emit = defineEmits(['onRating']);

function handleRatingStar(point: number) {
    stars.value.forEach((star: BaseStarType) => {
        if (star.id <= point) star.ratingColor = COLOR_ICON;
        else star.ratingColor = '';
    });
    emit('onRating', point);
}
// #endregion
</script>

<style lang="scss"></style>
