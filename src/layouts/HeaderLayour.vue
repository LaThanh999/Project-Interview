<template>
    <header class="header">
        <div class="left">
            <img src="../assets/images/logo.png" alt="logo" />
        </div>
        <div class="right">
            <button class="button" v-for="item in ['Indie Game', 'Entry Game', 'Community']">{{ item }}</button>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background-color: #72c584;
    padding: 0 60px;
}

.left {
    display: flex;
    align-items: center;
}

.text {
    font-size: 18px;
    font-weight: bold;
}

.right {
    display: flex;
    align-items: center;
    gap: 4px;
}

.button {
    padding: 6px 8px;
    border-radius: 4px;
    cursor: pointer;
}

.button:hover {
    background-color: #f0f0f0;
}

@media (max-width: 40rem) {
    .header {
        padding: 0 20px;
    }
}
</style>