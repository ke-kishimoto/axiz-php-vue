<template>
    <div>
        {{ greet }}
    </div>
</template>
<script>
export default {
    name:'test',
    data: function() {
        return {
            greet: 'Hello',
        }
    },
    methods: {
        getGreet() {
            // fetch('../php/sample.php?num1=10&num2=20')
            fetch('http://localhost:8888/sample.php?num1=10&num2=20')
            // .then(res => console.log(res))
            .then(res => res.text().then(result => console.log(result)))
            // .then(res => res.json().then(result => {
            //     // this.greet = result.result;
            //     console.log(result)
            // }))
            .catch(error => console.log(error))
        }
    },
    created: function() {
        this.getGreet();
    }
}
</script>