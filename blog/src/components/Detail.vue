<template>
<h4>상세페이지</h4>
<h5>{{ posts[page].title }}</h5>
<p>{{ posts[page].content }}</p>
</template>

<script>
export default {
name : 'Detail',
props : {
    posts : Array,
},
data(){
    return{
        page : this.$route.params.id,
    }
}}
</script>

<style>

</style>