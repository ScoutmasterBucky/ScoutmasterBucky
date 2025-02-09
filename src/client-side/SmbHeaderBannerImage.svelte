<script>
const d = new Date();
const month = d.getMonth() + 1;
const src = `/images/header-month-${month}.jpg`;
</script>

<a href="/" aria-label="Scoutmaster Bucky Main Page">
    <img {src} height="279" width="1002" alt="Scoutmaster Bucky Banner" />
</a>

<style>
img {
    width: 100%;
    height: auto;
    display: block;
}
</style>
