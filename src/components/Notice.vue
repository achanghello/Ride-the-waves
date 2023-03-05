<template>
    <div class="notice">
        <div class="top" ref="proTop">
            <span>{{ type }}</span>
        </div>
        <div class="content" ref="proCon">
            <p>{{ number }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Notice',
    props: {
        number: {
           
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },
}
</script>

<style scoped>
.notice {
    width: 250px;
    height: 150px;
    background-color: bisque;
    margin-top: 30px;
    border-radius: 16px;
}

.top {
    margin-top: 20px;
    text-align: center;
    font-size: 20px;
}

.content p {
    text-align: center;
    font-size: 40px;
    margin: 20px 0;
}
</style>