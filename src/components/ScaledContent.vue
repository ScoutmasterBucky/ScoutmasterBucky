<template>
    <div><slot /></div>
</template>

<style scoped>
div {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4px;
    width: 20%;
}

@media (min-width: 768.0001px) and (max-width: 1024px) {
    div {
        width: 25%;
    }
}

@media (min-width: 480.0001px) and (max-width: 768px) {
    div {
        width: 33%;
    }
}

@media (max-width: 480px) {
    div {
        width: 50%;
    }
}
</style>
